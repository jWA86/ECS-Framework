import { ComponentFactory, IComponent, IComponentFactory, IPool } from "./ComponentFactory";
export { EntityFactory, IEntityFactory };

interface IEntityFactory extends IPool {
    addFactory(name: string, factory: IComponentFactory<IComponent>);
    getComponent(entityId: number, factoryName: string): IComponent;
    /* get components by providing the entityId and the factory */
    getFactory(name: string): IComponentFactory<IComponent>;
}

class EntityFactory implements IEntityFactory {
    protected _factories: Map<string, ComponentFactory<IComponent>>;
    constructor(protected _size: number) {
        this._factories = new Map();
    }

    public activate(entityId: number, value: boolean, factoriesName?: string[]) {
        if (factoriesName) {
            factoriesName.forEach((f) => {
                const ff = this.getFactory(f);
                if (ff) {
                    ff.activate(entityId, value);
                }
            });
        } else {
            this._factories.forEach((f) => {
                f.activate(entityId, value);
            });
        }
    }

    public activateAll(value: boolean) {
        this._factories.forEach((f) => {
            f.activateAll(value);
        });
    }

    public addFactory(name: string, factory: ComponentFactory<IComponent>) {
        if (factory.size !== this._size) {
            factory.resize(this._size);
        }
        this._factories.set(name, factory);
    }

    public getComponent(entityId: number, factoryName: string): IComponent {
        const f = this._factories.get(factoryName);
        if (f) {
            return f.get(entityId);
        } else {
            return undefined;
        }
    }

    public getFactory(name: string): ComponentFactory<IComponent> {
        return this._factories.get(name);
    }

    public free(entityId: number): boolean {
        let d = true;
        this._factories.forEach((f) => {
            if (!f.free(entityId)) {
                d = false;
            }
        });
        // false if no factories
        return this._factories.size > 0 && d;
    }

    public get(entityId: number): IComponent[] {
        const e = [];
        this._factories.forEach((f) => {
            e.push(f.get(entityId));
        });
        return e;
    }

    public has(entityId: number): boolean {
        const it = this._factories.entries();
        return it.next().value[1].has(entityId);
    }

    public create(entityId: number, active: boolean) {
        this._factories.forEach((f) => {
            f.create(entityId, active);
        });
    }

    public resize(size: number) {
        this._factories.forEach((f) => {
            f.resize(size);
        });
        this._size = size;
    }

    get activeLength(): number {
        // return iteratorLength of the first factory;
        const it = this._factories.entries();
        return it.next().value[1].activeLength;
    }

    get nbActive(): number {
        const it = this._factories.entries();
        return it.next().value[1].nbActive;
    }

    get nbCreated(): number {
        const it = this._factories.entries();
        return it.next().value[1].nbCreated;
    }

    get nbFreeSlot(): number {
        const it = this._factories.entries();
        return it.next().value[1].nbFreeSlot;
    }

    get nbInactive(): number {
        const it = this._factories.entries();
        return it.next().value[1].nbInactive;
    }

    get size(): number {
        return this._size;
    }
}
