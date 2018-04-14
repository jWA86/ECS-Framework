import { IComponent, IComponentFactory, IPool } from "./IComponentFactory";
export { IEntityFactory };
interface IEntityFactory extends IPool {
    addFactory(name: string, factory: IComponentFactory<IComponent>): any;
    getComponent(entityId: number, factoryName: string): IComponent;
    getFactory(name: string): IComponentFactory<IComponent>;
}
