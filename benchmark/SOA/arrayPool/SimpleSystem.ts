import { ComponentFactory, IComponent } from "../../../src/SOA/ComponentFactory";
import { IHierarchicalComponent, HierarchicalComponentFactory } from "../../../src/SOA/HierarchicalComponentFactory";
import { ISystem } from "../../../src/SOA/System";

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

abstract class InterpolateSystem implements ISystem {
    constructor() {
    }
    process(components: IInterpolableComponent[], progress: number) {
        let l = components.length;
        for (let i = 0; i < l; ++i) {
            let c = components[i];
            let length = c.endValue - c.startValue;
            let nt = progress / length;
            c.currentValue = this.interpolate(nt);
        };
    }
    protected abstract interpolate(t: number): number
}

class LinearSystemSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t;
    }
}

class easeInQuadSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t * t;
    }
}

class easeOutQuadSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t * (2 - t);
    }
}

class easeInOutQuadSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
}

class easeInCubicSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t * t * t;
    }
}

class easeOutCubicSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return (--t) * t * t + 1;;
    }
}

class easeInOutCubicSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }
}

class easeInQuartSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t * t * t * t;
    }
}


class easeInOutQuartSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }
}

class easeOutQuartSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return 1 - (--t) * t * t * t;
    }
}

class easeInQuintSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t * t * t * t * t;
    }
}

class easeOutQuintSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return 1 + (--t) * t * t * t * t;
    }
}

class easeInOutQuintSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(components: IInterpolableComponent[], progress: number) {
        super.process(components, progress);
    }
    protected interpolate(t: number) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
}

const easingSystem = {
    systems: [new LinearSystemSys(),
    new easeInQuadSys(),
    new easeOutQuadSys(),
    new easeInOutQuadSys(),
    new easeInCubicSys(),
    new easeOutCubicSys(),
    new easeInOutCubicSys(),
    new easeInQuartSys(),
    new easeOutQuartSys(),
    new easeInOutQuartSys(),
    new easeInQuintSys(),
    new easeOutQuintSys(),
    new easeInOutQuintSys()
    ],
    process: function (factories: ComponentFactory<IInterpolableComponent>[], progress: number) {
        let l = factories.length;
        //iterate over all factories, supposed its in the same order as instanciated in the easingSystem
        for (let i = 0; i < l; ++i) {
            let pool = factories[i].pool;
                this.systems[i].process(pool, progress);
        }
    }
}


export { easingMethod, IInterpolableComponent, InterpolableComponent, InterpolateSystem, easingSystem }