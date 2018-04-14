export { IComponent, IComponentFactory, IPool };
interface IComponent {
    entityId: number;
    active: boolean;
}
interface IPool {
    activeLength: number;
    nbActive: number;
    nbCreated: number;
    nbFreeSlot: number;
    nbInactive: number;
    size: number;
    create(entityId: number, active: boolean): any;
    free(entityId: number): boolean;
    get(entityId: number): any;
    has(entityId: number): boolean;
    resizeTo(size: number): any;
}
interface IComponentFactory<T extends IComponent> extends IPool {
    keys: Map<number, number>;
    length: number;
    values: T[];
    createFromComponent(entityId: number, comp: T): any;
    push(key: number, value: T): any;
    set(key: number, value: T): any;
    activate(entityId: number, value: boolean): any;
    clear(): any;
    swap(key1: number, key2: number): any;
}
