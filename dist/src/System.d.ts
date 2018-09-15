import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory } from "./interfaces";
import { ISystem } from "./ISystem";
import { ParametersSourceIterator, IParameterBinding } from "./ParameterSource";
export { IKeyMapping, System };
interface IKeyMapping<P, S extends IComponent> {
    key: keyof P;
    keyInSource: keyof S;
    source: IComponentFactory<S>;
}
declare abstract class System<P extends IComponent> implements ISystem<P> {
    active: boolean;
    protected _parametersSource: ParametersSourceIterator<P>;
    /** Components mapped to parameters being modified in the execute method */
    protected _currentParametersComponents: Record<keyof P, IComponent>;
    protected _currentParametersValues: P;
    constructor(paramValuesHolder: P);
    readonly parametersSource: FastIterationMap<keyof P, IParameterBinding<P, IComponent, any>>;
    setParamSource<C extends IComponent>(paramKey: keyof P | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C): void;
    abstract execute(params: P, ...args: any[]): P;
    /** Iterate on all active components from the component pool associated with the parameter 'entityId' */
    process(...args: any[]): void;
}
