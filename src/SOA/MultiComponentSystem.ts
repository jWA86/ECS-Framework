import {IComponent, IComponentFactory} from "./interfaces";
import {ISystem} from "./System";

interface ITupleComponent extends IComponent {
    //id of component to be associated
    public tuple:string[];
}

abstract class TupleComponentSystem implements ISystem {
    
    constructor(public factories:IComponentFactory<IComponent>[]){
    }
    //get a tuple of components 
    //should be same number as the number of factories and in the order corresponding
    getComponents(ids:ITupleComponent[]):IComponent[]{
        let r = [];
        let l = this.factories.length;
        for (let i=0;i<l;++i) {
            r.push(this.factories[i].getComponent(ids.tuple[i]));
        }
        return r;
    }
    process(idsTuples:IComponentFactory<ITupleComponent>) { 
        let l = idsTuples.size;
        idsTuples.pool.forEach((tuple) => {
            let t = this.getComponents(tuple);
            this.exec(t);
        });
    }
    abstract exec(components:IComponent[]);
}

export {TupleComponentSystem, ITupleComponent}