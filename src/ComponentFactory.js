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
    function TogglableComponentFactory(_size, componentType) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this._size = _size;
        _this._iterationLength = 0; // use by the system for iteration, avoid iterate over zeroed components
        _this._nbActive = 0;
        _this._nbInactive = 0;
        _this._nbCreated = 0;
        for (var i_1 = 0; i_1 < _size; ++i_1) {
            _this._values.push(new (componentType.bind.apply(componentType, [void 0, '0', false].concat(args)))());
        }
        _this._zeroedRef = new (componentType.bind.apply(componentType, [void 0, "zeroedCompRef", false].concat(args)))();
        return _this;
    }
    TogglableComponentFactory.prototype.activateComponent = function (entityId, value) {
        var c = this.get(entityId);
        if (c.active !== value) {
            c.active = value;
            if (value) {
                this._nbActive += 1;
                this._nbInactive -= 1;
            }
            else {
                this._nbActive -= 1;
                this._nbInactive += 1;
            }
        }
    };
    TogglableComponentFactory.prototype.activateAll = function (value) {
        for (var i_2 = 0; i_2 < this.size; ++i_2) {
            this.values[i_2].active = value;
        }
        if (value) {
            this._nbActive = this._nbCreated;
            this._nbInactive = 0;
        }
        else {
            this._nbActive = 0;
            this._nbInactive = this._nbCreated;
        }
    };
    TogglableComponentFactory.prototype.createComponent = function (componentType, entityId, active) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var index;
        var toReplaceComp;
        // if the key doesn't exist yet 
        if (!this.has(entityId)) {
            // get the key and index of the first zeroed component in the values array
            index = this.getIndexOfFirstAvailableSpot();
            if (index === -1) {
                throw new Error("no more space left in the pool");
            }
            else {
                // add the key of our newly created component and 
                this._keys.set(entityId, index);
                this._nbCreated += 1;
                if (active) {
                    this._nbActive += 1;
                }
                else {
                    this._nbInactive += 1;
                }
                // replace all propreties value from the zeroed component
                toReplaceComp = this.values[index];
            }
        }
        else {
            index = this._keys.get(entityId);
            // replace all propreties value from the component to update
            toReplaceComp = this.values[index];
            if (toReplaceComp.active !== active) {
                if (active) {
                    this._nbActive += 1;
                    this._nbInactive -= 1;
                }
                else {
                    this._nbActive -= 1;
                    this._nbInactive += 1;
                }
            }
        }
        // create the new component
        var t = new (componentType.bind.apply(componentType, [void 0, entityId, active].concat(args)))();
        this.mapObject(toReplaceComp, t);
        // lastly increment the lastActiveIndex
        this.incrementCreatedLength(index);
        return this.values[index];
    };
    TogglableComponentFactory.prototype.getIndexOfFirstAvailableSpot = function () {
        var l = this._values.length;
        for (var i_3 = 0; i_3 < l; ++i_3) {
            if (this._values[i_3].entityId === '0') {
                return i_3;
            }
        }
        return -1;
    };
    TogglableComponentFactory.prototype.mapObject = function (oldC, newC) {
        for (var i_4 in newC) {
            if (oldC.hasOwnProperty(i_4)) {
                oldC[i_4] = newC[i_4];
            }
        }
    };
    TogglableComponentFactory.prototype.incrementCreatedLength = function (inputIndex) {
        if (inputIndex >= this._iterationLength) {
            this._iterationLength += 1;
        }
    };
    TogglableComponentFactory.prototype.decrementCreatedLength = function (inputIndex) {
        if (inputIndex >= this._iterationLength - 1) {
            this._iterationLength -= 1;
        }
    };
    TogglableComponentFactory.prototype.removeComponent = function (entityId) {
        var index = this._keys.get(entityId);
        if (index === undefined) {
            return false;
        }
        // update nbActive/Inactive counter
        if (this._values[index].active) {
            this._nbActive -= 1;
        }
        else {
            this._nbInactive -= 1;
        }
        // zeroed the component
        this.mapObject(this._values[index], this._zeroedRef);
        this._values[index].entityId = '0';
        this._keys.delete(entityId);
        this.decrementCreatedLength(index);
        this._nbCreated -= 1;
        return true;
    };
    Object.defineProperty(TogglableComponentFactory.prototype, "iterationLength", {
        get: function () {
            return this._iterationLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TogglableComponentFactory.prototype, "nbActive", {
        get: function () {
            return this._nbActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TogglableComponentFactory.prototype, "nbInactive", {
        get: function () {
            return this._nbInactive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TogglableComponentFactory.prototype, "nbCreated", {
        get: function () {
            return this._nbCreated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TogglableComponentFactory.prototype, "nbFreeSlot", {
        get: function () {
            return this._size - this._nbActive - this._nbInactive;
        },
        enumerable: true,
        configurable: true
    });
    return TogglableComponentFactory;
}(ComponentFactory));
exports.TogglableComponentFactory = TogglableComponentFactory;
