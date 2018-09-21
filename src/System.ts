import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory } from "./interfaces";
import { ISystem } from "./ISystem";
import { IParameterBinding, ParametersSourceIterator } from "./ParameterSource";
export { IKeyMapping, System };

interface IKeyMapping<P, S extends IComponent> {
    key: keyof P;
    keyInSource: keyof S;
    source: IComponentFactory<S>;
}

abstract class System<P extends IComponent> implements ISystem<P> {

    public active: boolean = true;

    protected _parametersIterator: ParametersSourceIterator<P>;

    /** Components mapped to parameters being modified in the execute method */
    protected _currentParametersComponents: Record<keyof P, IComponent>;
    protected _currentParametersValues: P;
    constructor(paramValuesHolder: P) {
        this._currentParametersValues = Object.assign({}, paramValuesHolder);
        this._currentParametersComponents = {} as Record<keyof P, IComponent>;
        this._parametersIterator = new ParametersSourceIterator<P>(paramValuesHolder);
    }
    public get parametersSource(): FastIterationMap<keyof P, IParameterBinding<P, IComponent, any>> {
        return this._parametersIterator.sources;
    }

    public setParamSource<C extends IComponent>(paramKey: keyof P | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C) {
        this._parametersIterator.setObjectSource(paramKey, pool, paramNameInSource);
    }

    public validateParametersSources(): true |  Error {
        return this._parametersIterator.validate();
    }
    public abstract execute(params: P, ...args: any[]): P | void;

    /** Iterate on all active components from the component pool associated with the parameter 'entityId' */
    public process(...args: any[]) {
        while (!this._parametersIterator.next(this._currentParametersValues, this._currentParametersComponents, true)) {
            if (this._currentParametersValues.active) {
                const res = this.execute(this._currentParametersValues, ...args);
                // res === this._currentParametersValues or undefined if the execute method didn't return anything (ie: a rendering system)
                if (res !== undefined) {
                    this._parametersIterator.copyValToComponent(res as P, this._currentParametersComponents);
                }
            }
        }
        this._parametersIterator.reset();
    }
}
