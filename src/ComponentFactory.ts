import { IComponent, IComponentFactory, IEntityFactory } from "./interfaces";
import { FastIterationMap } from "FastIterationMap";

export { ComponentFactory, EntityFactory }


class ComponentFactory<T extends IComponent> extends FastIterationMap<string, T> implements IComponentFactory<T> {
    protected _iterationLength: number = 0; // use by the system for iteration, avoid iterate over zeroed components
    protected _zeroedRef: T;
    protected _nbActive: number = 0;
    protected _nbInactive: number = 0;
    protected _nbCreated: number = 0;

    constructor(protected _size: number, componentType: { new(entityId: string, active: boolean, ...args: any[]): T }, ...args: any[]) {
        super();
        this._zeroedRef = new componentType("zeroedCompRef", false, ...args);
        this._values.length = this._size;
        for (let i = 0; i < _size; ++i) {
           this.createZeroedComponentAt(i);
        }
    }

    protected createZeroedComponentAt(index:number){
        this.recycle(index, this._zeroedRef);
        this._values[index].entityId = '0';
        this._values[index].active = false;
    }

    activate(entityId: string, value: boolean) {
        let c = this.get(entityId);
        if (c.active !== value) {
            c.active = value;
            if (value) {
                this._nbActive += 1;
                this._nbInactive -= 1;
            }
            else {
                this._nbActive -= 1;
                this._nbInactive += 1;
            }
        }
    }

    activateAll(value: boolean) {
        for (let i = 0; i < this.size; ++i) {
            this.values[i].active = value;
        }
        if (value) {
            this._nbActive = this._nbCreated;
            this._nbInactive = 0;
        } else {
            this._nbActive = 0;
            this._nbInactive = this._nbCreated;
        }
    }

    clear(): void {
        super.clear();
        this._nbActive = 0;
        this._nbInactive = 0;
        this._nbCreated = 0;
        this._iterationLength = 0;
    }

    create( entityId: string, active: boolean, ...args: any[]): T {
        let index: number;
        let toReplaceComp: T;
        // if the key doesn't exist yet 
        if (!this.has(entityId)) {
            // get the key and index of the first zeroed component in the values array
            index = this.getIndexOfFirstAvailableSpot();
            if (index === -1) {
                throw new Error("no free slot available, please resize the pool");
            } else {
                // add the key of our newly created component and 
                this._keys.set(entityId, index);
                this._nbCreated += 1;
                if (active) {
                    this._nbActive += 1;
                }
                else {
                    this._nbInactive += 1;
                }
                // replace all propreties value from the zeroed component
                toReplaceComp = this.values[index];
            }
        } else {
            index = this._keys.get(entityId);
            // replace all propreties value from the component to update
            toReplaceComp = this.values[index];
            if (toReplaceComp.active !== active) {
                if (active) {
                    this._nbActive += 1;
                    this._nbInactive -= 1;
                }
                else {
                    this._nbActive -= 1;
                    this._nbInactive += 1;
                }
            }
        }
        
        toReplaceComp.entityId = entityId;
        toReplaceComp.active = active;

        // lastly increment the lastActiveIndex
        this.incrementCreatedLength(index);
        return this.values[index];
    }

    protected getIndexOfFirstAvailableSpot(): number {
        let l = this._values.length;
        for (let i = 0; i < l; ++i) {
            if (this._values[i].entityId === '0') {
                return i;
            }
        }
        return -1;
    }

    protected mapObject(oldC: T, newC: T) {
        for (let i in newC) {
            if (oldC.hasOwnProperty(i)) {
                oldC[i] = newC[i];
            }
        }
    }

    protected decrementCreatedLength(inputIndex: number) {
        if (inputIndex >= this._iterationLength - 1) {
            this._iterationLength -= 1;
        }
    }

    protected incrementCreatedLength(inputIndex: number) {
        if (inputIndex >= this._iterationLength) {
            this._iterationLength += 1;
        }
    }

    delete(entityId: string): boolean {
        let index = this._keys.get(entityId);
        if (index === undefined) { return false; }
        // update nbActive/Inactive counter
        if (this._values[index].active) {
            this._nbActive -= 1;
        } else {
            this._nbInactive -= 1;
        }
        // zeroed the component
        this.mapObject(this._values[index], this._zeroedRef);
        this._values[index].entityId = '0';

        this._keys.delete(entityId);

        this.decrementCreatedLength(index);

        this._nbCreated -= 1;

        return true;
    }

