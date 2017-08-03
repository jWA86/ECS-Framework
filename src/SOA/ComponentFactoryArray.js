"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentFactoryArray = (function () {
    function ComponentFactoryArray() {
        this.pool = [];
    }
    ComponentFactoryArray.prototype.createComponent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var id = this.generateUniqueId();
        var t = new type(id, args);
        this.insertComponent(t);
        return t;
    };
    ComponentFactoryArray.prototype.createComponentAfter = function (type, cId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var index = this.getComponentIndex(cId);
        var id = this.generateUniqueId();
        var t = new type(id, args);
        this.insertComponent(t, index + 1);
        return t;
    };
    ComponentFactoryArray.prototype.createComponentBefore = function (type, cId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var index = this.getComponentIndex(cId);
        var id = this.generateUniqueId();
        var t = new type(id, args);
        this.insertComponent(t, index);
        return t;
    };
    ComponentFactoryArray.prototype.getComponentIndex = function (id) {
        return this.pool.findIndex(function (c) {
            return c.id === id;
        });
    };
    ComponentFactoryArray.prototype.getComponent = function (id) {
        return this.pool.find(function (c) {
            return c.id === id;
        });
    };
    ComponentFactoryArray.prototype.removeComponent = function (id) {
        var index = this.getComponentIndex(id);
        if (index > -1) {
            this.pool.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    ComponentFactoryArray.prototype.removeAll = function () {
        this.pool = [];
    };
    Object.defineProperty(ComponentFactoryArray.prototype, "size", {
        get: function () {
            return this.pool.length;
        },
        enumerable: true,
        configurable: true
    });
    ComponentFactoryArray.prototype.insertComponent = function (component, index) {
        if (index === void 0) { index = -1; }
        if (index < 0 || index >= this.pool.length) {
            this.pool.push(component);
            return this.pool.length;
        }
        else {
            this.pool.splice(index, 0, component);
            return index;
        }
    };
    ;
    /*!
        Math.uuid.js (v1.4)
        http://www.broofa.com
        mailto:robert@broofa.com
        Copyright (c) 2010 Robert Kieffer
        Dual licensed under the MIT and GPL licenses.
    */
    ComponentFactoryArray.prototype.generateUniqueId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return ComponentFactoryArray;
}());
exports.ComponentFactoryArray = ComponentFactoryArray;
