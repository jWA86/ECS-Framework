import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory } from "./interfaces";
import { ISystem } from "./ISystem";
export { System };
declare abstract class System<T> implements ISystem<T> {
    active: boolean;
    protected _parametersSource: FastIterationMap<string, {
        key: string;
        source: IComponentFactory<IComponent>;
    }>;
    /** Object containing the currently processed component parameters */
    protected abstract _parameters: T;
    protected initialized: boolean;
    constructor();
    abstract execute(params: T, ...args: any[]): any;
    init(): void;
    parameters: T;
    readonly parameterSource: FastIterationMap<string, {
        key: string;
        source: IComponentFactory<IComponent>;
    }>;
    process(...args: any[]): void;
    setParamSource(paramKey: string, pool: IComponentFactory<IComponent>): void;
    /** Extract parameters key from the parameter object */
    protected extractingParametersKeys(): void;
}
