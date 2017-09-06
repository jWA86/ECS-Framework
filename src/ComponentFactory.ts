import { IComponent, IComponentFactory } from "./interfaces";
import { FastIterationMap } from "FastIterationMap";

export { ComponentFactory }


class ComponentFactory<T extends IComponent> extends FastIterationMap<string, T> implements IComponentFactory<T> {
    protected _iterationLength: number = 0; // use by the system for iteration, avoid iterate over zeroed components
    protected _zeroedRef: T;
    protected _nbActive: number = 0;
    protected _nbInactive: number = 0;
    protected _nbCreated: number = 0;

    

    constructor(protected _size: number, componentType: { new(entityId: string, active: boolean, ...args: any[]): T }, ...args: any[]) {
        super();
        for (let i = 0; i < _size; ++i) {
            this._values.push(new componentType('0', false, ...args));
        }
        this._zeroedRef = new componentType("zeroedCompRef", false, ...args);
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

    create(componentType: { new(entityId: string, active: boolean, ...args: any[]): T }, entityId: string, active: boolean, ...args: any[]): T {
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
        // create the new component
        let t = new componentType(entityId, active, ...args);

        this.mapObject(toReplaceComp, t);
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

    incrementCreatedLength(inputIndex: number) {
        if (inputIndex >= this._iterationLength) {
            this._iterationLength += 1;
        }
    }

    decrementCreatedLength(inputIndex: number) {
        if (inputIndex >= this._iterationLength - 1) {
            this._iterationLength -= 1;
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



    resize(size: number) {
        let dif = size - this._size;
        if (dif > 0) {
            for (let i = 0; i < dif; ++i) {
                // parsing Date ?
                let prop = JSON.parse(JSON.stringify(this._zeroedRef));

                this._values.push(Object.create(this._zeroedRef));
                Object.keys(this._zeroedRef).forEach((p) => {
                    this._values[this.size - 1][p] = prop[p];
                });
                this._values[this.size - 1].entityId = '0';

            }
        }
        else if (dif < 0) {
            dif = Math.abs(dif);
            for (let i = 0; i < dif; ++i) {
                let toDelete = this._values[this.size - 1];
                this._keys.delete(toDelete.entityId);
                this._values.pop();
            }
        }
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