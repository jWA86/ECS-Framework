import { ComponentFactory } from "./ComponentFactory";
import { IComponent } from "./IComponentFactory";
import { IEntityFactory } from "./IEntityFactory";
export { EntityFactory };
declare class EntityFactory implements IEntityFactory {
    protected _size: number;
    type: string;
    protected _factories: Map<string, ComponentFactory<IComponent>>;
    constructor(_size: number, type?: string);
    activate(entityId: number, value: boolean, factoriesName?: string[]): void;
    activateAll(value: boolean): void;
    addFactory(name: string, factory: ComponentFactory<IComponent>): void;
    getComponent(entityId: number, factoryName: string): IComponent;
    getFactory(name: string): ComponentFactory<IComponent>;
    free(entityId: number): boolean;
    get(entityId: number): IComponent[];
    has(entityId: number): boolean;
    create(entityId: number, active: boolean): void;
    resizeTo(size: number): void;
    readonly activeLength: number;
    readonly nbActive: number;
    readonly nbCreated: number;
    readonly nbFreeSlot: number;
    readonly nbInactive: number;
    readonly size: number;
}
