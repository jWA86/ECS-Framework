import { IComponent, IComponentFactory } from "../../../../src/interfaces";
import { TogglableComponentFactory as ComponentFactory } from "../../../../src/ComponentFactory";
import { ISystem } from "../../../../src/System";
import { IInterpolableComponent, InterpolableComponent, easingMethod } from "../component/easing";

// iteration with getComponent by id, ids are id of component that are actives

interface ISytemManager {
    systems:ISystem[];
    process(factories: IComponentFactory<IComponent>[], ...args:any[]);
}

interface IEasingSystem extends ISystem {
    process(factory: IComponentFactory<IInterpolableComponent>, ids:string[], progress: number);
    execute(t: number): number;
}

abstract class EasingSystem implements IEasingSystem {
    constructor() {}
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        let l = ids.length;
        for(let i = 0; i < l; ++i) {
            let c = factory.getComponent(ids[i]);
            let length = c.endValue - c.startValue;
            let nt = progress / length;
            c.currentValue = this.execute(nt);
            
        }
    }
    abstract execute(t: number): number
}

class linearSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t;
    }
}

class easeInQuadSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t * t;
    }
}

class easeOutQuadSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t * (2 - t);
    }
}

class easeInOutQuadSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
}

class easeInCubicSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t * t * t;
    }
}

class easeOutCubicSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return (--t) * t * t + 1;;
    }
}

class easeInOutCubicSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }
}

class easeInQuartSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t * t * t * t;
    }
}


class easeInOutQuartSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }
}

class easeOutQuartSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return 1 - (--t) * t * t * t;
    }
}

class easeInQuintSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t * t * t * t * t;
    }
}

class easeOutQuintSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return 1 + (--t) * t * t * t * t;
    }
}

class easeInOutQuintSys extends EasingSystem {
    constructor() {
        super();
    }
    process(factory: ComponentFactory<InterpolableComponent >, ids:string[], progress: number) {
        super.process(factory, ids, progress);
    }
    execute(t: number) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
}

//System that warp all easing systems
//should use branching instead in real use case ?
class InterpolationSystem implements ISytemManager {
    systems: IEasingSystem[];
    constructor() {
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
    process(factories: IComponentFactory<IInterpolableComponent>[], ids:string[], progress: number) {
        let l = factories.length;
        //iterate over all factories, supposed its in the same order as instanciated in the easingSystem
        let called = 0;
        for (let i = 0; i < l; ++i) {
            this.systems[i].process(factories[i], ids, progress);
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