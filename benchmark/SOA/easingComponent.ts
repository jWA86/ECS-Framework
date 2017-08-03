import {IComponent, IComponentFactory} from "../../src/SOA/interfaces"
import {ISystem} from "../../src/SOA/System";

enum easingMethod {
    "linear",
    "easeInQuad",
    "easeOutQuad",
    "easeInOutQuad",
    "easeInCubic",
    "easeOutCubic",
    "easeInOutCubic",
    "easeInQuart",
    "easeOutQuart",
    "easeInOutQuart",
    "easeInQuint",
    "easeOutQuint",
    "easeInOutQuint"
}

interface IInterpolableComponent extends IComponent {
    currentValue: number;
    startValue: number;
    endValue: number;
}

class InterpolableComponent implements IInterpolableComponent {
    public currentValue: number;
    constructor(public id: string, public easing = easingMethod.linear, public startValue = 0, public endValue = 1) {
        this.currentValue = this.startValue;
    }
}

interface IInterpolableSystem extends ISystem {
    process(factory:IComponentFactory<IInterpolableComponent>, progress: number);
    interpolate(t: number): number;
}

class easingSystem {
    constructor(public systems:IInterpolableSystem[]){}
    process(factories: IComponentFactory<IInterpolableComponent>[], progress: number) {
        let l = factories.length;
        //iterate over all factories, supposed its in the same order as instanciated in the easingSystem
        let called = 0;
        for (let i = 0; i < l; ++i) {
            this.systems[i].process(factories[i], progress);
        }
      
    }
}

export {easingMethod, easingSystem, IInterpolableComponent, InterpolableComponent, IInterpolableSystem}