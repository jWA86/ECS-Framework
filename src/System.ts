import {IComponent, IComponentFactory} from "./interfaces";

export {ISystem, System}

interface ISystem {
    process(factory:IComponentFactory<IComponent>, ...args: any[]);
    execute(...args: any[]);
}

// are generics need here ?
abstract class System<T extends IComponent> implements ISystem {
    constructor() {
    }
    process(factory: IComponentFactory<T>) {
        let l = factory.iterationLength;
        let f = factory.values;
        for (let i = 0; i < l; ++i) {
            if(f[i].active){
                this.execute(f[i]);                
            }
        };
    }
    abstract execute(component:T);
}

