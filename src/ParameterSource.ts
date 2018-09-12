import { FastIterationMap } from "FastIterationMap";
import { IComponentFactory } from "./IComponentFactory";
import { IComponent } from "./interfaces";

export { IParameterBinding, ParameterBinding, ParametersSourceIterator, ParametersSourceIterator2 };

interface IParameterBinding<P, S extends IComponent, ParamType> {
    key: keyof P;
    keyInSource: keyof any;
    source: IComponentFactory<IComponent>;
    // defaultValue: ParamType;
    getParameter(id: number): ParamType;
    getComponent(out: S, id: number): S;
    setSource(source: IComponentFactory<S>, keyInSource: keyof S);
}

class ParameterBinding<Parameter, SourceComponent extends IComponent, ParamType> implements
    IParameterBinding<Parameter, SourceComponent, ParamType>  {
    public source: IComponentFactory<IComponent>;
    public keyInSource: keyof any;
    constructor(public key: keyof Parameter) { }

    public getParameter(entityId: number): ParamType {
        return this.source.get(entityId)[this.keyInSource];
    }

    public getComponent(out: SourceComponent, entityId: number): SourceComponent {
        return out = this.source.get(entityId);
    }

    public setSource<S extends IComponent>(source: IComponentFactory<S>, keyInSource: keyof S) {
        this.source = source;
        this.keyInSource = keyInSource;
    }
}

/** Iterate on the poolFactory binded to the parameter entityId and get parameters values and components from poolFactories associated with each parameters */
class ParametersSourceIterator<Parameters extends IComponent> {
    public currentIteration: number = 0;
    protected _sources: FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>>;
    protected _defaultParameters: Parameters;
    /** component source of entityId  */
    protected _idSource: IComponentFactory<IComponent>;
    constructor(defaultParameters: Parameters) {
        this.defaultParameters = defaultParameters;
    }
    public reset() {
        this.currentIteration = 0;
    }
    /**
     *
     * @param values object containing values of parameters, modify it will not modify the component unless it's an object. access : values.key;
     * @param components object referencing components for each key, use : components.key[keyInSource] to modify the parameter in the referenced component.
     */

    public set defaultParameters(val: any) {
        this._defaultParameters = val;
        this.setObjectSourceKey();
    }

    public get sources(): FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>> {
        return this._sources;
    }
    /** Assemble parameters from poolFactories sources, if skipInactive is true, the process of assemblage is aborded and the resulting obj is not modified */
    public next(outValues: Parameters, outComponents: { [P in keyof Parameters]: IComponent }, skipInactive: boolean): boolean {
        this.currentIteration += 1;
        const nbActiveComponent = this._idSource.activeLength;
        if (this.currentIteration - 1 >= nbActiveComponent) {
            return true;
        }

        const end = () => {
            if (this.currentIteration - 1 >= nbActiveComponent) {
                return true;
            } else {
                return false;
            }
        };

        const flist = this._sources.values;
        const refPool = this._idSource.values;
        // get the component from the idsource poolFactory that serve as a reference
        // if it is active query the other components
        const refComponent = refPool[this.currentIteration - 1];
        if (!refComponent.active && skipInactive) {
            outComponents.active = refComponent;
            outValues.active = false;
            end();
        } else {
            outComponents.entityId = refComponent;
            outValues.entityId = refComponent.entityId;
            let isFound = true;
            // Iterate others factories to query rest of the components
            const l = flist.length;
            for (let j = 0; j < l; ++j) {
                // If the factory is the same as the factory that serve as a reference
                // we push the same component to the args array,
                // otherwise we query the component though get(entityId)
                const key = flist[j].key;
                const keyInSource = flist[j].keyInSource;
                if (flist[j] === flist[0]) {
                    outComponents[key] = refComponent;
                    outValues[key] = refComponent[keyInSource] as any;
                } else {
                    const c = flist[j].source.get(refComponent.entityId);
                    if (!c) {
                        isFound = false;
                        // don't iterate if not found that way we know at which iteration it failed
                        // this.currentIteration += 1;
                        throw Error("component with parameter " + key + " was not found in " + flist[j].source + " with key name " + keyInSource.toString());
                    }
                    outComponents[key] = c;
                    outValues[key] = c[keyInSource];
                }
            }
            if (isFound) {
                end();
            }
        }

    }
    // Set value of parameters from ObjectContainingValue to the corresponding component
    public copyValToComponent(objectContainingValue: Parameters, objectReferencingComponents: { [P in keyof Parameters]: IComponent }) {
        const params = this._sources.values;
        const l = params.length;
        for (let i = 0; i < l; i++) {
            const key = params[i].key;
            const keyInSource = params[i].keyInSource;
            objectReferencingComponents[key][keyInSource] = objectContainingValue[key] as any;
        }
    }

