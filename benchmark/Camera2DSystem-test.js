"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var boundingVolume_1 = require("./lib/sampleImplementation/component/boundingVolume");
var ComponentFactory_1 = require("./../src/ComponentFactory");
var culling2DSystem_1 = require("./lib/sampleImplementation/system/culling2DSystem");
var GLM = require("gl-matrix");
describe("Camera2DCulling Sytem", function () {
    var ConcreteComponent = (function () {
        function ConcreteComponent(entityId) {
            this.entityId = entityId;
            this.active = true;
        }
        return ConcreteComponent;
    }());
    function createVec2(x, y) {
        var v = GLM.vec2.create();
        return GLM.vec2.set(v, x, y);
    }
    var circleInside;
    var circleOutside;
    var camera;
    //create x factories with y concreteComponent with same entityId in each factory
    function createConcreteFactoryWithComp(nbFactories, nbComp) {
        var factories = [];
        for (var i_1 = 0; i_1 < nbFactories; ++i_1) {
            factories.push(new ComponentFactory_1.TogglableComponentFactory());
        }
        var _loop_1 = function (i_2) {
            factories.forEach(function (f) {
                f.createComponent(ConcreteComponent, "c" + i_2);
            });
        };
        for (var i_2 = 0; i_2 < nbComp; ++i_2) {
            _loop_1(i_2);
        }
        return factories;
    }
    beforeEach(function () {
        // position is top left of the element
        var circleIn = createVec2(6.0, 6.0);
        var circleOut = createVec2(1.0, 1.0);
        var cameraPos = createVec2(5.0, 5.0);
        var cameraSize = createVec2(10.0, 10.0);
        circleInside = new boundingVolume_1.BoundingCircleComponent("c1", circleIn, 2.0);
        circleOutside = new boundingVolume_1.BoundingCircleComponent("c2", circleOut, 1.0);
        camera = new boundingVolume_1.Rectangle(cameraPos, cameraSize);
    });
    describe("collision detection", function () {
        it("collide should return true if the boundingVolume intersect with the Camera2D ", function () {
            var sys = new culling2DSystem_1.Camera2DCullingSystem(camera);
            chai_1.expect(sys.execute(circleInside)).to.equal(true);
        });
        it("collide should return false if the boundingVolume doesn't intersect with the Camera2D", function () {
            var sys = new culling2DSystem_1.Camera2DCullingSystem(camera);
            chai_1.expect(sys.execute(circleOutside)).to.equal(false);
        });
    });
    describe("process", function () {
        //in frustrum first, out after
        function createFactoryWithCircleComp(vecInFrustrum, vecOutFrustrum, nbInFrustrum, nbOutFrustrum) {
            var f = new ComponentFactory_1.ComponentFactory();
            for (var i_3 = 0; i_3 < nbInFrustrum; ++i_3) {
                f.createComponent(boundingVolume_1.BoundingCircleComponent, "c" + i_3, vecInFrustrum, 0);
            }
            var l = nbInFrustrum + nbOutFrustrum;
            for (var i_4 = nbInFrustrum; i_4 < l; ++i_4) {
                f.createComponent(boundingVolume_1.BoundingCircleComponent, "c" + i_4, vecOutFrustrum, 0);
            }
            return f;
        }
        beforeEach(function () {
        });
        it("should change 'active' proprierty of concreteComp with same entityID as the boundingVolume processed", function () {
            var cc = createConcreteFactoryWithComp(2, 4);
            var bV = createFactoryWithCircleComp(circleInside.topLeft, circleOutside.topLeft, 2, 2);
            // checking that the boundingVolume factory hold components with the same entityId as in the concreteFactories.
            cc.forEach(function (c) {
                for (var i_5 = 0; i_5 < bV.size; ++i_5) {
                    chai_1.expect(bV.has(c.values[i_5].entityId));
                    //checking that concreteComponents are actived
                    chai_1.expect(c.values[i_5].active).to.equal(true);
                }
            });
            var sys = new culling2DSystem_1.Camera2DCullingSystem(camera);
            sys.process(bV, cc);
            cc.forEach(function (c) {
                for (var i_6 = 0; i_6 < bV.size; ++i_6) {
                    var currentbV = bV.values[i_6];
                    var r = sys.execute(currentbV);
                    chai_1.expect(c.get(currentbV.entityId).active).to.equal(r);
                }
            });
        });
        it("if entity id not found in a factory", function () {
        });
    });
});
