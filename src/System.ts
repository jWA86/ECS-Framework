import {IComponent, IComponentFactory} from "./interfaces";

export {ISystem, System}

interface ISystem {
    process(factory:IComponentFactory<IComponent>, ...args: any[]);
    execute(...args: any[]);
}

abstract class System<T extends IComponent> implements ISystem {
    constructor() {
    }
    process(factory: IComponentFactory<T>) {
        let l = factory.size;
        let f = factory.values;
        for (let i = 0; i < l; ++i) {
            if(f[i].active){
                this.execute(f.values[i]);                
            }
        };
    }
    abstract execute(component:T);
}

