"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eC = require("./lib/sampleImplementation/component/easing");
var eS = require("./lib/sampleImplementation/system/interpolationSystem");
var ComponentFactory_1 = require("../src/ComponentFactory");
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
        return new ComponentFactory_1.ComponentFactory();
    };
    benchInterpolableSys.prototype.createComponents = function (n) {
        for (var i_1 = 0; i_1 < n; ++i_1) {
            this.factory.createComponent(eC.InterpolableComponent, "c" + i_1);
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
