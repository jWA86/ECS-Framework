"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastIteMap_1 = require("../../../lib/fastIterationMap/src/fastIteMap");
var ComponentFactory = (function () {
    function ComponentFactory() {
        this.pool = new fastIteMap_1.FastIteMap();
    }
    ComponentFactory.prototype.createComponent = function (type, id) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.pool.set(t.id, t);
        return t;
    };
    ComponentFactory.prototype.createComponentAfter = function (type, id, afterEId) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.pool.insertAfter(t.id, t, afterEId);
        return t;
    };
    ComponentFactory.prototype.createComponentBefore = function (type, id, beforeEId) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.pool.insertBefore(t.id, t, beforeEId);
        return t;
    };
    ComponentFactory.prototype.getComponent = function (id) {
        return this.pool.get(id);
    };
    ComponentFactory.prototype.removeComponent = function (id) {
        return this.pool.delete(id);
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
