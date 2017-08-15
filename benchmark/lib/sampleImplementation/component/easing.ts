import {IComponent, IComponentFactory, ITogglableComponent} from "../../../../src/interfaces"
import {ISystem} from "../../../../src/System";

export {easingMethod, IInterpolableComponent, InterpolableComponent}

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

class InterpolableComponent implements IInterpolableComponent, ITogglableComponent  {
    public currentValue: number;
    
    constructor(public entityId: string, public startValue = 0, public endValue = 1, public active:boolean = true) {
        this.currentValue = this.startValue;
    }
}

