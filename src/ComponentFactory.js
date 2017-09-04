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
    function ComponentFactory(_size, componentType) {
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
    ComponentFactory.prototype.activate = function (entityId, value) {
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
    ComponentFactory.prototype.activateAll = function (value) {
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
    ComponentFactory.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._nbActive = 0;
        this._nbInactive = 0;
        this._nbCreated = 0;
        this._iterationLength = 0;
    };
    ComponentFactory.prototype.create = function (componentType, entityId, active) {
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
                throw new Error("no free slot available, please resize the pool");
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
    ComponentFactory.prototype.getIndexOfFirstAvailableSpot = function () {
        var l = this._values.length;
        for (var i_3 = 0; i_3 < l; ++i_3) {
            if (this._values[i_3].entityId === '0') {
                return i_3;
            }
        }
        return -1;
    };
    ComponentFactory.prototype.mapObject = function (oldC, newC) {
        for (var i_4 in newC) {
            if (oldC.hasOwnProperty(i_4)) {
                oldC[i_4] = newC[i_4];
            }
        }
    };
    ComponentFactory.prototype.incrementCreatedLength = function (inputIndex) {
        if (inputIndex >= this._iterationLength) {
            this._iterationLength += 1;
        }
    };
    ComponentFactory.prototype.decrementCreatedLength = function (inputIndex) {
        if (inputIndex >= this._iterationLength - 1) {
            this._iterationLength -= 1;
        }
    };
    ComponentFactory.prototype.delete = function (entityId) {
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
    ComponentFactory.prototype.resize = function (size) {
        var _this = this;
        var dif = size - this._size;
        if (dif > 0) {
            var _loop_1 = function (i_5) {
                // parsing Date ?
                var prop = JSON.parse(JSON.stringify(this_1._zeroedRef));
                this_1._values.push(Object.create(this_1._zeroedRef));
                Object.keys(this_1._zeroedRef).forEach(function (p) {
                    _this._values[_this.size - 1][p] = prop[p];
                });
                this_1._values[this_1.size - 1].entityId = '0';
            };
            var this_1 = this;
            for (var i_5 = 0; i_5 < dif; ++i_5) {
                _loop_1(i_5);
            }
        }
        else if (dif < 0) {
            dif = Math.abs(dif);
            for (var i_6 = 0; i_6 < dif; ++i_6) {
                var toDelete = this._values[this.size - 1];
                this._keys.delete(toDelete.entityId);
                this._values.pop();
            }
        }
    };
    Object.defineProperty(ComponentFactory.prototype, "iterationLength", {
        get: function () {
            return this._iterationLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory.prototype, "nbActive", {
        get: function () {
            return this._nbActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory.prototype, "nbInactive", {
        get: function () {
            return this._nbInactive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory.prototype, "nbCreated", {
        get: function () {
            return this._nbCreated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory.prototype, "nbFreeSlot", {
        get: function () {
            return this._size - this._nbActive - this._nbInactive;
        },
        enumerable: true,
        configurable: true
    });
    // overwrite fastIterationMap method we don't want to use
    ComponentFactory.prototype.insertAfter = function (key, value, keyRef) {
        return false;
    };
    ComponentFactory.prototype.insertBefore = function (key, value, keyRef) {
        return false;
    };
    return ComponentFactory;
}(FastIterationMap_1.FastIterationMap));
exports.ComponentFactory = ComponentFactory;
