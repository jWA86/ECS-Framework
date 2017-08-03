import {IComponent, IComponentFactory } from "../../../src/SOA/interfaces";
import { ComponentFactoryMap} from "../../../src/SOA/ComponentFactoryMap";
import { ISystem } from "../../../src/SOA/System";
import {IInterpolableComponent, InterpolableComponent, easingMethod, IInterpolableSystem, easingSystem} from "../easingComponent";

abstract class InterpolateSystem implements IInterpolableSystem {
    constructor() {
    }
    process(factory: ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        let l = factory.size;
        factory.pool.forEach((v)=>{
            let length = v.endValue - v.startValue;
            if(progress <= length){
                let nt = progress / length;
                v.currentValue = this.interpolate(nt);
            }
        });
    }

    abstract interpolate(t: number): number
}

class LinearSystemSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t;
    }
}

class easeInQuadSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t * t;
    }
}

class easeOutQuadSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
interpolate(t: number) {
        return t * (2 - t);
    }
}

class easeInOutQuadSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
}

class easeInCubicSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t * t * t;
    }
}

class easeOutCubicSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return (--t) * t * t + 1;;
    }
}

class easeInOutCubicSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }
}

class easeInQuartSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t * t * t * t;
    }
}


class easeInOutQuartSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }
}

class easeOutQuartSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return 1 - (--t) * t * t * t;
    }
}

class easeInQuintSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t * t * t * t * t;
    }
}

class easeOutQuintSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return 1 + (--t) * t * t * t * t;
    }
}

class easeInOutQuintSys extends InterpolateSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactoryMap<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    interpolate(t: number) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
}

let systems = [new LinearSystemSys(),
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
    ];
const System = new easingSystem(systems);


export { easingMethod, IInterpolableComponent, InterpolableComponent, InterpolateSystem, System }