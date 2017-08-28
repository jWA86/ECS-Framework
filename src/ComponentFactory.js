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
var ComponentFactory = (function (_super) {
    __extends(ComponentFactory, _super);
    function ComponentFactory() {
        return _super.call(this) || this;
    }
    ComponentFactory.prototype.createComponent = function (componentType, entityId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var t = new (componentType.bind.apply(componentType, [void 0, entityId].concat(args)))();
        this.set(t.entityId, t);
        return t;
    };
    ComponentFactory.prototype.createComponentAfter = function (componentType, entityId, afterEId) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var t = new (componentType.bind.apply(componentType, [void 0, entityId].concat(args)))();
        this.insertAfter(t.entityId, t, afterEId);
        return t;
    };
    ComponentFactory.prototype.createComponentBefore = function (componentType, entityId, beforeEId) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var t = new (componentType.bind.apply(componentType, [void 0, entityId].concat(args)))();
        this.insertBefore(t.entityId, t, beforeEId);
        return t;
    };
    ComponentFactory.prototype.getComponent = function (entityId) {
        return this.get(entityId);
    };
    ComponentFactory.prototype.removeComponent = function (entityId) {
        return this.delete(entityId);
    };
    ComponentFactory.prototype.removeAll = function () {
        this.clear();
    };
    return ComponentFactory;
}(FastIterationMap_1.FastIterationMap));
exports.ComponentFactory = ComponentFactory;
var TogglableComponentFactory = (function (_super) {
    __extends(TogglableComponentFactory, _super);
    function TogglableComponentFactory() {
        return _super.call(this) || this;
    }
    TogglableComponentFactory.prototype.activate = function (entityId, value) {
        this.get(entityId).active = value;
    };
    return TogglableComponentFactory;
}(ComponentFactory));
exports.TogglableComponentFactory = TogglableComponentFactory;
