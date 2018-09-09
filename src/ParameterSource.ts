import { FastIterationMap } from "FastIterationMap";
import { IComponentFactory } from "./IComponentFactory";
import { IComponent } from "./interfaces";

export { IParameterBinding, ParameterBinding, ParametersSourceIterator };

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
    /** component source of entityId  */
    protected _idSource: IComponentFactory<IComponent>;
    protected _defaultParameters: Parameters;
    constructor() {
        this.setObjectSourceKey();
    }
    public reset() {
        this.currentIteration = 0;
    }
    /**
     *
     * @param values object containing values of parameters, modify it will not modify the component unless it's an object. access : values.key;
     * @param components object referencing components for each key, use : components.key[keyInSource] to modify the parameter in the referenced component.
     */
    public next(values: Parameters, components: { [P in keyof Parameters]: IComponent }): boolean {
        const nbActiveComponent = this._idSource.activeLength;
        if (this.currentIteration >= nbActiveComponent) {
            return true;
        }

        const flist = this._sources.values;
        const refPool = this._idSource.values;
        // get the component from the idsource poolFactory that serve as a reference
        // if it is active query the other components
        const refComponent = refPool[this.currentIteration];
        if (refComponent.active) {
            components.entityId = refComponent;
            values.entityId = refComponent.entityId;
            let isFound = true;
            // Iterate others factories to query rest of the components
            for (let j = 1; j < flist.length; ++j) {
                // If the factory is the same as the factory that serve as a reference
                // we push the same component to the args array,
                // otherwise we query the component though get(entityId)
                const key = flist[j].key;
                const keyInSource = flist[j].keyInSource;
                if (flist[j] === flist[0]) {
                    components[key] = refComponent;
                    values[key] = refComponent[keyInSource] as any;
                } else {
                    const c = flist[j].source.get(refComponent.entityId);
                    if (!c) {
                        isFound = false;
                        // don't iterate if not found that way we know at which iteration it failed
                        // this.currentIteration += 1;
                        throw Error("component with parameter " + key + " was not found in " + flist[j].source + " with key name " + keyInSource.toString());
                    }
                    components[key] = c;
                    values[key] = c[keyInSource];
                }
            }
            if (isFound) {
                this.currentIteration += 1;
                if (this.currentIteration >= nbActiveComponent) {
                    return true;
                } else {
                    return false;
                }
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

// system.process()
// while(iteration.next(out1, out2)) {
// const res = execute(out1);
// copyOut1toOut2(out1, out2);
// }
// iteration.reset();
