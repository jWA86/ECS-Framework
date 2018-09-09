import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory } from "./interfaces";
import { ISystem } from "./ISystem";
export { IKeyMapping, System };

interface IKeyMapping<P, S extends IComponent> {
    key: keyof P;
    keyInSource: keyof S;
    source: IComponentFactory<S>;
}

abstract class System<P extends IComponent> implements ISystem<P> {

    public active: boolean = true;

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
    protected initialized: boolean = false;
    constructor() { }
    /**
     * Execute on the current parameters
     * @param params Technically it's of type Record<keyof P, IComponent> but setting it to <P> allow to get the type of the parameters in the intellisense when using VSCode.
     * @param args Additional args passed from process()
     */
    public abstract execute(params: P, ...args: any[]);
    public init() {
        this._parametersSource = new FastIterationMap<keyof P, IKeyMapping<P, IComponent>>();

        this.extractingParametersKeys();
        this.initialized = true;
    }

    public get parameters() {
        return this._defaultParameter;
    }
    public set parameters(val: P) {
        // to implement
        this._defaultParameter = val;
        this.init();
    }
    public get parametersSource() {
        if (!this.initialized) { this.init(); }
        return this._parametersSource;
    }
    /** Iterate on all active components from the component pool associated with the parameter 'entityId' */
    public process(...args: any[]) {
        // Holds currently process component
        const params = this._currentParameters;
        // const flist = this.factories;
        const flist = this._parametersSource.values;
        // flist.length = this.keys.length
        const nbComponent = flist[0].source.activeLength;

        type T = P[keyof P] & IComponent;
        const f = flist[0].source.values as T[];
        for (let i = 0; i < nbComponent; ++i) {
            // get the component from the first factory that serve as a reference
            // if it is active query the other components
            const refComponent = f[i];
            if (refComponent.active) {
                params[flist[0].key] = refComponent;
                let isFound = true;
                // Iterate others factories to query rest of the components
                for (let j = 1; j < flist.length; ++j) {
                    // If the factory is the same as the factory that serve as a reference
                    // we push the same component to the args array,
                    // otherwise we query the component though get(entityId)
                    if (flist[j] === flist[0]) {
                        params[flist[j].key] = refComponent;
                    } else {
                        const c = flist[j].source.get(refComponent.entityId);
                        if (!c) { isFound = false; break; }
                        params[flist[j].key] = c;
                    }
                }
                if (isFound) {
                    this.execute(params as any, ...args);
                }
            }
        }
    }

    public setParamSource<C extends IComponent>(paramKey: keyof P | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C) {
        if (!this.initialized) { this.init(); }
        // set the same source to every parameters if the key is *
        if (paramKey === "*") {
            this._parametersSource.values.forEach((p) => {
                p.source = pool;
            });
        } else if (!this._parametersSource.has(paramKey)) {
            // when called directly from javascript (not using typescript type check)
            throw Error("Parameter name '" + paramKey + "' is not a parameter of the system.");
        } else {

            const mappedKey: IKeyMapping<P, C> = {
                key: paramKey,
                keyInSource: paramNameInSource || paramKey as any,
                source: pool,
            };
            this._parametersSource.set(paramKey, mappedKey);
            this._k[paramKey as string] = mappedKey.keyInSource;
        }
    }

    /** Extract parameters key from the parameter object */
    protected extractingParametersKeys() {

        const keys = Object.keys(this._defaultParameter);
        const _k = {};
        const _currentParameters = {};
        keys.forEach((k) => {

            const mappedKey: IKeyMapping<P, any> = {
                key: k as keyof P,
                keyInSource: k,
                source: undefined,
            };

            this._parametersSource.set(k as keyof P, mappedKey);

            _currentParameters[k] = undefined as IComponent;
            // set default param name in source as the same.
            _k[k] = k;
        });
        this._currentParameters = _currentParameters as Record<keyof P, IComponent>;
        this._k = Object.assign({}, _k as Record<keyof P, string>);
    }
}
