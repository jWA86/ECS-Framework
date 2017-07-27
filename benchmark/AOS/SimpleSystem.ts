import { ComponentFactory, IComponent } from "../../src/AOS/ComponentFactory";
import { IHierarchicalComponent, HierarchicalComponentFactory } from "../../src/AOS/HierarchicalComponentFactory";
import { ISystem } from "../../src/AOS/System";

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
    easing: easingMethod;
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

class InterpolateSystem implements ISystem {
    constructor() {
    }
    process(components: IInterpolableComponent[], progress: number) {
        let l = components.length;
        for (let i = 0; i < l; ++i) {
            let length = components[i].endValue - components[i].startValue;
            let normProgress = progress / length;
            components[i].currentValue = this.easingFunctions[easingMethod[components[i].easing]](normProgress);
        };
    }

    public easingFunctions = {
        // no easing, no acceleration
        linear: function (t) { return t },
        // accelerating from zero velocity
        easeInQuad: function (t) { return t * t },
        // decelerating to zero velocity
        easeOutQuad: function (t) { return t * (2 - t) },
        // acceleration until halfway, then deceleration
        easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
        // accelerating from zero velocity 
        easeInCubic: function (t) { return t * t * t },
        // decelerating to zero velocity 
        easeOutCubic: function (t) { return (--t) * t * t + 1 },
        // acceleration until halfway, then deceleration 
        easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
        // accelerating from zero velocity 
        easeInQuart: function (t) { return t * t * t * t },
        // decelerating to zero velocity 
        easeOutQuart: function (t) { return 1 - (--t) * t * t * t },
        // acceleration until halfway, then deceleration
        easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
        // accelerating from zero velocity
        easeInQuint: function (t) { return t * t * t * t * t },
        // decelerating to zero velocity
        easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
        // acceleration until halfway, then deceleration 
        easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
    };
}

export {easingMethod,  IInterpolableComponent, InterpolableComponent, InterpolateSystem}