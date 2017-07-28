import { ComponentFactory, IComponent } from "../../src/SOA/ComponentFactory";
import {easingMethod,  IInterpolableComponent, InterpolableComponent, InterpolateSystem} from "./SimpleSystem";
import * as b from "../benchLib";


const main = {
    progress: 0,
    init: function (nb: number, easing?: easingMethod) { 
        this.factory = new ComponentFactory<IInterpolableComponent>();
        this.system = new InterpolateSystem();
        this.createComponents(nb, easing);
    }, 
    next: function () {
        this.progress += 1;
        let start = process.hrtime();
        this.system.process(this.factory.pool, this.progress);
        return process.hrtime(start);
    },
    createComponents: function (nb: number, easing?: easingMethod) {
        for (let i = 0; i < nb; ++i) {
            let c = this.factory.createComponent(InterpolableComponent);
            c.endValue = Math.random() * 10 * i;
            if (easing === undefined) {
                c.easing = Math.floor(Math.random() * Object.keys(easingMethod).length / 2);
                
            } else {
                c.easing = easing;
            }
        }
    },
    clear: function () {
        this.factory.removeAll();
        this.factory = null;
        this.system = null;
    }
}


const bench = function (nb, easing?) {
    main.init(nb, easing);
    let m = [];
    for (let i = 0; i < 100; ++i) {
        m.push(main.next());
    }
    let e = easingMethod[easing];
    if(e===undefined){
        e = "random";
    }
    let moy = b.mean(m);
    let res = {"nb":nb,
    "easingMethod":e,
    "mean":moy / b.NS_PER_MS,
    "max":b.max(m).value / b.NS_PER_MS,
    "min":b.min(m).value / b.NS_PER_MS,
    "SD":Math.sqrt(b.variance(m, moy)) / b.NS_PER_MS,
    "first":(m[0][0] * b.NS_PER_SEC + m[0][1]) / b.NS_PER_MS,
    "raw":m,
    "unit":"ms"
    }
    main.clear();
    return res;
}

let r = [];
console.time("linear");
r.push(bench(10, easingMethod.linear));
r.push(bench(100, easingMethod.linear));
r.push(bench(1000, easingMethod.linear));
r.push(bench(10000, easingMethod.linear));
r.push(bench(100000, easingMethod.linear));
console.timeEnd("linear");
console.time("easeInQuad");
r.push(bench(10, easingMethod.easeInQuad));
r.push(bench(100, easingMethod.easeInQuad));
r.push(bench(1000, easingMethod.easeInQuad));
r.push(bench(10000, easingMethod.easeInQuad));
r.push(bench(100000, easingMethod.easeInQuad));
console.timeEnd("easeInQuad");
console.time("easeOutQuad");
r.push(bench(10, easingMethod.easeOutQuad));
r.push(bench(100, easingMethod.easeOutQuad));
r.push(bench(1000, easingMethod.easeOutQuad));
r.push(bench(10000, easingMethod.easeOutQuad));
r.push(bench(100000, easingMethod.easeOutQuad));
console.timeEnd("easeOutQuad");
console.time("easeInOutQuad");
r.push(bench(10, easingMethod.easeInOutQuad));
r.push(bench(100, easingMethod.easeInOutQuad));
r.push(bench(1000, easingMethod.easeInOutQuad));
r.push(bench(10000, easingMethod.easeInOutQuad));
r.push(bench(100000, easingMethod.easeInOutQuad));
console.timeEnd("easeInOutQuad");
console.time("easeInCubic");
r.push(bench(10, easingMethod.easeInCubic));
r.push(bench(100, easingMethod.easeInCubic));
r.push(bench(1000, easingMethod.easeInCubic));
r.push(bench(10000, easingMethod.easeInCubic));
r.push(bench(100000, easingMethod.easeInCubic));
console.timeEnd("easeInCubic");
console.time("easeOutCubic");
r.push(bench(10, easingMethod. easeOutCubic));
r.push(bench(100, easingMethod. easeOutCubic));
r.push(bench(1000, easingMethod. easeOutCubic));
r.push(bench(10000, easingMethod. easeOutCubic));
r.push(bench(100000, easingMethod. easeOutCubic));
console.timeEnd("easeOutCubic");
console.time("easeInOutCubic");
r.push(bench(10, easingMethod.easeInOutCubic));
r.push(bench(100, easingMethod.easeInOutCubic));
r.push(bench(1000, easingMethod.easeInOutCubic));
r.push(bench(10000, easingMethod.easeInOutCubic));
r.push(bench(100000, easingMethod.easeInOutCubic));
console.timeEnd("easeInOutCubic");
console.time("easeInQuart");
r.push(bench(10, easingMethod.easeInQuart));
r.push(bench(100, easingMethod.easeInQuart));
r.push(bench(1000, easingMethod.easeInQuart));
r.push(bench(10000, easingMethod.easeInQuart));
r.push(bench(100000, easingMethod.easeInQuart));
console.timeEnd("easeInQuart");
console.time("easeOutQuart");
r.push(bench(10, easingMethod.easeOutQuart));
r.push(bench(100, easingMethod.easeOutQuart));
r.push(bench(1000, easingMethod.easeOutQuart));
r.push(bench(10000, easingMethod.easeOutQuart));
r.push(bench(100000, easingMethod.easeOutQuart));
console.timeEnd("easeOutQuart");
console.time("easeInOutQuart");
r.push(bench(10, easingMethod.easeInOutQuart));
r.push(bench(100, easingMethod.easeInOutQuart));
r.push(bench(1000, easingMethod.easeInOutQuart));
r.push(bench(10000, easingMethod.easeInOutQuart));
r.push(bench(100000, easingMethod.easeInOutQuart));
console.timeEnd("easeInOutQuart");
console.time("easeInQuint");
r.push(bench(10, easingMethod.easeInQuint));
r.push(bench(100, easingMethod.easeInQuint));
r.push(bench(1000, easingMethod.easeInQuint));
r.push(bench(10000, easingMethod.easeInQuint));
r.push(bench(100000, easingMethod.easeInQuint));
console.timeEnd("easeInQuint");
console.time("easeOutQuint");
r.push(bench(10, easingMethod.easeOutQuint));
r.push(bench(100, easingMethod.easeOutQuint));
r.push(bench(1000, easingMethod.easeOutQuint));
r.push(bench(10000, easingMethod.easeOutQuint));
r.push(bench(100000, easingMethod.easeOutQuint));
console.timeEnd("easeOutQuint");
console.time("easeInOutQuint");
r.push(bench(10, easingMethod.easeInOutQuint));
r.push(bench(100, easingMethod.easeInOutQuint));
r.push(bench(1000, easingMethod.easeInOutQuint));
r.push(bench(10000, easingMethod.easeInOutQuint));
r.push(bench(100000, easingMethod.easeInOutQuint));
console.timeEnd("easeInOutQuint");
console.time("random");
r.push(bench(10));
r.push(bench(100));
r.push(bench(1000));
r.push(bench(10000));
r.push(bench(100000));
console.timeEnd("random");


function writeRes(res){
    
}