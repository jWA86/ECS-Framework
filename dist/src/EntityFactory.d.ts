import { ComponentFactory, IComponent, IComponentFactory, IPool } from "./ComponentFactory";
export { EntityFactory, IEntityFactory };
interface IEntityFactory extends IPool {
    addFactory(name: string, factory: IComponentFactory<IComponent>): any;
    getComponent(entityId: number, factoryName: string): IComponent;
    getFactory(name: string): IComponentFactory<IComponent>;
}
declare class EntityFactory implements IEntityFactory {
    protected _size: number;
    protected _factories: Map<string, ComponentFactory<IComponent>>;
    constructor(_size: number);
    activate(entityId: number, value: boolean, factoriesName?: string[]): void;
    activateAll(value: boolean): void;
    addFactory(name: string, factory: ComponentFactory<IComponent>): void;
    getComponent(entityId: number, factoryName: string): IComponent;
    getFactory(name: string): ComponentFactory<IComponent>;
    free(entityId: number): boolean;
    get(entityId: number): IComponent[];
    has(entityId: number): boolean;
    create(entityId: number, active: boolean): void;
    resize(size: number): void;
    readonly activeLength: number;
    readonly nbActive: number;
    readonly nbCreated: number;
    readonly nbFreeSlot: number;
    readonly nbInactive: number;
    readonly size: number;
}
