import {IComponent, IComponentFactory} from "./interfaces";

interface ISystem {
    process(factory:IComponentFactory, ...args: any[]);
}
export {ISystem}