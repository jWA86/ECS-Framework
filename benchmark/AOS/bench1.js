"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentFactory_1 = require("../../src/AOS/ComponentFactory");
var b = require("../benchLib");
var easingMethod;
(function (easingMethod) {
    easingMethod[easingMethod["linear"] = 0] = "linear";
    easingMethod[easingMethod["easeInQuad"] = 1] = "easeInQuad";
    easingMethod[easingMethod["easeOutQuad"] = 2] = "easeOutQuad";
    easingMethod[easingMethod["easeInOutQuad"] = 3] = "easeInOutQuad";
    easingMethod[easingMethod["easeInCubic"] = 4] = "easeInCubic";
    easingMethod[easingMethod["easeOutCubic"] = 5] = "easeOutCubic";
    easingMethod[easingMethod["easeInOutCubic"] = 6] = "easeInOutCubic";
    easingMethod[easingMethod["easeInQuart"] = 7] = "easeInQuart";
    easingMethod[easingMethod["easeOutQuart"] = 8] = "easeOutQuart";
    easingMethod[easingMethod["easeInOutQuart"] = 9] = "easeInOutQuart";
    easingMethod[easingMethod["easeInQuint"] = 10] = "easeInQuint";
    easingMethod[easingMethod["easeOutQuint"] = 11] = "easeOutQuint";
    easingMethod[easingMethod["easeInOutQuint"] = 12] = "easeInOutQuint";
})(easingMethod || (easingMethod = {}));
var InterpolableComponent = (function () {
    function InterpolableComponent(id, easing, startValue, endValue) {
        if (easing === void 0) { easing = easingMethod.linear; }
        if (startValue === void 0) { startValue = 0; }
        if (endValue === void 0) { endValue = 1; }
        this.id = id;
        this.easing = easing;
        this.startValue = startValue;
        this.endValue = endValue;
        this.currentValue = this.startValue;
    }
    return InterpolableComponent;
}());
var interpolateSystem = (function () {
    function interpolateSystem() {
        this.easingFunctions = {
            // no easing, no acceleration
            linear: function (t) { return t; },
            // accelerating from zero velocity
            easeInQuad: function (t) { return t * t; },
            // decelerating to zero velocity
            easeOutQuad: function (t) { return t * (2 - t); },
            // acceleration until halfway, then deceleration
            easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
            // accelerating from zero velocity 
            easeInCubic: function (t) { return t * t * t; },
            // decelerating to zero velocity 
            easeOutCubic: function (t) { return (--t) * t * t + 1; },
            // acceleration until halfway, then deceleration 
            easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
            // accelerating from zero velocity 
            easeInQuart: function (t) { return t * t * t * t; },
            // decelerating to zero velocity 
            easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
            // acceleration until halfway, then deceleration
            easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
            // accelerating from zero velocity
            easeInQuint: function (t) { return t * t * t * t * t; },
            // decelerating to zero velocity
            easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
            // acceleration until halfway, then deceleration 
            easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
        };
    }
    interpolateSystem.prototype.process = function (components, progress) {
        var l = components.length;
        for (var i = 0; i < l; ++i) {
            var length_1 = components[i].endValue - components[i].startValue;
            var normProgress = progress / length_1;
            components[i].currentValue = this.easingFunctions[easingMethod[components[i].easing]](normProgress);
        }
        ;
    };
    return interpolateSystem;
}());
var main = {
    progress: 0,
    init: function (nb, easing) {
        this.factory = new ComponentFactory_1.ComponentFactory();
        this.system = new interpolateSystem();
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
            var c = this.factory.createComponent(InterpolableComponent);
            c.endValue = Math.random() * 10 * i;
            if (easing === undefined) {
                c.easing = easingMethod[Math.floor(Math.random() * 12)];
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
    var e = easingMethod[easing];
    if (!e) {
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
        "raw": m
    };
    main.clear();
    return res;
};
var r = [];
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
r.push(bench(10, easingMethod.easeOutCubic));
r.push(bench(100, easingMethod.easeOutCubic));
r.push(bench(1000, easingMethod.easeOutCubic));
r.push(bench(10000, easingMethod.easeOutCubic));
r.push(bench(100000, easingMethod.easeOutCubic));
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
