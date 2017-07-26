"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentFactory = (function () {
    function ComponentFactory() {
        this.pool = [];
    }
    ComponentFactory.prototype.createComponent = function (type) {
        var id = this.generateUniqueId();
        var t = new type(id);
        this.insertComponent(t);
        return t;
    };
    ComponentFactory.prototype.createComponentAfter = function (type, cId) {
        var index = this.getComponentIndex(cId);
        var id = this.generateUniqueId();
        var t = new type(id);
        this.insertComponent(t, index + 1);
        return t;
    };
    ComponentFactory.prototype.createComponentAt = function (type, cId) {
        var index = this.getComponentIndex(cId);
        var id = this.generateUniqueId();
        var t = new type(id);
        this.insertComponent(t, index);
        return t;
    };
    ComponentFactory.prototype.getComponentIndex = function (id) {
        return this.pool.findIndex(function (c) {
            return c.id === id;
        });
    };
    ComponentFactory.prototype.getComponent = function (id) {
        return this.pool.find(function (c) {
            return c.id === id;
        });
    };
    ComponentFactory.prototype.removeComponent = function (id) {
        var index = this.getComponentIndex(id);
        if (index > -1) {
            this.pool.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    ComponentFactory.prototype.insertComponent = function (component, index) {
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
    ComponentFactory.prototype.generateUniqueId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return ComponentFactory;
}());
exports.ComponentFactory = ComponentFactory;
