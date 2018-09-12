import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory } from "./IComponentFactory";
import { ISystem } from "./interfaces";
import { IParameterBinding, ParametersSourceIterator, ParametersSourceIterator2 } from "./ParameterSource";

export abstract class System<P extends IComponent> implements ISystem<P> {

    public active: boolean = true;

    protected _parametersSource: ParametersSourceIterator<P>;
    /**
     * Define the parameters need by the System
     * Used the key of the object to generate _currentParameters and _parametersSource
     */
    // protected abstract _defaultParameter: P;
    /** Components mapped to parameters being modified in the execute method */
    protected _currentParametersComponents: Record<keyof P, IComponent>;
    protected _currentParametersValues: P;
    constructor(protected paramValuesHolder: P) {
        this._currentParametersValues = paramValuesHolder;
        this._currentParametersComponents = {} as Record<keyof P, IComponent>;
        this._parametersSource = new ParametersSourceIterator<P>(paramValuesHolder);
    }
    public get parametersSource(): FastIterationMap<keyof P, IParameterBinding<P, IComponent, any>> {
        return this._parametersSource.sources;
    }
    public setParamSource<C extends IComponent>(paramKey: keyof P | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C) {
        this._parametersSource.setObjectSource(paramKey, pool, paramNameInSource);
    }
    /**
     * Execute on the current parameters
     * @param params Technically it's of type Record<keyof P, IComponent> but setting it to <P> allow to get the type of the parameters in the intellisense when using VSCode.
     * @param args Additional args passed from process()
     */
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

export abstract class System2<P extends IComponent> implements ISystem<P> {

    public active: boolean = true;

    protected _parametersSource: ParametersSourceIterator2<P>;
    /**
     * Define the parameters need by the System
     * Used the key of the object to generate _currentParameters and _parametersSource
     */
    // protected abstract _defaultParameter: P;
    /** Components mapped to parameters being modified in the execute method */
    protected _currentParametersComponents: Record<keyof P, IComponent>;
    protected _currentParametersValues: P;
    constructor(protected paramValuesHolder: P) {
        this._currentParametersValues = paramValuesHolder;
        this._currentParametersComponents = {} as Record<keyof P, IComponent>;
        this._parametersSource = new ParametersSourceIterator2<P>(paramValuesHolder);
    }
    public get parametersSource() {
        return this._parametersSource.sources;
    }
    public setParamSource<C extends IComponent>(paramKey: keyof P | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C) {
        this._parametersSource.setObjectSource(paramKey, pool, paramNameInSource);
    }
    /**
     * Execute on the current parameters
     * @param params Technically it's of type Record<keyof P, IComponent> but setting it to <P> allow to get the type of the parameters in the intellisense when using VSCode.
     * @param args Additional args passed from process()
     */
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
