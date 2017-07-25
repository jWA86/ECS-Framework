import {IComponent} from "./ComponentFactory";

interface ISystem {
    process(component: IComponent[], ...args: any[]);
}

export {ISystem}