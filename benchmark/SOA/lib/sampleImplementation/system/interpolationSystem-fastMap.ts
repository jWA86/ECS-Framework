import {IComponent, IComponentFactory } from "../../../../../src/SOA/interfaces";
import { ComponentFactoryFastMap as ComponentFactory} from "../../../../../src/SOA/ComponentFactoryFastMap";
import { ISystem, ISytemManager } from "../../../../../src/SOA/System";
import {IInterpolableComponent, InterpolableComponent, easingMethod} from "../component/easing";


// multiple implementations of single component system
// real world use case would merge all easing system in one 
// but this usefull to test how differents computation affect the performance

interface IEasingSystem extends ISystem {
    process(factory:IComponentFactory<IInterpolableComponent>, progress: number);
    execute(t: number): number;
}

abstract class EasingSystem implements IEasingSystem {
    constructor() {
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        let l = factory.size;
        for (let i = 0; i < l; ++i) {
            //since it's an array implementation, iterate directly via the pool instead of .get(id)
            let c = factory.pool[i];
            //doesn't check if it's equal 0
            let length = c.endValue - c.startValue;
            if(progress <= length){
                let nt = progress / length;
                c.currentValue = this.execute(nt);
            }
        };
    }
    abstract execute(t: number): number
}

class linearSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t;
    }
}

class easeInQuadSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t * t;
    }
}

class easeOutQuadSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
execute(t: number) {
        return t * (2 - t);
    }
}

class easeInOutQuadSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
}

class easeInCubicSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t * t * t;
    }
}

class easeOutCubicSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return (--t) * t * t + 1;;
    }
}

class easeInOutCubicSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }
}

class easeInQuartSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t * t * t * t;
    }
}


class easeInOutQuartSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }
}

class easeOutQuartSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return 1 - (--t) * t * t * t;
    }
}

class easeInQuintSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t * t * t * t * t;
    }
}

class easeOutQuintSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return 1 + (--t) * t * t * t * t;
    }
}

class easeInOutQuintSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory:ComponentFactory<IInterpolableComponent>, progress: number) {
        super.process(factory, progress);
    }
    execute(t: number) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
}

//System that warp all easing systems
//should use branching instead in real use case ?
class InterpolationSystem implements ISytemManager{
    systems:IEasingSystem[];
    constructor(){
        this.systems = [
            new linearSys(),
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
    }
    process(factories: IComponentFactory<IInterpolableComponent>[], progress: number) {
        let l = factories.length;
        //iterate over all factories, supposed its in the same order as instanciated in the easingSystem
        let called = 0;
        for (let i = 0; i < l; ++i) {
            this.systems[i].process(factories[i], progress);
        }
    }
}

export {
    easingMethod,
    IInterpolableComponent, InterpolableComponent,
    EasingSystem, InterpolationSystem,
    linearSys,
    easeInQuadSys,
    easeOutQuadSys,
    easeInOutQuadSys,
    easeInCubicSys,
    easeOutCubicSys,
    easeInOutCubicSys,
    easeInQuartSys,
    easeOutQuartSys,
    easeInOutQuartSys,
    easeInQuintSys,
    easeOutQuintSys,
    easeInOutQuintSys
}