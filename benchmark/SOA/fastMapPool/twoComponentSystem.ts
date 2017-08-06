import * as m from "../../utils/perfTestUtils"
import * as eC from "../lib/sampleImplementation/component/easing";
import * as eS from "../lib/sampleImplementation/system/interpolationSystem-fastMap";
import * as vC from "../lib/sampleImplementation/component/vec2";
import { ScaleSystem } from "../lib/sampleImplementation/system/scaleVec2InterpolateSystem";
import { ComponentFactoryFastMap as ComponentFactory } from "../../../src/SOA/ComponentFactoryFastMap";
import { TupleComponentSystem, ITupleComponent, TupleComponent } from "../../../src/SOA/MultiComponentSystem";

class benchTupleSys implements m.IPerfTest {
    easingSystem: eS.EasingSystem;
    system: TupleComponentSystem;

    easingFactories: ComponentFactory<eC.IInterpolableComponent>;
    vec2Factory: ComponentFactory<vC.IVec2Component>;
    tupleFactory: ComponentFactory<ITupleComponent>;

    constructor(nbComponents: number) {
        this.createFactories();
        this.createSystem(this.vec2Factory, this.easingFactories);
        this.createComponents(nbComponents);
    }
    createSystem(factory1, factory2) {
        this.easingSystem = new eS.linearSys();
        this.system = new ScaleSystem(factory1, factory2);
    }

    createFactories() {
        this.vec2Factory = new ComponentFactory<vC.Vec2Component>();
        this.easingFactories = new ComponentFactory<eC.InterpolableComponent>();
        this.tupleFactory = new ComponentFactory<ITupleComponent>();
    }

    createComponents(n: number) {
        this.createVec2Components(n);
        this.createEasingComponents(n);
        this.createInverseAssociationTupleComponents();
    }

    createVec2Components(n: number) {
        for (let i = 0; i < n; ++i) {
            this.vec2Factory.createComponent(vC.Vec2Component, 1, 1);
        }
    }

    createEasingComponents(n: number) {
        for (let i = 0; i < n; ++i) {
            let e = this.easingFactories.createComponent(eC.InterpolableComponent, 0, 10);
            e.currentValue = 2;
        }
    }

    //inverse association first of vec2 component with last of interpolation component
    createInverseAssociationTupleComponents() {
        let ea = [];
        this.easingFactories.pool.forEach((e) => {
            ea.push(e.id);
        });
        ea.reverse();
        let i = 0;
        let c;
        this.vec2Factory.pool.forEach((v) => {
            c = this.tupleFactory.createComponent(TupleComponent, [v.id, ea[i]]);
            ++i;
        });
    }

    process() {
        this.system.process(this.tupleFactory);
    }

    clear() {
        this.easingFactories.removeAll();
        this.vec2Factory.removeAll();
        this.tupleFactory.removeAll();
    }
}

// test (random associations ?) (parallèle association ?) (inverse association ?)

test(1);
test(1);
test(2);
test(5);
test(10);
test(100);
test(1000);
test(10000);
test(100000);

function test(nbComponent: number) {
    let t = new benchTupleSys(nbComponent);
    let label = nbComponent + " components, 1 system";
    console.time(label);
    t.process();
    console.timeEnd(label);
    t.clear();
}