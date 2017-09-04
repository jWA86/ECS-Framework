import * as m from "./utils/perfTestUtils"
import * as eC from "./lib/sampleImplementation/component/easing";
import * as eS from "./lib/sampleImplementation/system/interpolationGetByIdSystem";
import { TogglableComponentFactory as ComponentFactory } from "../src/ComponentFactory";


//array with active and inactive elements and if in the process (toggableComponent)

class benchToggableInterpolableSys implements m.IPerfTest {
    system: eS.InterpolationSystem;
    factories: ComponentFactory<eC.InterpolableComponent>[];
    actives: string[] = [];
    constructor(nbComponents: number, nbActive: number) {
        this.system = this.createSystem();
        this.factories = this.createFactories();
        this.createComponents(nbComponents, nbActive);
    }

    createSystem() {
        return new eS.InterpolationSystem();
    }
    createFactories() {
        let r = [];
        let nbFact = this.system.systems.length;
        for (let i = 0; i < nbFact; ++i) {
            r.push(new ComponentFactory<eC.InterpolableComponent>());
        }
        return r;
    }
    createComponents(nbComponent: number, nbActive: number) {
        this.factories.forEach((f) => {
            for (let i = 0; i < nbComponent; ++i) {
                f.createComponent(eC.InterpolableComponent, "c"+i);
                f.activateComponent("c"+i, true);
            }
        });
        let a = 0;
        while (a < nbActive) {
            let rand = Math.floor(Math.random() * nbActive);
            let id = this.factories[0].values[rand].entityId;
            if(this.actives.indexOf(id) === -1) {
                this.actives.push(id);
                this.factories.forEach((f) => {
                    f.activateComponent(id, true);                    
                });
                a++;
            }
        }
    }
    process(progress: number) {
        this.system.process(this.factories, this.actives, progress);
    }
    clear() {
        this.factories.forEach((f) => {
            f.removeAll();
        });
        this.factories = [];
        this.actives = [];
    }
}


// // half active

test(1, 1);
test(1, 1);
test(2, 1);
test(5, 3);
test(10, 5);
test(100, 50);
test(1000, 500);
test(10000, 5000);
test(100000, 50000);

// // 1/3 active

test(5, 2);
test(10, 3);
test(100, 30);
test(1000, 300);
test(10000, 3000);
test(100000, 30000);

//all active
test(2, 2);
test(5, 5);
test(10, 10);
test(100, 100);
test(1000, 1000);
test(10000, 10000);
test(100000, 100000);


function test(nbComponent: number, nbActive:number) {
    let t = new benchToggableInterpolableSys(nbComponent, nbActive);
    let label = nbComponent + " of which "+nbActive+" actives components, 13 systems";
    console.time(label);
    t.process(1);
    console.timeEnd(label);
    t.clear();
}

