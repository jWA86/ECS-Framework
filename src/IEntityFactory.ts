import { IComponent, IComponentFactory, IPool } from "./IComponentFactory";
export { IEntityFactory };

interface IEntityFactory extends IPool {
    addFactory(name: string, factory: IComponentFactory<IComponent>);
    getComponent(entityId: number, factoryName: string): IComponent;
    /* get components by providing the entityId and the factory */
    getFactory(name: string): IComponentFactory<IComponent>;
}