    recycle(indexComponentToReplace:number, componentRef){
        // parsing Date ?
        let prop = JSON.parse(JSON.stringify(componentRef));
        this._values[indexComponentToReplace] = Object.create(componentRef);
        Object.keys(componentRef).forEach((p) => {
            this._values[indexComponentToReplace][p] = prop[p];
        });
    }

    resize(size: number) {
        let dif = size - this.size;
        
        if (dif > 0) {
            let oldL = this._values.length;
            this._values.length += dif;
            for (let i = 0; i < dif; ++i) {
                this.createZeroedComponentAt(oldL+i)
            }
        }
        else if (dif < 0) {
            dif = Math.abs(dif);
            for (let i = 0; i < dif; ++i) {
                let toDelete = this._values[this._values.length - 1];
                this._keys.delete(toDelete.entityId);
                this._values.pop();
            }
        }
        this._size += dif;
    }

    get iterationLength(): number {
        return this._iterationLength;
    }

    get nbActive(): number {
        return this._nbActive;
    }

    get nbInactive(): number {
        return this._nbInactive;
    }

    get nbCreated(): number {
        return this._nbCreated;
    }

    get nbFreeSlot(): number {
        return this._size - this._nbActive - this._nbInactive;
    }

    // overwrite fastIterationMap method we don't want to use
    insertAfter(key: string, value: T, keyRef: string): boolean {
        return false;
    }
    insertBefore(key: string, value: T, keyRef: string): boolean {
        return false;
    }
}

class EntityFactory implements IEntityFactory {
    protected _factories: Map<string, ComponentFactory<IComponent>>;
    constructor(protected _size: number) {
        this._factories = new Map();
    }

    activate(entityId: string, value:boolean, factoriesName?:string[]){
        
        if(factoriesName) {
            factoriesName.forEach((f)=>{
                let ff = this.getFactory(f);
                if(ff) {
                    ff.activate(entityId, value);
                }
            });
        }
        else {
            this._factories.forEach((f) => {
                f.activate(entityId, value);
            });
        }
    }

    activateAll(value: boolean) {
        this._factories.forEach((f)=>{
            f.activateAll(value);
        });
    }

    addFactory(name: string, factory: ComponentFactory<IComponent>) {
        if(factory.size !== this._size) {
            factory.resize(this._size);
        }
        this._factories.set(name, factory);
    }

    getComponent(entityId: string, factoryName: string): IComponent {
        let f = this._factories.get(factoryName);
        if(f){
            return f.get(entityId);
        }
        else {
            return undefined;
        }
    }

    getFactory(name:string): ComponentFactory<IComponent> {
        return this._factories.get(name);
    }

    delete(entityId: string): boolean {
        let d = true;
        this._factories.forEach((f)=>{
            if(!f.delete(entityId)) {
                d = false;
            }
        });
        // false if no factories
        return this._factories.size > 0 && d;
    }

    get(entityId: string): IComponent[] {
        let e = [];
        this._factories.forEach((f) => {
            e.push(f.get(entityId));
        });
        return e;
    }

    has(entityId:string): boolean {
        let it = this._factories.entries();
        return it.next().value[1].has(entityId);
    }

    create(entityId: string, active: boolean) {
        this._factories.forEach((f) => {
            f.create(entityId, active);
        });
    }

    resize(size: number) {
        this._factories.forEach((f) => {
            f.resize(size);
        });
        this._size = size;
    }

    get iterationLength(): number {
        // return iteratorLength of the first factory;
        let it = this._factories.entries();
        return it.next().value[1].iterationLength;
    }

    get nbActive(): number {
        let it = this._factories.entries();
        return it.next().value[1].nbActive;
    } 

    get nbCreated(): number {
        let it = this._factories.entries();
        return it.next().value[1].nbCreated;
    }

    get nbFreeSlot(): number {
        let it = this._factories.entries();
        return it.next().value[1].nbFreeSlot;
    }

    get nbInactive(): number {
        let it = this._factories.entries();
        return it.next().value[1].nbInactive;
    }

    get size(): number {
        return this._size;
    }
}
