"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eC = require("../lib/sampleImplementation/component/easing");
var eS = require("../lib/sampleImplementation/system/interpolationSystem-array");
var vC = require("../lib/sampleImplementation/component/vec2");
var scaleVec2InterpolateSystem_1 = require("../lib/sampleImplementation/system/scaleVec2InterpolateSystem");
var ComponentFactoryArray_1 = require("../../../src/SOA/ComponentFactoryArray");
var MultiComponentSystem_1 = require("../../../src/SOA/MultiComponentSystem");
var benchTupleSys = (function () {
    function benchTupleSys(nbComponents) {
        this.createFactories();
        this.createSystem(this.vec2Factory, this.easingFactories);
        this.createComponents(nbComponents);
    }
    benchTupleSys.prototype.createSystem = function (factory1, factory2) {
        this.easingSystem = new eS.linearSys();
        this.system = new scaleVec2InterpolateSystem_1.ScaleSystem(factory1, factory2);
    };
    benchTupleSys.prototype.createFactories = function () {
        this.vec2Factory = new ComponentFactoryArray_1.ComponentFactoryArray();
        this.easingFactories = new ComponentFactoryArray_1.ComponentFactoryArray();
        this.tupleFactory = new ComponentFactoryArray_1.ComponentFactoryArray();
    };
    benchTupleSys.prototype.createComponents = function (n) {
        this.createVec2Components(n);
        this.createEasingComponents(n);
        this.createInverseAssociationTupleComponents();
    };
    benchTupleSys.prototype.createVec2Components = function (n) {
        for (var i = 0; i < n; ++i) {
            this.vec2Factory.createComponent(vC.Vec2Component, 1, 1);
        }
    };
    benchTupleSys.prototype.createEasingComponents = function (n) {
        for (var i = 0; i < n; ++i) {
            var e = this.easingFactories.createComponent(eC.InterpolableComponent, 0, 10);
            e.currentValue = 2;
        }
    };
    //inverse association first of vec2 component with last of interpolation component
    benchTupleSys.prototype.createInverseAssociationTupleComponents = function () {
        var _this = this;
        var ea = [];
        this.easingFactories.pool.forEach(function (e) {
            ea.push(e.id);
        });
        ea.reverse();
        var i = 0;
        var c;
        this.vec2Factory.pool.forEach(function (v) {
            c = _this.tupleFactory.createComponent(MultiComponentSystem_1.TupleComponent, [v.id, ea[i]]);
            ++i;
        });
    };
    benchTupleSys.prototype.process = function () {
        this.system.process(this.tupleFactory);
    };
    benchTupleSys.prototype.clear = function () {
        this.easingFactories.removeAll();
        this.vec2Factory.removeAll();
        this.tupleFactory.removeAll();
    };
    return benchTupleSys;
}());
// test (random associations ?) (parallèle association ?) (inverse association ?)
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
    var t = new benchTupleSys(nbComponent);
    var label = nbComponent + " components, 1 system";
    console.time(label);
    t.process();
    console.timeEnd(label);
    t.clear();
}
