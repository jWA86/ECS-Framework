import { IComponent, IComponentFactory } from "./IComponentFactory";
export { ISystem };

interface ISystem<T> {
    active: boolean;
    process(...args: any[]);
    // setParamsSource(... args: Array<IComponentFactory<IComponent>>);
    // execute(T, ... args: any[]);
}