    public validateBinding(): boolean {
        return true;
    }

    public setObjectSource<C extends IComponent>(paramKey: keyof Parameters | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C) {
        if (paramKey === "*") {
            this._sources.values.forEach((p) => {
                p.source = pool;
            });
            this._idSource = pool;
        } else if (!this._sources.has(paramKey)) {
            // when called directly from javascript (not using typescript type check)
            throw Error("Parameter name '" + paramKey + "' is not a parameter of the system.");
        } else {
            const mappedKey = new ParameterBinding(paramKey);
            mappedKey.setSource(pool, paramNameInSource || paramKey as any);
            if (paramKey === "entityId") {
                this._idSource = mappedKey.source;
            }
            this._sources.set(paramKey, mappedKey as any);
        }
    }

    protected setObjectSourceKey() {
        this._sources = new FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>>();
        const ref = this._defaultParameters;
        const keys = Object.keys(this._defaultParameters);
        keys.forEach((k) => {
            const o = ref[k];
            const mappedKey = new ParameterBinding(k as keyof Parameters);
            mappedKey.setSource(undefined, k as keyof Parameters);
            this._sources.set(k as keyof Parameters, mappedKey);
        });
    }

}

/** Iteration by sources  */
class ParametersSourceIterator2<Parameters extends IComponent> {
    public currentIteration: number = 0;
    protected _paramsSources: FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>>;
    protected _paramsSortedBySources: Array<Array<IParameterBinding<Parameters, IComponent, any>>>;
    protected _defaultParameters: Parameters;
    /** component source of entityId  */
    protected _idSource: IComponentFactory<IComponent>;
    protected _activeSource: IComponentFactory<IComponent>;
    protected _activeKeyInSource: keyof any;

    constructor(defaultParameters: Parameters) {
        this.defaultParameters = defaultParameters;
    }

    public reset() {
        this.currentIteration = 0;
    }
    /**
     *
     * @param values object containing values of parameters, modify it will not modify the component unless it's an object. access : values.key;
     * @param components object referencing components for each key, use : components.key[keyInSource] to modify the parameter in the referenced component.
     */

    public set defaultParameters(val: any) {
        this._defaultParameters = val;
        this.setObjectSourceKey();
    }

