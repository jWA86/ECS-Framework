"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eC = require("../lib/sampleImplementation/component/easing");
var eS = require("../lib/sampleImplementation/system/interpolationSystem-map");
var ComponentFactoryMap_1 = require("../../../src/SOA/ComponentFactoryMap");
var benchInterpolableSys = (function () {
    function benchInterpolableSys(nbComponents) {
        this.system = this.createSystem();
        this.factories = this.createFactories();
        this.createComponents(nbComponents);
    }
    benchInterpolableSys.prototype.createSystem = function () {
        return new eS.InterpolationSystem();
    };
    benchInterpolableSys.prototype.createFactories = function () {
        var r = [];
        var nbFact = this.system.systems.length;
        for (var i = 0; i < nbFact; ++i) {
            r.push(new ComponentFactoryMap_1.ComponentFactoryMap());
        }
        return r;
    };
    benchInterpolableSys.prototype.createComponents = function (n) {
        this.factories.forEach(function (f) {
            for (var i = 0; i < n; ++i) {
                f.createComponent(eC.InterpolableComponent);
            }
        });
    };
    benchInterpolableSys.prototype.process = function (progress) {
        this.system.process(this.factories, progress);
    };
    benchInterpolableSys.prototype.clear = function () {
        this.factories.forEach(function (f) {
            f.removeAll();
        });
        this.factories = [];
    };
    return benchInterpolableSys;
}());
test(1);
test(1);
test(2);
test(5);
test(10);
test(100);
test(1000);
test(10000);
test(100000);
function test(nbComponent) {
    var t = new benchInterpolableSys(nbComponent);
    var label = nbComponent + " components per system";
    console.time(label);
    t.process(1);
    console.timeEnd(label);
    t.clear();
}
