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
var FastIterationMap_1 = require("../lib/fastIterationMap/src/FastIterationMap");
var ComponentFactory = (function () {
    function ComponentFactory() {
        this.pool = new FastIterationMap_1.FastIterationMap();
    }
    ComponentFactory.prototype.createComponent = function (componentType, entityId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var t = new (componentType.bind.apply(componentType, [void 0, entityId].concat(args)))();
        this.pool.set(t.entityId, t);
        return t;
    };
    ComponentFactory.prototype.getComponent = function (entityId) {
        return this.pool.get(entityId);
    };
    ComponentFactory.prototype.removeComponent = function (entityId) {
        return this.pool.delete(entityId);
    };
    ComponentFactory.prototype.removeAll = function () {
        this.pool.clear();
    };
    Object.defineProperty(ComponentFactory.prototype, "size", {
        get: function () {
            return this.pool.length;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentFactory;
}());
exports.ComponentFactory = ComponentFactory;
var TogglableComponentFactory = (function (_super) {
    __extends(TogglableComponentFactory, _super);
    function TogglableComponentFactory() {
        return _super.call(this) || this;
    }
    TogglableComponentFactory.prototype.activate = function (entityId, value) {
        this.pool.get(entityId).active = value;
    };
    return TogglableComponentFactory;
}(ComponentFactory));
exports.TogglableComponentFactory = TogglableComponentFactory;
