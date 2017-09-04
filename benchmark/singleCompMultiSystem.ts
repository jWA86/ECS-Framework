import * as m from "./utils/perfTestUtils"
import * as eC from "./lib/sampleImplementation/component/easing";
import * as eS from "./lib/sampleImplementation/system/interpolationSystem";
import { ComponentFactory } from "../src/ComponentFactory";

class benchInterpolableSys implements m.IPerfTest {
    system: eS.InterpolationSystem;
    factories: ComponentFactory<eC.InterpolableComponent>[];
    constructor(nbComponents: number) {
        this.system = this.createSystem();
        this.factories = this.createFactories(nbComponents);
        this.createComponents(nbComponents);
    }

    createSystem() {
        return new eS.InterpolationSystem();
    }
    createFactories(nbComponents) {
        let r = [];
        let nbFact = this.system.systems.length;
        for (let i = 0; i < nbFact; ++i) {
            r.push(new ComponentFactory<eC.InterpolableComponent>(nbComponents, eC.InterpolableComponent));
        }
        return r;
    }
    createComponents(n: number) {
        this.factories.forEach((f) => {
            for (let i = 0; i < n; ++i) {
                f.create(eC.InterpolableComponent, "c" + i, true);
            }
        });
    }
    process(progress: number) {
        this.system.process(this.factories, progress);
    }
    clear() {
        this.factories.forEach((f) => {
            f.clear();
        });
        this.factories = [];
    }
}


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
    let t = new benchInterpolableSys(nbComponent);
    let label = nbComponent + " components, 13 systems";
    console.time(label);
    t.process(1);
    console.timeEnd(label);
    t.clear();
}

