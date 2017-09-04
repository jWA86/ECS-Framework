import * as m from "./utils/perfTestUtils"
import * as eC from "./lib/sampleImplementation/component/easing";
import * as eS from "./lib/sampleImplementation/system/interpolationSystem";
import { ComponentFactory} from "../src/ComponentFactory";

class benchInterpolableSys implements m.IPerfTest {
    system:eS.EasingSystem;
    factory:ComponentFactory<eC.InterpolableComponent>;
    constructor(nbComponents:number){
        this.system = this.createSystem();
        this.factory = this.createFactories(nbComponents);
        this.createComponents(nbComponents);
    }
    
    createSystem(){
        return new eS.linearSys();
    }
    createFactories(nbComponents){
        return new ComponentFactory<eC.InterpolableComponent>(nbComponents, eC.InterpolableComponent, true);
    }
    createComponents(n:number) {
            for(let i = 0;i<n;++i){
                this.factory.create(eC.InterpolableComponent, "c"+i, true);                
            }
    }
    process(progress:number) {
        this.system.process(this.factory, progress);
    }
    clear(){
        this.factory.clear();
    }
}

// test 1 system process x components

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
    let label = nbComponent + " components, 1 system";
    console.time(label);
    t.process(1);
    console.timeEnd(label);
    t.clear();
}

