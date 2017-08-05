import {IComponent, IComponentFactory} from "./interfaces";
import {ISystem} from "./System";

interface ITupleComponent extends IComponent {
    //id of components to be associated
    tuple:string[];
}

class TupleComponent implements ITupleComponent{
    constructor(public id:string, public tuple:string[]){}
}

abstract class TupleComponentSystem implements ISystem {
    factories = [];
    constructor(firstFactory:IComponentFactory<IComponent>, ...args : IComponentFactory<IComponent>[]){
        this.factories.push(firstFactory);
        for (var i = 0; i<args.length; ++i) {
            this.factories.push(args[i]);
        }
    }
    //get a tuple of components 
    //should be same number as the number of factories and in the order corresponding
    getComponents(tComponent:ITupleComponent):IComponent[] {
        let r = [];
        let l = this.factories.length;
        for (let i=0;i<l;++i) {
            r.push(this.factories[i].getComponent(tComponent.tuple[i]));
        }
        return r;
    }
    process(tupleFactory:IComponentFactory<ITupleComponent>) { 
        let l = tupleFactory.size;
        tupleFactory.pool.forEach((tuple) => {
            let t = this.getComponents(tuple);
            this.execute(t);
        });
    }
    //loose typage of components :/
    abstract execute(components:IComponent[]);
}

export {TupleComponentSystem, ITupleComponent, TupleComponent}