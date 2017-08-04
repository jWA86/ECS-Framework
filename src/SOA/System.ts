import {IComponent, IComponentFactory} from "./interfaces";

interface ISystem {
    process(factory:IComponentFactory<IComponent>, ...args: any[]);
}

interface ISytemManager {
    systems:ISystem[];
    process(factories: IComponentFactory<IComponent>[], ...args:any[]);
}
export {ISystem, ISytemManager}