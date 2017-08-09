"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastIteMap_1 = require("../../lib/fastIterationMap/src/fastIteMap");
var ComponentFactoryFastMap = (function () {
    function ComponentFactoryFastMap() {
        this.pool = new fastIteMap_1.FastIteMap();
    }
    ComponentFactoryFastMap.prototype.createComponent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var id = this.generateUniqueId();
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.pool.set(t.id, t);
        return t;
    };
    ComponentFactoryFastMap.prototype.createComponentAfter = function (type, cId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var id = this.generateUniqueId();
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.pool.insertAfter(t.id, t, cId);
        return t;
    };
    ComponentFactoryFastMap.prototype.createComponentBefore = function (type, cId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var id = this.generateUniqueId();
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.pool.insertBefore(t.id, t, cId);
        return t;
    };
    ComponentFactoryFastMap.prototype.getComponent = function (id) {
        return this.pool.get(id);
    };
    ComponentFactoryFastMap.prototype.removeComponent = function (id) {
        return this.pool.delete(id);
    };
    ComponentFactoryFastMap.prototype.removeAll = function () {
        this.pool.clear();
    };
    Object.defineProperty(ComponentFactoryFastMap.prototype, "size", {
        get: function () {
            return this.pool.length;
        },
        enumerable: true,
        configurable: true
    });
    /*!
        Math.uuid.js (v1.4)
        http://www.broofa.com
        mailto:robert@broofa.com
        Copyright (c) 2010 Robert Kieffer
        Dual licensed under the MIT and GPL licenses.
    */
    ComponentFactoryFastMap.prototype.generateUniqueId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return ComponentFactoryFastMap;
}());
exports.ComponentFactoryFastMap = ComponentFactoryFastMap;
