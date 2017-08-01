import {IComponent} from "./interfaces";

interface ISystem {
    process(component: IComponent[], ...args: any[]);
}
export {ISystem}