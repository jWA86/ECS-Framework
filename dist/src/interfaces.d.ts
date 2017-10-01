export { ISystem, IComponent, IPool, IComponentFactory, IEntityFactory };
interface ISystem {
    process(factory: IComponentFactory<IComponent>, ...args: any[]): any;
    execute(...args: any[]): any;
}
interface IComponent {
    entityId: number;
    active: boolean;
}
interface IPool {
    activateAll(value: boolean): any;
    create(entityId: number, active: boolean): any;
    delete(entityId: number): boolean;
    get(entityId: number): any;
    has(entityId: number): boolean;
    iterationLength: number;
    nbActive: number;
    nbCreated: number;
    nbFreeSlot: number;
    nbInactive: number;
    resize(size: number): any;
    size: number;
}
interface IComponentFactory<T extends IComponent> extends IPool {
    activate(entityId: number, value: boolean): any;
    clear(): any;
    keys: Map<number, number>;
    length: number;
    push(key: number, value: T): any;
    set(key: number, value: T): any;
    values: T[];
}
interface IEntityFactory extends IPool {
    addFactory(name: string, factory: IComponentFactory<IComponent>): any;
    getComponent(entityId: number, factoryName: string): IComponent;
    getFactory(name: string): IComponentFactory<IComponent>;
}
