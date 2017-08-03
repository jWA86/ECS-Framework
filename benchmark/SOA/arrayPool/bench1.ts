//simple benchmark testing multiple components number processed by 13 differents systems x time
import {IComponent} from "../../../src/SOA/interfaces"
import { ComponentFactoryArray as ComponentFactory } from "../../../src/SOA/ComponentFactoryArray";
import { easingMethod, IInterpolableComponent, InterpolableComponent, InterpolateSystem, System } from "./SimpleSystem";
import * as b from "../../benchLib";

const main = {
    progress: 0,
    factories: [],
    createFactories: function () {
        //create a component factory for each type of components
        let nbFact = Object.keys(easingMethod).length / 2;
        for (let i = 0; i < nbFact; ++i) {
            this.factories.push(new ComponentFactory<IInterpolableComponent>());
        }
    },
    init: function (nbComponent: number) {
        this.createFactories();
        this.system = System;
        this.createComponents(nbComponent); 
        this.progress = 0;
    },
    next: function () {
        this.progress += 1;
        let start = process.hrtime();
        this.system.process(this.factories, this.progress);
        return process.hrtime(start);
    },
    createComponents: function (nb: number) {
        for (let f = 0; f < this.factories.length; ++f) {
            for (let i = 0; i < nb; ++i) {
                let c = this.factories[f].createComponent(InterpolableComponent);
                c.endValue = 1+Math.floor(Math.random() * 10 * i);
            }
        }
    },
    clear: function () {
        this.factories.forEach((f) => {
            f.removeAll();
        });
        this.factories = [];
        this.system = null;
        this.progress = 0;
    }
}


const bench = function (nbLoop, nbComp) {
    let m = [];
    for (let i = 0; i < nbLoop; ++i) {
        m.push(main.next());
    }
    let moy = b.mean(m);
    let res = {
        "nb": nbComp,
        "easingMethod": "all sys one by one",
        "nbIteration": nbLoop,
        "mean": moy / b.NS_PER_MS,
        "max": b.max(m).value / b.NS_PER_MS,
        "min": b.min(m).value / b.NS_PER_MS,
        "SD": Math.sqrt(b.variance(m, moy)) / b.NS_PER_MS,
        "first": (m[0][0] * b.NS_PER_SEC + m[0][1]) / b.NS_PER_MS,
        "raw": m,
        "unit": "ms"
    }
    return res;
}

//warm up
 main.init(100);
 bench(10, 100);
 main.clear();



// test with x (10, 100, 1000 ,10000 ,100000) components for each type of component (13 easing system)
// sample over y iterations (1, 2, 3, 10, 100) 
let r = [];
//1 iteration
main.init(10);
console.time("10c * 1 / sys");
r.push(bench(1, 10));
console.timeEnd("10c * 1 / sys");
main.clear();

main.init(20);
console.time("20c * 1 / sys");
r.push(bench(1, 20));
console.timeEnd("20c * 1 / sys");
main.clear();

main.init(40);
console.time("40c * 1 / sys");
r.push(bench(1, 40));
console.timeEnd("40c * 1 / sys");
main.clear();

main.init(60);
console.time("60c * 1 / sys");
r.push(bench(1, 60));
console.timeEnd("60c * 1 / sys");
main.clear();

main.init(100);
console.time("100c * 1 / sys");
r.push(bench(1, 100));
console.timeEnd("100c * 1 / sys");
main.clear();

main.init(1000);
console.time("1000c * 1 / sys");
r.push(bench(1, 1000));
console.timeEnd("1000c * 1 / sys");
main.clear();

main.init(10000);
console.time("10000c * 1 / sys");
r.push(bench(1, 10000));
console.timeEnd("10000c * 1 / sys");
main.clear();

main.init(100000);
console.time("100000c * 1 / sys");
r.push(bench(1, 100000));
console.timeEnd("100000c * 1 / sys");
main.clear();

// // 2 iterations
// main.init(10);
// console.time("10c * 2 / sys");
// r.push(bench(2, 10));
// console.timeEnd("10c * 2 / sys");
// main.clear();

// main.init(100);
// console.time("100c * 2 / sys");
// r.push(bench(2, 100));
// console.timeEnd("100c * 2 / sys");
// main.clear();

// main.init(1000);
// console.time("1000c * 2 / sys");
// r.push(bench(2, 1000));
// console.timeEnd("1000c * 2 / sys");
// main.clear();

// main.init(10000);
// console.time("10000c * 2 / sys");
// r.push(bench(2, 10000));
// console.timeEnd("10000c * 2 / sys");
// main.clear();

// main.init(100000);
// console.time("100000c * 2 / sys");
// r.push(bench(2, 100000));
// console.timeEnd("100000c * 2 / sys");
// main.clear();

// // 3 iterations
// main.init(10);
// console.time("10c * 3 / sys");
// r.push(bench(3, 10));
// console.timeEnd("10c * 3 / sys");
// main.clear();

// main.init(100);
// console.time("100c * 3 / sys");
// r.push(bench(3, 100));
// console.timeEnd("100c * 3 / sys");
// main.clear();

// main.init(1000);
// console.time("1000c * 3 / sys");
// r.push(bench(3, 1000));
// console.timeEnd("1000c * 3 / sys");
// main.clear();

// main.init(10000);
// console.time("10000c * 3 / sys");
// r.push(bench(3, 10000));
// console.timeEnd("10000c * 3 / sys");
// main.clear();

// main.init(100000);
// console.time("100000c * 3 / sys");
// r.push(bench(3, 100000));
// console.timeEnd("100000c * 3 / sys");
// main.clear();

// // 10 iterations
// main.init(10);
// console.time("10c * 10 / sys");
// r.push(bench(10, 10));
// console.timeEnd("10c * 10 / sys");
// main.clear();

// main.init(100);
// console.time("100c * 10 / sys");
// r.push(bench(10, 100));
// console.timeEnd("100c * 10 / sys");
// main.clear();

// main.init(1000);
// console.time("1000c * 10 / sys");
// r.push(bench(10, 1000));
// console.timeEnd("1000c * 10 / sys");
// main.clear();

// main.init(10000);
// console.time("10000c * 10 / sys");
// r.push(bench(10, 10000));
// console.timeEnd("10000c * 10 / sys");
// main.clear();

// main.init(100000);
// console.time("100000c * 10 / sys");
// r.push(bench(10, 100000));
// console.timeEnd("100000c * 10 / sys");
// main.clear();

// // 100 iterations
// main.init(10);
// console.time("10c * 100 / sys");
// r.push(bench(100, 10));
// console.timeEnd("10c * 100 / sys");
// main.clear();

// main.init(100);
// console.time("100c * 100 / sys");
// r.push(bench(100, 100));
// console.timeEnd("100c * 100 / sys");
// main.clear();

// main.init(1000);
// console.time("1000c * 100 / sys");
// r.push(bench(100, 1000));
// console.timeEnd("1000c * 100 / sys");
// main.clear();

// main.init(10000);
// console.time("10000c * 100 / sys");
// r.push(bench(100, 10000));
// console.timeEnd("10000c * 100 / sys");
// main.clear();

// main.init(100000);
// console.time("100000c * 100 / sys");
// r.push(bench(100, 100000));
// console.timeEnd("100000c * 100 / sys");
// main.clear();

b.writeRes(r, "./benchmark/SOA/arrayPool/res/bench1");