"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eC = require("./lib/sampleImplementation/component/easing");
var eS = require("./lib/sampleImplementation/system/toggableInterpolationSystem");
var ComponentFactory_1 = require("../src/ComponentFactory");
//array with active and inactive elements and if in the process (toggableComponent)
var benchToggableInterpolableSys = (function () {
    function benchToggableInterpolableSys(nbComponents, nbActive) {
        this.system = this.createSystem();
        this.factories = this.createFactories(nbComponents);
        this.createComponents(nbComponents, nbActive);
    }
    benchToggableInterpolableSys.prototype.createSystem = function () {
        return new eS.InterpolationSystem();
    };
    benchToggableInterpolableSys.prototype.createFactories = function (nbComponents) {
        var r = [];
        var nbFact = this.system.systems.length;
        for (var i_1 = 0; i_1 < nbFact; ++i_1) {
            r.push(new ComponentFactory_1.ComponentFactory(nbComponents, eC.InterpolableComponent, true));
        }
        return r;
    };
    benchToggableInterpolableSys.prototype.createComponents = function (nbComponent, nbActive) {
        this.factories.forEach(function (f) {
            for (var i_2 = 0; i_2 < nbComponent; ++i_2) {
                f.create(eC.InterpolableComponent, "c" + i_2, true);
                f.get("c" + i_2).active = false;
            }
        });
        var a = 0;
        var _loop_1 = function () {
            var rand = Math.floor(Math.random() * nbActive);
            if (!this_1.factories[0].values[rand].active) {
                a++;
                this_1.factories.forEach(function (f) {
                    f.values[rand].active = true;
                });
            }
        };
        var this_1 = this;
        while (a < nbActive) {
            _loop_1();
        }
    };
    benchToggableInterpolableSys.prototype.process = function (progress) {
        this.system.process(this.factories, progress);
    };
    benchToggableInterpolableSys.prototype.clear = function () {
        this.factories.forEach(function (f) {
            f.clear();
        });
        this.factories = [];
    };
    return benchToggableInterpolableSys;
}());
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
function test(nbComponent, nbActive) {
    var t = new benchToggableInterpolableSys(nbComponent, nbActive);
    var label = nbComponent + " of which " + nbActive + " actives components, 13 systems";
    console.time(label);
    t.process(1);
    console.timeEnd(label);
    t.clear();
}
