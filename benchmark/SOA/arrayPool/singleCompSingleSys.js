"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eC = require("../lib/sampleImplementation/component/easing");
var eS = require("../lib/sampleImplementation/system/interpolationSystem-array");
var ComponentFactoryArray_1 = require("../../../src/SOA/ComponentFactoryArray");
var benchInterpolableSys = (function () {
    function benchInterpolableSys(nbComponents) {
        this.system = this.createSystem();
        this.factory = this.createFactories();
        this.createComponents(nbComponents);
    }
    benchInterpolableSys.prototype.createSystem = function () {
        return new eS.linearSys();
    };
    benchInterpolableSys.prototype.createFactories = function () {
        return new ComponentFactoryArray_1.ComponentFactoryArray();
    };
    benchInterpolableSys.prototype.createComponents = function (n) {
        for (var i = 0; i < n; ++i) {
            this.factory.createComponent(eC.InterpolableComponent);
        }
    };
    benchInterpolableSys.prototype.process = function (progress) {
        this.system.process(this.factory, progress);
    };
    benchInterpolableSys.prototype.clear = function () {
        this.factory.removeAll();
    };
    return benchInterpolableSys;
}());
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
function test(nbComponent) {
    var t = new benchInterpolableSys(nbComponent);
    var label = nbComponent + " components, 1 system";
    console.time(label);
    t.process(1);
    console.timeEnd(label);
    t.clear();
}
