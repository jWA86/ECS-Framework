import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory } from "./interfaces";
import { ISystem } from "./ISystem";
export { System };

// Comment forcer l'implementation des noms de parametres lors de l'heritage/ implementation
abstract class System<T> implements ISystem<T> {

    public active: boolean = true;

    protected _parametersSource: FastIterationMap<string, { key: string, source: IComponentFactory<IComponent> }>;

    /** Object containing the currently processed component parameters */
    protected abstract _parameters: T;
    protected initialized: boolean = false;
    constructor() { }

    public abstract execute(params: T, ...args: any[]);
    public init() {
        this._parametersSource = new FastIterationMap<string, { key: string, source: IComponentFactory<IComponent> }>();

        this.extractingParametersKeys();
        this.initialized = true;
    }

    public get parameters() {
        return this._parameters;
    }
    public set parameters(val: T) {
        // to implement
        this._parameters = val;
        this.init();
    }
    public get parametersSource() {
        if (!this.initialized) { this.init(); }
        return this._parametersSource;
    }

    public process(...args: any[]) {
        // Holds currently process component
        const params = this._parameters;
        // const flist = this.factories;
        const flist = this._parametersSource.values;
        // flist.length = this.keys.length
        const nbComponent = flist[0].source.activeLength;
        const f = flist[0].source.values;
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
                    this.execute(params, ...args);
                }
            }
        }
    }

    public setParamSource(paramKey: string, pool: IComponentFactory<IComponent>) {
        if (!this.initialized) { this.init(); }
        // set the same source to every parameters if the key is *
        if (paramKey === "*") {
            this._parametersSource.values.forEach((p) => {
                p.source = pool;
            });
        } else if (!this._parametersSource.has(paramKey)) {
            throw Error("Parameter name '" + paramKey + "' is not a parameter of the system.");
        }
        this._parametersSource.set(paramKey, { key: paramKey, source: pool });
    }

    /** Extract parameters key from the parameter object */
    protected extractingParametersKeys() {
        const keys = Object.keys(this._parameters);

        keys.forEach((k) => {
            this._parametersSource.set(k, { key: k, source: undefined });
        });
    }
}
