import {IComponent, IComponentFactory} from "../../../../../src/SOA/interfaces"
import {ISystem} from "../../../../../src/SOA/System";

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
    constructor(public id: string, public startValue = 0, public endValue = 1) {
        this.currentValue = this.startValue;
    }
}




export {easingMethod, IInterpolableComponent, InterpolableComponent}