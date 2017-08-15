"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec2Component = (function () {
    function Vec2Component(entityId, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.entityId = entityId;
        this.x = x;
        this.y = y;
        this.active = true;
    }
    return Vec2Component;
}());
exports.Vec2Component = Vec2Component;
