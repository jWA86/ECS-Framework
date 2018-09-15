import { FastIterationMap } from "FastIterationMap";
import { IComponentFactory } from "./IComponentFactory";
import { IComponent } from "./interfaces";
export { IParameterBinding, ParameterBinding, ParametersSourceIterator };
interface IParameterBinding<P, S extends IComponent, ParamType> {
    key: keyof P;
    keyInSource: keyof any;
    source: IComponentFactory<IComponent>;
    getParameter(id: number): ParamType;
    getComponent(out: S, id: number): S;
    setSource(source: IComponentFactory<S>, keyInSource: keyof S): any;
    validate(): boolean;
}
declare class ParameterBinding<Parameter, SourceComponent extends IComponent, ParamType> implements IParameterBinding<Parameter, SourceComponent, ParamType> {
    key: keyof Parameter;
    protected _source: IComponentFactory<IComponent>;
    protected _keyInSource: keyof any;
    constructor(key: keyof Parameter);
    readonly source: IComponentFactory<IComponent>;
    keyInSource: keyof any;
    getParameter(entityId: number): ParamType;
    getComponent(out: SourceComponent, entityId: number): SourceComponent;
    setSource<S extends IComponent>(source: IComponentFactory<S>, keyInSource: keyof S): void;
    validate(): boolean;
}
/** Iteration by sources  */
declare class ParametersSourceIterator<Parameters extends IComponent> {
    currentIteration: number;
    protected _paramsSources: FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>>;
    protected _paramsSortedBySources: Array<Array<IParameterBinding<Parameters, IComponent, any>>>;
    protected _defaultParameters: Parameters;
    /** component source of entityId  */
    protected _idSource: IComponentFactory<IComponent>;
    protected _activeSource: IComponentFactory<IComponent>;
    protected _activeKeyInSource: keyof any;
    constructor(defaultParameters: Parameters);
    reset(): void;
    /**
     *
     * @param values object containing values of parameters, modify it will not modify the component unless it's an object. access : values.key;
     * @param components object referencing components for each key, use : components.key[keyInSource] to modify the parameter in the referenced component.
     */
    defaultParameters: any;
    readonly sources: FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>>;
    /** Assemble parameters from poolFactories sources, if skipInactive is true, the process of assemblage is aborded and the resulting obj is not modified */
    next(outValues: Parameters, outComponents: {
        [P in keyof Parameters]: IComponent;
    }, skipInactive: boolean): boolean;
    copyValToComponent(objectContainingValue: Parameters, objectReferencingComponents: {
        [P in keyof Parameters]: IComponent;
    }): void;
    /**
     * Return true if valid or else throw en Error
     */
    validate(): boolean;
    setObjectSource<C extends IComponent>(paramKey: keyof Parameters | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C): void;
    sortParamBySource(parameterBindings: FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>>): Array<Array<IParameterBinding<Parameters, IComponent, any>>>;
    protected setObjectSourceKey(): void;
}
