"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// System that take a view frustrum in entry and a collection of boundingVolume + a collection of factory
// test collision between the view frustrum and the bounding volumes.
// after collision checking :
// call every factory with the entityID and the flag for activation of the comp. 
// simple system without any scene graph or any world partitionning  
// process ICullingShape factory, test if intersect with the reference IShape passed in the constructor
// set the ICUllingShape toActive proprety according to the result of the intersection test
// then use the result to activate or desactivate siblnigs components in the factories liste passed in the system constructor
var CullingSystem = (function () {
    function CullingSystem(refShape) {
        this.refShape = refShape;
    }
    CullingSystem.prototype.process = function (factory, siblingsFactories) {
        var l = factory.size;
        var v = factory.values;
        for (var i_1 = 0; i_1 < l; ++i_1) {
            v[i_1].toActive = this.execute(v[i_1]);
        }
        this.activateSiblings(factory, siblingsFactories);
    };
    // process(factory: IComponentFactory<T>, siblingsFactories: ITogglableComponentFactory<ITogglableComponent>[]): any {
    //     let l = factory.size;
    //     for (let i = 0; i < l; ++i) {
    //         factory.values[i].toActive = this.collide(factory.values[i]);
    //         for(let j = 0; j <siblingsFactories.length; ++j){
    //             siblingsFactories[j].activate(factory.values[i].entityId, factory.pool.values[i].toActive);
    //         }
    //     }
    //     // this.activateSiblings(factory, siblingsFactories);
    // }
    CullingSystem.prototype.activateSiblings = function (factory, siblingsFactories) {
        // how to change siblings ?
        // at every collision detection activate siblings ?
        // process all collision detection, save result in boundingVolume (btw it should be renamed )
        // then iterate again the boundingVolumes with factories one by one to activate siblings
        this.activateFactByFact(factory, siblingsFactories);
    };
    // boundVolumes.forEach -> factories.forEach -> f.activate(bv.Id, value) 
    CullingSystem.prototype.activateByiterationOfBV = function (f, siblingsFactories) {
        var l = f.size;
        var nbF = siblingsFactories.length;
        for (var i_2 = 0; i_2 < l; ++i_2) {
            var eId = f.values[i_2].entityId;
            var val = f.values[i_2].toActive;
            for (var j = 0; j < nbF; ++j) {
                siblingsFactories[j].activate(eId, val);
            }
        }
    };
    // factories.forEach -> boundingVolume.forEach -> f.activate(bv.Id, value)
    CullingSystem.prototype.activateFactByFact = function (f, siblingsFactories) {
        var l = siblingsFactories.length;
        var bvL = f.size;
        for (var i_3 = 0; i_3 < l; ++i_3) {
            for (var j = 0; j < bvL; ++j) {
                var val = f.values[j].toActive;
                var eId = f.values[j].entityId;
                siblingsFactories[i_3].activate(eId, val);
            }
        }
    };
    return CullingSystem;
}());
exports.CullingSystem = CullingSystem;
var Camera2DCullingSystem = (function (_super) {
    __extends(Camera2DCullingSystem, _super);
    function Camera2DCullingSystem(camera) {
        var _this = _super.call(this, camera) || this;
        _this.camera = camera;
        return _this;
    }
    Camera2DCullingSystem.prototype.execute = function (shape) {
        var cXLeft = shape.topLeft[0];
        var cYTop = shape.topLeft[1];
        var cXRight = shape.topLeft[0] + shape.radius * 2;
        var cYBottom = shape.topLeft[1] + shape.radius * 2;
        if (cXLeft < this.camera.bottomRight[0]
            && cYTop < this.camera.bottomRight[1]
            && cXRight > this.camera.topLeft[0]
            && cYBottom > this.camera.topLeft[1]) {
            return true;
        }
        else {
            return false;
        }
    };
    return Camera2DCullingSystem;
}(CullingSystem));
exports.Camera2DCullingSystem = Camera2DCullingSystem;
