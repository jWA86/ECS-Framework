"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentFactoryMap = (function () {
    function ComponentFactoryMap() {
        this.pool = new Map();
    }
    ComponentFactoryMap.prototype.createComponent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var id = this.generateUniqueId();
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.insertComponent(t);
        return t;
    };
    ComponentFactoryMap.prototype.createComponentAfter = function (type, cId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var id = this.generateUniqueId();
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.insertComponent(t, cId, true);
        return t;
    };
    ComponentFactoryMap.prototype.createComponentBefore = function (type, cId) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var id = this.generateUniqueId();
        var t = new (type.bind.apply(type, [void 0, id].concat(args)))();
        this.insertComponent(t, cId);
        return t;
    };
    ComponentFactoryMap.prototype.getComponent = function (id) {
        return this.pool.get(id);
    };
    ComponentFactoryMap.prototype.removeComponent = function (id) {
        return this.pool.delete(id);
    };
    ComponentFactoryMap.prototype.removeAll = function () {
        this.pool.clear();
    };
    Object.defineProperty(ComponentFactoryMap.prototype, "size", {
        get: function () {
            return this.pool.size;
        },
        enumerable: true,
        configurable: true
    });
    ComponentFactoryMap.prototype.insertComponent = function (component, idOfPositionToInsert, insertAfter) {
        if (idOfPositionToInsert === void 0) { idOfPositionToInsert = "-1"; }
        if (insertAfter === void 0) { insertAfter = false; }
        if (idOfPositionToInsert === "-1") {
            //if no id of the component to insert at position is provided, insert at the end
            this.pool.set(component.id, component);
        }
        else {
            if (this.pool.has(idOfPositionToInsert)) {
                //create a new map
                //slow
                var nMap_1 = new Map();
                this.pool.forEach(function (v, k) {
                    //if key == id of the ref component for position insertion 
                    if (k === idOfPositionToInsert) {
                        if (insertAfter) {
                            nMap_1.set(k, v);
                            nMap_1.set(component.id, component);
                        }
                        else {
                            nMap_1.set(component.id, component);
                            nMap_1.set(k, v);
                        }
                    }
                    else {
                        nMap_1.set(k, v);
                    }
                });
                this.pool.removeAll;
                this.pool = nMap_1;
            }
        }
    };
    /*!
        Math.uuid.js (v1.4)
        http://www.broofa.com
        mailto:robert@broofa.com
        Copyright (c) 2010 Robert Kieffer
        Dual licensed under the MIT and GPL licenses.
    */
    ComponentFactoryMap.prototype.generateUniqueId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return ComponentFactoryMap;
}());
exports.ComponentFactoryMap = ComponentFactoryMap;
