import {IComponent, IComponentFactory, ISystem} from "./interfaces";

export {System, MultiParallelSystem, MultiNonParallelSystem}



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