    public get sources(): FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>> {
        return this._paramsSources;
    }
    /** Assemble parameters from poolFactories sources, if skipInactive is true, the process of assemblage is aborded and the resulting obj is not modified */
    public next(outValues: Parameters, outComponents: { [P in keyof Parameters]: IComponent }, skipInactive: boolean): boolean {
        // this.currentIteration += 1;
        const nbActiveComponent = this._idSource.activeLength;
        if (this.currentIteration >= nbActiveComponent) {
            return true;
        }

        // get activelenth of source of entityId
        // iterate to activLenght
        // get entityId
        // get active value from active source
        // if (not active && skipInactive)
        //      return not done (false);
        // else
        // iterate on sources
        //      if( first source === currentSource)
        //      get the comp by index
        //  else
        //      currentSource == theSource at the iteration
        //       get the comp by Id
        // if comp is undefined throw errro
        // else
        //      iterate the current array
        //      set params outComponent and outValues
        const refPool = this._idSource.values;
        // // const activePool = this._activePool.values;
        let currentSource: IComponentFactory<IComponent>;
        const nbSources = this._paramsSortedBySources.length;
        currentSource = this._idSource;
        // for (let index = 0; index < nbActiveComponent; ++index) {
        const id = refPool[this.currentIteration].entityId;
        const activeComp = this._activeSource.get(id);
        if (!activeComp[this._activeKeyInSource] && skipInactive) {
            outValues.active = false;
            this.currentIteration += 1;
            return false;
        } else {
            for (let s = 0; s < nbSources; ++s) {
                let comp: IComponent;
                const paramSource = this._paramsSortedBySources[s];
                if (paramSource[0].source === currentSource) {
                    comp = currentSource.values[this.currentIteration];
                } else {
                    currentSource = paramSource[0].source;
                    comp = currentSource.get(id);
                }
                if (comp === undefined) {
                    throw Error("Component with entityId " + id + " was not found in " + currentSource);
                }
                const nbParam = paramSource.length;
                for (let p = 0; p < nbParam; ++p) {
                    const key = paramSource[p].key;
                    outComponents[key] = comp;
                    outValues[key] = comp[paramSource[p].keyInSource];
                }
            }
        }
        this.currentIteration += 1;
        return false;
        // }
    }
    // Set value of parameters from ObjectContainingValue to the corresponding component
    public copyValToComponent(objectContainingValue: Parameters, objectReferencingComponents: { [P in keyof Parameters]: IComponent }) {
        const params = this._paramsSources.values;
        const l = params.length;
        for (let i = 0; i < l; i++) {
            const key = params[i].key;
            const keyInSource = params[i].keyInSource;
            objectReferencingComponents[key][keyInSource] = objectContainingValue[key] as any;
        }
    }

    public validateBinding(): boolean {
        return true;
    }

    public setObjectSource<C extends IComponent>(paramKey: keyof Parameters | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C) {
        if (paramKey === "*") {
            this._paramsSources.values.forEach((p) => {
                p.source = pool;
            });
            this._idSource = pool;
            this._activeSource = pool;
            this._activeKeyInSource = "active";
        } else if (!this._paramsSources.has(paramKey)) {
            // when called directly from javascript (not using typescript type check)
            throw Error("Parameter name '" + paramKey + "' is not a parameter of the system.");
        } else {
            const mappedKey = new ParameterBinding(paramKey);
            mappedKey.setSource(pool, paramNameInSource || paramKey as any);
            if (paramKey === "entityId") {
                this._idSource = mappedKey.source;
            }
            if (paramKey === "active") {
                this._activeSource = mappedKey.source;
                this._activeKeyInSource = paramNameInSource || "active";
            }
            this._paramsSources.set(paramKey, mappedKey as any);
        }
        this._paramsSortedBySources = this.sortParamBySource(this._paramsSources);
    }

    public sortParamBySource(parameterBindings: FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>>): Array<Array<IParameterBinding<Parameters, IComponent, any>>> {
        const ar = [];
        parameterBindings.values.forEach((a) => {
            // let inserted = false;
            const res = ar.find((pArray: Array<IParameterBinding<Parameters, IComponent, any>>) => {
                return pArray[0].source === a.source;
            });

            if (res !== undefined) {
                res.push(a);
            } else {
                ar.push([a]);
            }
        });
        return ar;
    }

    protected setObjectSourceKey() {
        this._paramsSources = new FastIterationMap<keyof Parameters, IParameterBinding<Parameters, IComponent, any>>();
        const ref = this._defaultParameters;
        const keys = Object.keys(this._defaultParameters);
        keys.forEach((k) => {
            const o = ref[k];
            const mappedKey = new ParameterBinding(k as keyof Parameters);
            mappedKey.setSource(undefined, k as keyof Parameters);
            this._paramsSources.set(k as keyof Parameters, mappedKey);
        });
    }

}
