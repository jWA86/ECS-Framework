import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory } from "./interfaces";
import { ISystem } from "./ISystem";
export { IKeyMapping, System };
interface IKeyMapping<P, S extends IComponent> {
    key: keyof P;
    keyInSource: keyof S;
    source: IComponentFactory<S>;
}
declare abstract class System<P> implements ISystem<P> {
    active: boolean;
    protected _parametersSource: FastIterationMap<keyof P, IKeyMapping<P, IComponent>>;
    /**
     * Define the parameters need by the System
     * Used the key of the object to generate _currentParameters and _parametersSource
     */
    protected abstract _defaultParameter: P;
    /** Components mapped to parameters being modified in the execute method */
    protected _currentParameters: Record<keyof P, IComponent>;
    /** Shortcut for : this._currentParameters.get("paramName").keyInSource */
    protected _k: Record<keyof P, string>;
    protected initialized: boolean;
    constructor();
    /**
     * Execute on the current parameters
     * @param params Technically it's of type Record<keyof P, IComponent> but setting it to <P> allow to get the type of the parameters in the intellisense when using VSCode.
     * @param args Additional args passed from process()
     */
    abstract execute(params: P, ...args: any[]): any;
    init(): void;
    parameters: P;
    readonly parametersSource: FastIterationMap<keyof P, IKeyMapping<P, IComponent>>;
    process(...args: any[]): void;
    setParamSource<C extends IComponent>(paramKey: keyof P | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C): void;
    /** Extract parameters key from the parameter object */
    protected extractingParametersKeys(): void;
}
