import { IComponent, IComponentFactory, ISystem } from "./interfaces";
export { System, MultiParallelSystem, MultiNonParallelSystem };
declare abstract class System implements ISystem {
    constructor();
    process(factory: IComponentFactory<IComponent>): void;
    abstract execute(component: IComponent): any;
}
declare abstract class MultiParallelSystem implements ISystem {
    constructor();
    process(factory: IComponentFactory<IComponent>, ...args: IComponentFactory<IComponent>[]): void;
    abstract execute(component: IComponent, ...args: IComponent[]): any;
}
declare abstract class MultiNonParallelSystem implements ISystem {
    constructor();
    process(factory: IComponentFactory<IComponent>, ...args: IComponentFactory<IComponent>[]): void;
    abstract execute(component: IComponent, ...args: IComponent[]): any;
}
