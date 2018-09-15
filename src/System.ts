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

abstract class System<P extends IComponent> implements ISystem<P> {

    public active: boolean = true;

    protected _parametersSource: ParametersSourceIterator<P>;

    /** Components mapped to parameters being modified in the execute method */
    protected _currentParametersComponents: Record<keyof P, IComponent>;
    protected _currentParametersValues: P;
    constructor(paramValuesHolder: P) {
        this._currentParametersValues = paramValuesHolder;
        this._currentParametersComponents = {} as Record<keyof P, IComponent>;
        this._parametersSource = new ParametersSourceIterator<P>(paramValuesHolder);
    }
    public get parametersSource(): FastIterationMap<keyof P, IParameterBinding<P, IComponent, any>>  {
        return this._parametersSource.sources;
    }
    public setParamSource<C extends IComponent>(paramKey: keyof P | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C) {
        this._parametersSource.setObjectSource(paramKey, pool, paramNameInSource);
    }
    public abstract execute(params: P, ...args: any[]): P;

    /** Iterate on all active components from the component pool associated with the parameter 'entityId' */
    public process(...args: any[]) {
        while (!this._parametersSource.next(this._currentParametersValues, this._currentParametersComponents, true)) {
            if (this._currentParametersValues.active) {
                const res = this.execute(this._currentParametersValues, ...args);
                this._parametersSource.copyValToComponent(res, this._currentParametersComponents);
            }
        }
        this._parametersSource.reset();
    }
}
