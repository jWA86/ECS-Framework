"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec2Component = (function () {
    function Vec2Component(id, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.id = id;
        this.x = x;
        this.y = y;
    }
    return Vec2Component;
}());
exports.Vec2Component = Vec2Component;
