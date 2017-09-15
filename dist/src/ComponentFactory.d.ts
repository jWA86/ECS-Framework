import { IComponent, IComponentFactory, IEntityFactory } from "./interfaces";
import { FastIterationMap } from "FastIterationMap";
export { ComponentFactory, EntityFactory };
declare class ComponentFactory<T extends IComponent> extends FastIterationMap<string, T> implements IComponentFactory<T> {
    protected _size: number;
    protected _iterationLength: number;
    protected _zeroedRef: T;
    protected _nbActive: number;
    protected _nbInactive: number;
    protected _nbCreated: number;
    constructor(_size: number, componentType: {
        new (entityId: string, active: boolean, ...args: any[]): T;
    }, ...args: any[]);
    protected createZeroedComponentAt(index: number): void;
    activate(entityId: string, value: boolean): void;
    activateAll(value: boolean): void;
    clear(): void;
    create(entityId: string, active: boolean, ...args: any[]): T;
    protected getIndexOfFirstAvailableSpot(): number;
    protected mapObject(oldC: T, newC: T): void;
    protected decrementCreatedLength(inputIndex: number): void;
    protected incrementCreatedLength(inputIndex: number): void;
    delete(entityId: string): boolean;
    recycle(indexComponentToReplace: number, componentRef: any): void;
    resize(size: number): void;
    readonly iterationLength: number;
    readonly nbActive: number;
    readonly nbInactive: number;
    readonly nbCreated: number;
    readonly nbFreeSlot: number;
    insertAfter(key: string, value: T, keyRef: string): boolean;
    insertBefore(key: string, value: T, keyRef: string): boolean;
}
declare class EntityFactory implements IEntityFactory {
    protected _size: number;
    protected _factories: Map<string, ComponentFactory<IComponent>>;
    constructor(_size: number);
    activate(entityId: string, value: boolean, factoriesName?: string[]): void;
    activateAll(value: boolean): void;
    addFactory(name: string, factory: ComponentFactory<IComponent>): void;
    getComponent(entityId: string, factoryName: string): IComponent;
    getFactory(name: string): ComponentFactory<IComponent>;
    delete(entityId: string): boolean;
    get(entityId: string): IComponent[];
    has(entityId: string): boolean;
    create(entityId: string, active: boolean): void;
    resize(size: number): void;
    readonly iterationLength: number;
    readonly nbActive: number;
    readonly nbCreated: number;
    readonly nbFreeSlot: number;
    readonly nbInactive: number;
    readonly size: number;
}
