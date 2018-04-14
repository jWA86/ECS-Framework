// const ob = {a: 1, b: 2};
//         const keys = Object.keys(ob);
import { IComponent, IComponentFactory } from "./interfaces";
// import { ISystem } from "./ISystem";

// interface IMyObject {
//     c1: { x: number };
//     c2: { y: number };
// }

// interface ISystemObject {
//         [key: string]: Object;
// }

interface ISystem<T> {
    execute(params: T);

}
abstract class System<T> implements ISystem<T> {
    public factories: Array<IComponentFactory<IComponent>>;
    protected keys: string[];
    constructor(protected paramObj: T) {
        // keys from a generic would dispense us from providing an object to the constructor
        // still at some point I need an instance of that object
        // since i can't instantiate a generic
        // I need to pass an instance
        this.keys = Object.keys(this.paramObj);
    }
    public setFactories(...args: Array<IComponentFactory<IComponent>>) {
        // very number of args
        // very that the component the factory holds have the proprety define by the paramObj
        this.factories = args;
    }
    public process(...args: any[]) {
        const params = this.paramObj;
        const flist = this.factories;
        // flist.length = this.keys.length
        const nbComponent = flist[0].activeLength;
        const f = flist[0].values;
        for (let i = 0; i < nbComponent; ++i) {
            // get the component from the first factory that serve as a reference
            // if it is active query the other components
            const refComponent = f[i];
            if (refComponent.active) {
                params[this.keys[0]] = refComponent;
                let isFound = true;
                // Iterate others factories to query rest of the components
                for (let j = 1; j < flist.length; ++j) {
                    // If the factory is the same as the factory that serve as a reference
                    // we push the same component to the args array,
                    // otherwise we query the component though get(entityId)
                    if (flist[j] === flist[0]) {
                        params[this.keys[j]] = refComponent;
                    } else {
                        const c = flist[j].get(refComponent.entityId);
                        if (!c) { isFound = false; break; }
                        params[this.keys[0]] = c;
                    }
                }
                if (isFound) {
                    // why apply is necessary ?
                    // this.execute.apply(this, params);
                    this.execute(params, ...args);
                }
            }
        }
    }
    public abstract execute(params: T, ...args: any[]);
}
