"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentFactory_1 = require("../../src/SOA/ComponentFactory");
var SimpleSystem_1 = require("./SimpleSystem");
var b = require("../benchLib");
var main = {
    progress: 0,
    init: function (nb, easing) {
        this.factory = new ComponentFactory_1.ComponentFactory();
        this.system = new SimpleSystem_1.InterpolateSystem();
        this.createComponents(nb, easing);
    },
    next: function () {
        this.progress += 1;
        var start = process.hrtime();
        this.system.process(this.factory.pool, this.progress);
        return process.hrtime(start);
    },
    createComponents: function (nb, easing) {
        for (var i = 0; i < nb; ++i) {
            var c = this.factory.createComponent(SimpleSystem_1.InterpolableComponent);
            c.endValue = Math.random() * 10 * i;
            if (easing === undefined) {
                c.easing = Math.floor(Math.random() * Object.keys(SimpleSystem_1.easingMethod).length / 2);
            }
            else {
                c.easing = easing;
            }
        }
    },
    clear: function () {
        this.factory.removeAll();
        this.factory = null;
        this.system = null;
    }
};
var bench = function (nb, easing) {
    main.init(nb, easing);
    var m = [];
    for (var i = 0; i < 100; ++i) {
        m.push(main.next());
    }
    var e = SimpleSystem_1.easingMethod[easing];
    if (e === undefined) {
        e = "random";
    }
    var moy = b.mean(m);
    var res = { "nb": nb,
        "easingMethod": e,
        "mean": moy / b.NS_PER_MS,
        "max": b.max(m).value / b.NS_PER_MS,
        "min": b.min(m).value / b.NS_PER_MS,
        "SD": Math.sqrt(b.variance(m, moy)) / b.NS_PER_MS,
        "first": (m[0][0] * b.NS_PER_SEC + m[0][1]) / b.NS_PER_MS,
        "raw": m,
        "unit": "ms"
    };
    main.clear();
    return res;
};
var r = [];
console.time("linear");
r.push(bench(10, SimpleSystem_1.easingMethod.linear));
r.push(bench(100, SimpleSystem_1.easingMethod.linear));
r.push(bench(1000, SimpleSystem_1.easingMethod.linear));
r.push(bench(10000, SimpleSystem_1.easingMethod.linear));
r.push(bench(100000, SimpleSystem_1.easingMethod.linear));
console.timeEnd("linear");
console.time("easeInQuad");
r.push(bench(10, SimpleSystem_1.easingMethod.easeInQuad));
r.push(bench(100, SimpleSystem_1.easingMethod.easeInQuad));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeInQuad));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeInQuad));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeInQuad));
console.timeEnd("easeInQuad");
console.time("easeOutQuad");
r.push(bench(10, SimpleSystem_1.easingMethod.easeOutQuad));
r.push(bench(100, SimpleSystem_1.easingMethod.easeOutQuad));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeOutQuad));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeOutQuad));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeOutQuad));
console.timeEnd("easeOutQuad");
console.time("easeInOutQuad");
r.push(bench(10, SimpleSystem_1.easingMethod.easeInOutQuad));
r.push(bench(100, SimpleSystem_1.easingMethod.easeInOutQuad));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeInOutQuad));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeInOutQuad));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeInOutQuad));
console.timeEnd("easeInOutQuad");
console.time("easeInCubic");
r.push(bench(10, SimpleSystem_1.easingMethod.easeInCubic));
r.push(bench(100, SimpleSystem_1.easingMethod.easeInCubic));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeInCubic));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeInCubic));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeInCubic));
console.timeEnd("easeInCubic");
console.time("easeOutCubic");
r.push(bench(10, SimpleSystem_1.easingMethod.easeOutCubic));
r.push(bench(100, SimpleSystem_1.easingMethod.easeOutCubic));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeOutCubic));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeOutCubic));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeOutCubic));
console.timeEnd("easeOutCubic");
console.time("easeInOutCubic");
r.push(bench(10, SimpleSystem_1.easingMethod.easeInOutCubic));
r.push(bench(100, SimpleSystem_1.easingMethod.easeInOutCubic));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeInOutCubic));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeInOutCubic));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeInOutCubic));
console.timeEnd("easeInOutCubic");
console.time("easeInQuart");
r.push(bench(10, SimpleSystem_1.easingMethod.easeInQuart));
r.push(bench(100, SimpleSystem_1.easingMethod.easeInQuart));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeInQuart));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeInQuart));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeInQuart));
console.timeEnd("easeInQuart");
console.time("easeOutQuart");
r.push(bench(10, SimpleSystem_1.easingMethod.easeOutQuart));
r.push(bench(100, SimpleSystem_1.easingMethod.easeOutQuart));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeOutQuart));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeOutQuart));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeOutQuart));
console.timeEnd("easeOutQuart");
console.time("easeInOutQuart");
r.push(bench(10, SimpleSystem_1.easingMethod.easeInOutQuart));
r.push(bench(100, SimpleSystem_1.easingMethod.easeInOutQuart));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeInOutQuart));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeInOutQuart));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeInOutQuart));
console.timeEnd("easeInOutQuart");
console.time("easeInQuint");
r.push(bench(10, SimpleSystem_1.easingMethod.easeInQuint));
r.push(bench(100, SimpleSystem_1.easingMethod.easeInQuint));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeInQuint));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeInQuint));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeInQuint));
console.timeEnd("easeInQuint");
console.time("easeOutQuint");
r.push(bench(10, SimpleSystem_1.easingMethod.easeOutQuint));
r.push(bench(100, SimpleSystem_1.easingMethod.easeOutQuint));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeOutQuint));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeOutQuint));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeOutQuint));
console.timeEnd("easeOutQuint");
console.time("easeInOutQuint");
r.push(bench(10, SimpleSystem_1.easingMethod.easeInOutQuint));
r.push(bench(100, SimpleSystem_1.easingMethod.easeInOutQuint));
r.push(bench(1000, SimpleSystem_1.easingMethod.easeInOutQuint));
r.push(bench(10000, SimpleSystem_1.easingMethod.easeInOutQuint));
r.push(bench(100000, SimpleSystem_1.easingMethod.easeInOutQuint));
console.timeEnd("easeInOutQuint");
console.time("random");
r.push(bench(10));
r.push(bench(100));
r.push(bench(1000));
r.push(bench(10000));
r.push(bench(100000));
console.timeEnd("random");
function writeRes(res) {
}
