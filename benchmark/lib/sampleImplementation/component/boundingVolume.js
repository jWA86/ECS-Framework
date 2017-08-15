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
var GLM = require("gl-matrix");
// interface ICullingShape extends IShape2DComponent, IActivatorComponent{}
var CircleComponent = (function () {
    function CircleComponent(entityId, topLeft, radius) {
        this.entityId = entityId;
        this.topLeft = topLeft;
        this.radius = radius;
    }
    return CircleComponent;
}());
exports.CircleComponent = CircleComponent;
var BoundingCircleComponent = (function (_super) {
    __extends(BoundingCircleComponent, _super);
    function BoundingCircleComponent(entityId, topLeft, radius, toActive) {
        if (toActive === void 0) { toActive = false; }
        var _this = _super.call(this, entityId, topLeft, radius) || this;
        _this.entityId = entityId;
        _this.topLeft = topLeft;
        _this.radius = radius;
        _this.toActive = toActive;
        return _this;
    }
    return BoundingCircleComponent;
}(CircleComponent));
exports.BoundingCircleComponent = BoundingCircleComponent;
var Rectangle = (function () {
    function Rectangle(topLeft, size) {
        this.topLeft = topLeft;
        this.bottomRight = GLM.vec2.create();
        GLM.vec2.add(this.bottomRight, this.topLeft, size);
    }
    return Rectangle;
}());
exports.Rectangle = Rectangle;
