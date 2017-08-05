import {IComponent, IComponentFactory } from "../../../../../src/SOA/interfaces";
import { TupleComponentSystem, ITupleComponent } from "../../../../../src/SOA/MultiComponentSystem";
import {IInterpolableComponent} from "../component/easing";
import {Vec2Component, IVec2Component} from "../component/vec2"

//system which combine currentValue of an easingComponent and a 2D size component
// //>> system that scale based on an easing function

class ScaleSystem extends TupleComponentSystem {
    constructor(vec2Factory:IComponentFactory<Vec2Component>, easingFactory:IComponentFactory<IInterpolableComponent>){
        super(vec2Factory, easingFactory);
    }
    process(idsTuples:IComponentFactory<ITupleComponent>){
        super.process(idsTuples);
    }
    execute(components:IComponent[]){
       components[0].x *= components[1].currentValue;
       components[0].y *= components[1].currentValue;
    }
}

export { ScaleSystem }