import { FastIterationMap } from "FastIterationMap";
export { ComponentFactory, IComponent, IComponentFactory, IPool };
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
declare class ComponentFactory<T extends IComponent> extends FastIterationMap<number, T> implements IComponentFactory<T> {
    protected _size: number;
    protected _activeLength: number;
    protected readonly _zeroedRef: T;
    protected _nbActive: number;
    protected _nbInactive: number;
    protected _nbCreated: number;
    constructor(_size: number, componentWithDefaultValue: T);
    activate(entityId: number, value: boolean): void;
    activateAll(value: boolean): void;
    clear(): void;
    create(entityId: number, active: boolean, insertFirstAvailableSpot?: boolean): T;
    free(entityId: number): boolean;
    /**
     * Alias for free()
     * @param entityId
     */
    delete(entityId: number): boolean;
    /**
     * Resize the pool
     * if the size passed as parameter is inferior to the actual pool size, last components will be removed
     * @param size desired size of the pool
     */
    resizeTo(size: number): void;
    /**
     * Expand the pool's size by a given value
     * @param { number } amount the amount to resize to pool by (can be  a negative value)
     */
    expand(amount: number): void;
    insertAfter(key: number, value: T, keyRef: number): boolean;
    insertBefore(key: number, value: T, keyRef: number): boolean;
    /**
     * Delete range of components from a component key and its successors in reverse order so activeLength doesn't need to be re-computed if range comprise the last created element.
     * @param fromKey key of the first component to start freeing
     * @param nbComponents number of components to free
     */
    freeRangeComponents(fromKey: number, nbComponents: number): boolean;
    computeActiveLength(): void;
    createFromComponent(entityId: number, comp: T): T;
    protected createZeroedComponentAt(index: any): void;
    protected getIndexOfFirstAvailableSpot(): number;
    protected mapValues(destination: T, source: T): void;
    protected updateActiveLength(inputIndex: number, adding: boolean): void;
    readonly activeLength: number;
    readonly nbActive: number;
    readonly nbInactive: number;
    readonly nbCreated: number;
    readonly nbFreeSlot: number;
}
