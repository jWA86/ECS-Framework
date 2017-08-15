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
    ComponentFactory.prototype.createComponentAfter = function (componentType, entityId, afterEId) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var t = new (componentType.bind.apply(componentType, [void 0, entityId].concat(args)))();
        this.pool.insertAfter(t.entityId, t, afterEId);
        return t;
    };
    ComponentFactory.prototype.createComponentBefore = function (componentType, entityId, beforeEId) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var t = new (componentType.bind.apply(componentType, [void 0, entityId].concat(args)))();
        this.pool.insertBefore(t.entityId, t, beforeEId);
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
var paralleleComponentFactory = (function (_super) {
    __extends(paralleleComponentFactory, _super);
    function paralleleComponentFactory(factories) {
        var _this = _super.call(this) || this;
        _this.factories = factories;
        return _this;
    }
    // overwrite all methode so it make change to all children factories
    // sort pool ?
    // set active in one pool and move other in another pool
    // inactivePool: FastIteMap<string, T> = new FastIteMap<string, T>();
    // is it faster to iterate a pool and computer only when active comp are encounter (if(activate)then computer)
    // or computer only active component in a sorted array (active first, the stop when inactive are encounter)
    // or computer a array with only active component (inactive are moved in an other array) 
    paralleleComponentFactory.prototype.activate = function () {
    };
    return paralleleComponentFactory;
}(ComponentFactory));
