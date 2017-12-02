import {IComponent, IComponentFactory, ISystem} from "./interfaces";

export {System, MultiParallelSystem, MultiNonParallelSystem, MultiPoolSystem}



// are generics need here ?
abstract class System implements ISystem {
    constructor() {}
    process(factory: IComponentFactory<IComponent>) {
        let l = factory.iterationLength;
        let f = factory.values;
        for (let i = 0; i < l; ++i) {
            if(f[i].active) {
                this.execute(f[i]);                
            }
        };
    }
    abstract execute(component:IComponent);
}

// system that iterate on pool that have their values array set in parallel, ie: same entityId at same index, same number of components
// how to make sure they are parallel ? use a parent pool that .
// call in sync instead of parallel ?
abstract class MultiParallelSystem implements ISystem {
    constructor(){}
    process(factory: IComponentFactory<IComponent>, ... args: IComponentFactory<IComponent>[]) {
        let l = factory.iterationLength;
        let f = factory.values;
        for (let i = 0; i < l; ++i) {
            if(f[i].active) {
                let arr:IComponent[] = [];
                arr.push(f[i]);
                for(let j = 0; j < args.length; ++j){
                    arr.push(args[j].values[i]);
                }
                this.execute.apply(null, arr);        
            }
        };
    }
    abstract execute(component:IComponent, ...args: IComponent[]);
}
// should be removed and replace by MultiPoolSystem
// non parallel pool, components are query by id (slower)
abstract class MultiNonParallelSystem implements ISystem {
    constructor(){}
    process(factory: IComponentFactory<IComponent>, ... args: IComponentFactory<IComponent>[]) {
        let l = factory.iterationLength;
        let f = factory.values;
        for (let i = 0; i < l; ++i) {
            if(f[i].active) {
                let arr:IComponent[] = [];
                arr.push(f[i]);
                let isFound = true;
                for(let j = 0; j < args.length; ++j){
                    let c = args[j].get(f[i].entityId);
                    if(!c){isFound=false;break;}
                    arr.push(c);
                }
                if(isFound) {
                    this.execute.apply(null, arr);        
                }
            }
        };
    }
    abstract execute(component:IComponent, ...args: IComponent[]);
}
//
// A factory for each parameters of the exectute function
abstract class MultiPoolSystem implements ISystem {
    constructor(){}
    //query the components and execute
    process(factory: IComponentFactory<IComponent>, ... args: IComponentFactory<IComponent>[]) {
        let l = factory.iterationLength;
        let f = factory.values;
        for (let i = 0; i < l; ++i) {
            // get the component from the first factory that serve as a reference
            // if it is active query the other components
            let refComponent = f[i];
            if(refComponent.active) {
                //array that hold component that will be used by the execute function
                let arr:IComponent[] = [];
                arr.push(refComponent);
                let isFound = true;
                // query others components
                for(let j = 0; j < args.length; ++j) {
                    //if the factory is the same as the factory that serve as reference we push the same component to the args array
                    //otherwise we query the component though get(entityId)
                    if(args[j]===factory){
                        arr.push(refComponent);
                    }
                    else {
                        let c = args[j].get(refComponent.entityId);
                        if(!c){isFound=false;break;}
                        arr.push(c);
                    }
                }
                if(isFound) {
                    this.execute.apply(null, arr);        
                }
            }
        };
    }
    abstract execute(component:IComponent, ...args: IComponent[]);
}
