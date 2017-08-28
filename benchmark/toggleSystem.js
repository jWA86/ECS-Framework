"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boundingVolume_1 = require("./lib/sampleImplementation/component/boundingVolume");
var culling2DSystem_1 = require("./lib/sampleImplementation/system/culling2DSystem");
var ComponentFactory_1 = require("../src/ComponentFactory");
var GLM = require("gl-matrix");
function createVec2(x, y) {
    var v = GLM.vec2.create();
    return GLM.vec2.set(v, x, y);
}
var ConcreteComponent = (function () {
    function ConcreteComponent(entityId) {
        this.entityId = entityId;
        this.active = true;
    }
    return ConcreteComponent;
}());
var benchToggleSystem = (function () {
    function benchToggleSystem(nbCompInsideFrustrum, nbCompOutsideFrustrum) {
        var cameraPos = createVec2(5.0, 5.0);
        var cameraSize = createVec2(10.0, 10.0);
        this.camera = new boundingVolume_1.Rectangle(cameraPos, cameraSize);
        var circleIn = createVec2(6.0, 6.0);
        var circleOut = createVec2(1.0, 1.0);
        this.circleInside = new boundingVolume_1.BoundingCircleComponent("c1", circleIn, 2.0);
        this.circleOutside = new boundingVolume_1.BoundingCircleComponent("c2", circleOut, 1.0);
        this.system = this.createSystem();
        this.boundingVFactory = this.createFactories();
        this.createComponents(this.circleInside.topLeft, this.circleOutside.topLeft, nbCompInsideFrustrum, nbCompOutsideFrustrum);
    }
    benchToggleSystem.prototype.createSystem = function () {
        return new culling2DSystem_1.Camera2DCullingSystem(this.camera);
    };
    benchToggleSystem.prototype.createFactories = function () {
        return new ComponentFactory_1.ComponentFactory();
    };
    benchToggleSystem.prototype.createComponents = function (vecInFrustrum, vecOutFrustrum, nbInFrustrum, nbOutFrustrum) {
        for (var i_1 = 0; i_1 < nbInFrustrum; ++i_1) {
            this.boundingVFactory.createComponent(boundingVolume_1.BoundingCircleComponent, "c" + i_1, vecInFrustrum, 0);
        }
        var l = nbInFrustrum + nbOutFrustrum;
        for (var i_2 = nbInFrustrum; i_2 < l; ++i_2) {
            this.boundingVFactory.createComponent(boundingVolume_1.BoundingCircleComponent, "c" + i_2, vecOutFrustrum, 0);
        }
    };
    benchToggleSystem.prototype.process = function (siblingsFactories) {
        this.system.process(this.boundingVFactory, siblingsFactories);
    };
    benchToggleSystem.prototype.activateSiblingByBVIteration = function (f, siblingsFactories) {
        this.system.activateByiterationOfBV(f, siblingsFactories);
    };
    benchToggleSystem.prototype.activateSiblingByFactIteration = function (f, siblingsFactories) {
        this.system.activateFactByFact(f, siblingsFactories);
    };
    benchToggleSystem.prototype.clear = function () {
        this.boundingVFactory.removeAll();
    };
    return benchToggleSystem;
}());
function createConcreteFactoryWithComp(nbFactories, nbComp) {
    var factories = [];
    for (var i_3 = 0; i_3 < nbFactories; ++i_3) {
        factories.push(new ComponentFactory_1.TogglableComponentFactory());
    }
    var _loop_1 = function (i_4) {
        factories.forEach(function (f) {
            f.createComponent(ConcreteComponent, "c" + i_4);
        });
    };
    for (var i_4 = 0; i_4 < nbComp; ++i_4) {
        _loop_1(i_4);
    }
    return factories;
}
test(2, 1);
for (var i_5 = 0; i_5 < 100; ++i_5) {
    test(2, 1);
    test(2, 2);
    test(2, 5);
    test(2, 10);
    test(2, 20);
    test(2, 30);
    test(2, 30);
    test(10, 1);
    test(10, 2);
    test(10, 5);
    test(10, 10);
    test(10, 20);
    test(10, 20);
    test(20, 1);
    test(20, 2);
    test(20, 5);
    test(20, 10);
    test(20, 20);
    test(20, 30);
    test(30, 1);
    test(30, 2);
    test(30, 5);
    test(30, 10);
    test(30, 20);
    test(30, 30);
    test(50, 1);
    test(50, 2);
    test(50, 5);
    test(50, 10);
    test(50, 20);
    test(50, 30);
    test(100, 1);
    test(100, 2);
    test(100, 5);
    test(100, 10);
    test(100, 20);
    test(100, 30);
    test(200, 1);
    test(200, 2);
    test(200, 5);
    test(200, 10);
    test(200, 20);
    test(200, 30);
    test(500, 1);
    test(500, 2);
    test(500, 5);
    test(500, 10);
    test(500, 20);
    test(500, 30);
    test(1000, 1);
    test(1000, 2);
    test(1000, 5);
    test(1000, 10);
    test(1000, 20);
    test(1000, 30);
}
// culling
// activate try both strategy
// process sibling system 
//     with prop activate
//     sorted pool
//     2 pools (1 active 1 inactive) / compare iteration with moing small number each iteration vs a pool that don't move
//  compare with a simple system with only active component (same number)
function test(nbComp, nbFactories) {
    var t = new benchToggleSystem(nbComp / 2, nbComp / 2);
    var siblings = createConcreteFactoryWithComp(nbFactories, nbComp);
    var label = nbComp + " components culled + activation of " + nbFactories + " siblings factories ";
    console.time(label);
    t.process(siblings);
    console.timeEnd(label);
    siblings.forEach(function (c) {
        for (var i_6 = 0; i_6 < t.boundingVFactory.size; ++i_6) {
            var currentbV = t.boundingVFactory.values[i_6];
            var r = t.system.execute(currentbV);
            if (c.get(currentbV.entityId).active !== r) {
                console.log("false");
            }
            ;
        }
    });
    var lb2 = nbComp + " components activated per factories " + nbFactories + " BVIteration";
    console.time(lb2);
    t.activateSiblingByBVIteration(t.boundingVFactory, siblings);
    console.timeEnd(lb2);
    var lb3 = nbComp + " components activated per factories " + nbFactories + " BVIteration";
    console.time(lb3);
    t.activateSiblingByFactIteration(t.boundingVFactory, siblings);
    console.timeEnd(lb3);
    t.clear();
    siblings = [];
}
