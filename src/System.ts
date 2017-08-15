import {IComponent, IComponentFactory, ITogglableComponent} from "./interfaces";

export {ISystem, System, TSystem}

interface ISystem {
    process(factory:IComponentFactory<IComponent>, ...args: any[]);
    execute(...args: any[]);
}

//abstract class that iterate over the pool and execute every component
abstract class System<T extends IComponent> implements ISystem {
    constructor() {
    }
    process(factory: IComponentFactory<T>) {
        let l = factory.size;
        for (let i = 0; i < l; ++i) {
            this.execute(factory.pool.values[i]);
        };
    }
    abstract execute(component:T);
}

//abstract class that iterate over the pool and execute ToggableComponent that have the active proprety setted to true
// for testing only, should use a ComponentFactory that separate active & inactive so we process only active components
abstract class TSystem<T extends ITogglableComponent> implements ISystem {
    constructor() {
    }
    process(factory: IComponentFactory<T>) {
        let l = factory.size;
        for (let i = 0; i < l; ++i) {
            if(factory.pool.values[i].active){
                this.execute(factory.pool.values[i]);                
            }
        };
    }
    abstract execute(component:T);
}

