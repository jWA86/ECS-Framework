import * as m from "../../utils/perfTestUtils"
import * as eC from "../lib/sampleImplementation/component/easing";
import * as eS from "../lib/sampleImplementation/system/interpolationSystem-map";
import { ComponentFactoryMap as ComponentFactory} from "../../../src/SOA/ComponentFactoryMap";


class benchInterpolableSys implements m.IPerfTest {
    system:eS.InterpolationSystem;
    factories:ComponentFactory<eC.IInterpolableComponent>[];
    constructor(nbComponents:number){
        this.system = this.createSystem();
        this.factories = this.createFactories();
        this.createComponents(nbComponents);
    }
    
    createSystem(){
        return new eS.InterpolationSystem();

    }
    createFactories(){
        let r = [];
        let nbFact = this.system.systems.length;

        for(let i = 0; i < nbFact; ++i){
            r.push(new ComponentFactory<eC.InterpolableComponent>());
        }
        return r;
    }
    createComponents(n:number) {
        this.factories.forEach((f) => {
            for(let i = 0;i<n;++i){
                f.createComponent(eC.InterpolableComponent);                
            }
        });
    }
    process(progress:number) {
        this.system.process(this.factories, progress);
    }
    clear(){
        this.factories.forEach((f) => {
            f.removeAll();
        });
        this.factories = [];
    }
}

// test y systems with x components in y factories

test(1);
test(1);
test(2);
test(5);
test(10);
test(100);
test(1000);
test(10000);
test(100000);


function test(nbComponent:number){
    let t = new benchInterpolableSys(nbComponent);
    let label = nbComponent + " components, 13 system";
    console.time(label);
    t.process(1);
    console.timeEnd(label);
    t.clear();
}

