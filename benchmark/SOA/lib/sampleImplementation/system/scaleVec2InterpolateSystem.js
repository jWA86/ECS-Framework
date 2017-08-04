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
var MultiComponentSystem_1 = require("../../../../src/SOA/MultiComponentSystem");
var vec2_1 = require("../../lib/component/vec2");
exports.Vec2Component = vec2_1.Vec2Component;
exports.IVec2Component = vec2_1.IVec2Component;
//system which combine currentValue of an easingComponent and a 2D size component
// //>> system that scale based on an easing function
var ScaleSystem = (function (_super) {
    __extends(ScaleSystem, _super);
    function ScaleSystem(vec2Factory, easingFactory) {
        return _super.call(this, vec2Factory, easingFactory) || this;
    }
    ScaleSystem.prototype.process = function (idsTuples) {
        _super.prototype.process.call(this, idsTuples);
    };
    ScaleSystem.prototype.execute = function (components) {
        components[0].x *= components[1].currentValue;
        components[0].y *= components[1].currentValue;
    };
    return ScaleSystem;
}(MultiComponentSystem_1.TupleComponentSystem));
exports.ScaleSystem = ScaleSystem;
