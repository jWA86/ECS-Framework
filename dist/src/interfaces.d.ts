export { ISystem, IComponent, IPool, IComponentFactory, IEntityFactory };
interface ISystem {
    process(factory: IComponentFactory<IComponent>, ...args: any[]): any;
    execute(...args: any[]): any;
}
interface IComponent {
    entityId: string;
    active: boolean;
}
interface IPool {
    activateAll(value: boolean): any;
    create(entityId: string, active: boolean): any;
    delete(entityId: string): boolean;
    get(entityId: string): any;
    has(entityId: string): boolean;
    iterationLength: number;
    nbActive: number;
    nbCreated: number;
    nbFreeSlot: number;
    nbInactive: number;
    resize(size: number): any;
    size: number;
}
interface IComponentFactory<T extends IComponent> extends IPool {
    activate(entityId: string, value: boolean): any;
    clear(): any;
    keys: Map<string, number>;
    length: number;
    push(key: string, value: T): any;
    set(key: string, value: T): any;
    values: T[];
}
interface IEntityFactory extends IPool {
    addFactory(name: string, factory: IComponentFactory<IComponent>): any;
    getComponent(entityId: string, factoryName: string): IComponent;
    getFactory(name: string): IComponentFactory<IComponent>;
}
