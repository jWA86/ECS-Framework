import { IComponent, IComponentFactory } from "./IComponentFactory";
export { ISystem };

interface ISystem {
    active: boolean;
    setFactories(... args: Array<IComponentFactory<IComponent>>);
    process(args?: any[]);
    execute(... args: any[]);
}
