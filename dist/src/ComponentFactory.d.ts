import { FastIterationMap } from "FastIterationMap";
export { ComponentFactory, IComponent, IComponentFactory, IPool };
interface IComponent {
    entityId: number;
    active: boolean;
}
interface IPool {
    iterationLength: number;
    nbActive: number;
    nbCreated: number;
    nbFreeSlot: number;
    nbInactive: number;
    size: number;
    create(entityId: number, active: boolean): any;
    free(entityId: number): boolean;
    get(entityId: number): any;
    has(entityId: number): boolean;
    resize(size: number): any;
}
interface IComponentFactory<T extends IComponent> extends IPool {
    keys: Map<number, number>;
    length: number;
    values: T[];
    push(key: number, value: T): any;
    set(key: number, value: T): any;
    activate(entityId: number, value: boolean): any;
    clear(): any;
    swap(key1: number, key2: number): any;
}
declare class ComponentFactory<T extends IComponent> extends FastIterationMap<number, T> implements IComponentFactory<T> {
    protected _size: number;
    protected _iterationLength: number;
    protected _zeroedRef: T;
    protected _nbActive: number;
    protected _nbInactive: number;
    protected _nbCreated: number;
    constructor(_size: number, componentType: {
        new (entityId: number, active: boolean, ...args: any[]): T;
    }, ...args: any[]);
    activate(entityId: number, value: boolean): void;
    activateAll(value: boolean): void;
    clear(): void;
    create(entityId: number, active: boolean, ...args: any[]): T;
    free(entityId: number): boolean;
    recycle(indexComponentToReplace: number, componentRef: any): void;
    resize(size: number): void;
    insertAfter(key: number, value: T, keyRef: number): boolean;
    insertBefore(key: number, value: T, keyRef: number): boolean;
    protected createZeroedComponentAt(index: number): void;
    protected getIndexOfFirstAvailableSpot(): number;
    protected mapObject(oldC: T, newC: T): void;
    protected updateIterationLengthWhenRemovingComponent(inputIndex: number): void;
    protected updateIterationLengthWhenAddingComponent(inputIndex: number): void;
    readonly iterationLength: number;
    readonly nbActive: number;
    readonly nbInactive: number;
    readonly nbCreated: number;
    readonly nbFreeSlot: number;
}
