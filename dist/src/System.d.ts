import { IComponent, IComponentFactory } from "./interfaces";
import { ISystem } from "./ISystem";
export { System };
declare abstract class System<T> implements ISystem<T> {
    protected paramObj: T;
    active: boolean;
    factories: Array<IComponentFactory<IComponent>>;
    protected keys: string[];
    constructor(paramObj: T);
    setParamsSource(...args: Array<IComponentFactory<IComponent>>): void;
    process(...args: any[]): void;
    abstract execute(params: T, ...args: any[]): any;
}
