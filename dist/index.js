(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ecs"] = factory();
	else
		root["ecs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TIMESTAMP = window.performance && window.performance.now ? window.performance : Date;
exports.TIMESTAMP = TIMESTAMP;
var RANDOM = {
    decimal: function (max) { return Math.random() * max; },
    integer: function (max) { return Math.floor(Math.random() * max); },
};
exports.RANDOM = RANDOM;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FastIterationMap = /** @class */ (function () {
    function FastIterationMap() {
        this._keys = new Map();
        this._values = [];
    }
    FastIterationMap.prototype.clear = function () {
        this._keys.clear();
        this._values = [];
    };
    FastIterationMap.prototype.delete = function (key) {
        var i = this._keys.get(key);
        var r = this._keys.delete(key);
        this.offsetIndexInKeys(i, -1);
        var r2 = this._values.splice(i, 1);
        if (r2.length > 0 && r) {
            return true;
        }
        else {
            return false;
        }
    };
    FastIterationMap.prototype.get = function (key) {
        return this._values[this._keys.get(key)];
    };
    /**
     * Return the index of an element in the value array
     * @param key
     */
    FastIterationMap.prototype.getIndex = function (key) {
        return this._keys.get(key);
    };
    FastIterationMap.prototype.has = function (key) {
        return this._keys.has(key);
    };
    /**
     * Insert an item after another item
     * @param key the key of the item to insert
     * @param value the value of the item
     * @param keyRef the key of the item to insert after
     */
    FastIterationMap.prototype.insertAfter = function (key, value, keyRef) {
        if (this._keys.get(key) !== undefined) {
            return false;
        }
        var i = this._keys.get(keyRef);
        if (i === undefined) {
            return false;
        }
        this.insertValue(i + 1, value);
        this.offsetIndexInKeys(i, 1);
        this._keys.set(key, i + 1);
        return true;
    };
    /**
     * Insert 2 items around the another item
     * @param keyRef the key of the item insert around
     * @param firstK the key of the item to insert before
     * @param firstV the value of the item to insert before
     * @param secondK the key of the item to insert after
     * @param secondV the value of the item to insert after
     */
    FastIterationMap.prototype.insertAround = function (keyRef, firstK, firstV, secondK, secondV) {
        if (this._keys.get(firstK) !== undefined || this._keys.get(secondK) !== undefined) {
            return false;
        }
        var index = this._keys.get(keyRef);
        if (index === undefined) {
            return false;
        }
        // insert the 2 items after the item of reference
        // offset index by 2 in the keys map of all element after the index of reference
        // in the keys map set index of the 2 new items
        // finally swap the item of reference with the first of the 2 items inserted
        this.insertValue(index + 1, firstV, secondV);
        this.offsetIndexInKeys(index, 2);
        this._keys.set(firstK, index + 1);
        this._keys.set(secondK, index + 2);
        return this.swap(keyRef, firstK);
    };
    /**
     * Insert an item before another item
     * @param key the key of the item to insert
     * @param value the value of the item
     * @param keyRef the key of the item to insert before
     */
    FastIterationMap.prototype.insertBefore = function (key, value, keyRef) {
        if (this._keys.get(key) !== undefined) {
            return false;
        }
        var i = this._keys.get(keyRef);
        if (i === undefined) {
            return false;
        }
        this.insertValue(i, value);
        this.offsetIndexInKeys(i - 1, 1);
        this._keys.set(key, i);
        return true;
    };
    Object.defineProperty(FastIterationMap.prototype, "keys", {
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FastIterationMap.prototype, "length", {
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FastIterationMap.prototype, "size", {
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FastIterationMap.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    FastIterationMap.prototype.push = function (key, value) {
        var e = this._keys.get(key);
        // if the key doesn't exist add the element
        if (e === undefined) {
            var l = this._values.push(value);
            this._keys.set(key, l - 1);
        }
        else {
            // if the key is already there, update the value
            this._values[e] = value;
        }
        return this._values.length;
    };
    FastIterationMap.prototype.set = function (key, value) {
        return this.push(key, value);
    };
    /**
     * Swap position of 2 items in the values array and set the correct index in the keys Map
     * @param key1
     * @param key2
     */
    FastIterationMap.prototype.swap = function (key1, key2) {
        var index1 = this._keys.get(key1);
        var index2 = this._keys.get(key2);
        if (index1 === undefined || index2 === undefined) {
            return false;
        }
        var tmp = this._values[index1];
        this._values[index1] = this._values[index2];
        this._values[index2] = tmp;
        this._keys.set(key1, index2);
        this._keys.set(key2, index1);
        return true;
    };
    FastIterationMap.prototype.insertValue = function (index) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return (_a = this._values).splice.apply(_a, [index, 0].concat(values));
        var _a;
    };
    /**
     * Offset indices in the keys Map from a position ([from] and [to] not included)
     * @param from offset after this key
     * @param offsetVal the amount to offset indices
     * @param to if specidied offset until this key, otherwise offset to end of the collection
     */
    FastIterationMap.prototype.offsetIndexInKeys = function (from, offsetVal, to) {
        var mapIter = this._keys.entries();
        var l = this._keys.size;
        to = to || Number.MAX_VALUE;
        for (var i = 0; i < l; ++i) {
            var e = mapIter.next().value;
            if (e[1] > from && e[1] < to) {
                this._keys.set(e[0], e[1] += offsetVal);
            }
        }
    };
    return FastIterationMap;
}());
exports.FastIterationMap = FastIterationMap;


/***/ })
/******/ ]);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
var FastIterationMap_1 = __webpack_require__(1);
var ComponentFactory = /** @class */ (function (_super) {
    __extends(ComponentFactory, _super);
    function ComponentFactory(_size, componentWithDefaultValue) {
        var _this = _super.call(this) || this;
        _this._size = _size;
        /** Use by the system for iteration, avoid iterate over zeroed components */
        _this._activeLength = 0;
        _this._nbActive = 0;
        _this._nbInactive = 0;
        _this._nbCreated = 0;
        _this._zeroedRef = Object.assign({}, componentWithDefaultValue);
        _this._zeroedRef.entityId = 0;
        _this._zeroedRef.active = false;
        _this._values.length = _this._size;
        for (var i = 0; i < _size; ++i) {
            _this.createZeroedComponentAt(i);
        }
        _this._type = componentWithDefaultValue.constructor["name"];
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
    /* Set the active proprety of all component in the pool */
    ComponentFactory.prototype.activateAll = function (value) {
        for (var i = 0; i < this.size; ++i) {
            this._values[i].active = value;
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
        this._activeLength = 0;
    };
    ComponentFactory.prototype.create = function (entityId, active, insertFirstAvailableSpot) {
        if (insertFirstAvailableSpot === void 0) { insertFirstAvailableSpot = false; }
        var index;
        if (entityId === 0) {
            throw Error("0 is a reserved id");
        }
        if (this.has(entityId)) {
            throw Error("a component with this entityId already exists");
        }
        if (insertFirstAvailableSpot) {
            // get the key and index of the first zeroed component in the values array
            index = this.getIndexOfFirstAvailableSpot();
        }
        else {
            index = this._activeLength;
        }
        if (index >= this._size) {
            throw Error("no free slot available, please resize the pool");
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
            this._values[index].entityId = entityId;
            this._values[index].active = active;
        }
        this.updateActiveLength(index, true);
        return this._values[index];
    };
    /* Set entityId back to 0 and desactivate the component
    * note : when the component is reuse it still has the old values
    */
    ComponentFactory.prototype.free = function (entityId) {
        var index = this.getIndex(entityId);
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
        this.createZeroedComponentAt(index);
        this._values[index].entityId = 0;
        this._keys.delete(entityId);
        this.updateActiveLength(index, false);
        this._nbCreated -= 1;
        return true;
    };
    /**
     * Alias for free()
     * @param entityId
     */
    ComponentFactory.prototype.delete = function (entityId) {
        return this.free(entityId);
    };
    /**
     * Resize the pool
     * if the size passed as parameter is inferior to the actual pool size, last components will be removed
     * @param size desired size of the pool
     */
    ComponentFactory.prototype.resizeTo = function (size) {
        size = Math.floor(size);
        var diff = size - this.size;
        if (diff > 0) {
            var oldL = this._values.length;
            this._values.length += diff;
            for (var i = oldL; i < diff + oldL; ++i) {
                this.createZeroedComponentAt(i);
            }
        }
        else if (diff < 0) {
            diff = Math.abs(diff);
            for (var i = 0; i < diff; ++i) {
                var toDelete = this._values[this._values.length - 1];
                this._keys.delete(toDelete.entityId);
                this._values.pop();
            }
        }
        this._size += diff;
    };
    /**
     * Expand the pool's size by a given value
     * @param { number } amount the amount to resize to pool by (can be  a negative value)
     */
    ComponentFactory.prototype.expand = function (amount) {
        amount = Math.floor(amount);
        var newSize = this.size + amount;
        this.resizeTo(newSize);
    };
    // overwrite fastIterationMap method we don't want to use
    ComponentFactory.prototype.insertAfter = function (key, value, keyRef) {
        return false;
    };
    ComponentFactory.prototype.insertBefore = function (key, value, keyRef) {
        return false;
    };
    /**
     * Delete range of components from a component key and its successors in reverse order so activeLength doesn't need to be re-computed if range comprise the last created element.
     * @param fromKey key of the first component to start freeing
     * @param nbComponents number of components to free
     */
    ComponentFactory.prototype.freeRangeComponents = function (fromKey, nbComponents) {
        var startingIndex = this.getIndex(fromKey);
        if (startingIndex === undefined) {
            return false;
        }
        var endingIndex = startingIndex + nbComponents;
        if (endingIndex > this._activeLength) {
            endingIndex = this._activeLength - 1;
        }
        for (var i = endingIndex; i >= startingIndex; --i) {
            this.free(this._values[i].entityId);
        }
    };
    ComponentFactory.prototype.computeActiveLength = function () {
        var lastCreatedIndex = 0;
        var l = this._values.length;
        for (var i = 0; i < l; ++i) {
            // zeroed components have an entityId of 0
            if (this._values[i].entityId !== 0) {
                lastCreatedIndex = i;
            }
        }
        this._activeLength = lastCreatedIndex + 1;
    };
    ComponentFactory.prototype.createFromComponent = function (entityId, comp) {
        var _this = this;
        if (this._keys.has(entityId)) {
            throw Error("entityId already exists in the pool");
        }
        var newComp = this.create(entityId, true);
        var index = this.getIndex(newComp.entityId);
        var prop = JSON.parse(JSON.stringify(comp));
        Object.keys(this._zeroedRef).forEach(function (p) {
            if (_this._values[index].hasOwnProperty(p)) {
                _this._values[index][p] = prop[p];
            }
        });
        this._values[index].entityId = entityId;
        return this._values[index];
    };
    ComponentFactory.prototype.createZeroedComponentAt = function (index) {
        var _this = this;
        var prop = JSON.parse(JSON.stringify(this._zeroedRef));
        this._values[index] = Object.create(this._zeroedRef);
        Object.keys(this._zeroedRef).forEach(function (p) {
            _this._values[index][p] = prop[p];
        });
    };
    ComponentFactory.prototype.getIndexOfFirstAvailableSpot = function () {
        var l = this._values.length;
        for (var i = 0; i < l; ++i) {
            if (this._values[i].entityId === 0) {
                return i;
            }
        }
        return -1;
    };
    ComponentFactory.prototype.mapValues = function (destination, source) {
        for (var i in source) {
            if (destination.hasOwnProperty(i)) {
                destination[i] = source[i];
            }
        }
    };
    ComponentFactory.prototype.updateActiveLength = function (inputIndex, adding) {
        if (!adding) {
            if (inputIndex >= this._activeLength - 1) {
                this._activeLength -= 1;
            }
        }
        else {
            if (inputIndex >= this._activeLength) {
                this._activeLength += 1;
            }
        }
    };
    Object.defineProperty(ComponentFactory.prototype, "activeLength", {
        get: function () {
            return this._activeLength;
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
    Object.defineProperty(ComponentFactory.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentFactory;
}(FastIterationMap_1.FastIterationMap));
exports.ComponentFactory = ComponentFactory;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pollyFill_1 = __webpack_require__(0);
var FrameEvent = /** @class */ (function () {
    function FrameEvent(MS_PER_UPDATE) {
        this.MS_PER_UPDATE = MS_PER_UPDATE;
        this.lag = 0;
        this.lastFrame = 0;
        this.time = 0;
    }
    FrameEvent.prototype.reset = function () {
        this.lag = 0;
        this.lastFrame = 0;
        this.time = 0;
    };
    return FrameEvent;
}());
exports.FrameEvent = FrameEvent;
var GameLoop = /** @class */ (function () {
    function GameLoop(systemManager, timer) {
        if (timer === void 0) { timer = new FrameEvent(1000 / 30); }
        this.systemManager = systemManager;
        this._currentTimer = timer;
        this._running = false;
    }
    GameLoop.prototype.isRunning = function () {
        return this._running;
    };
    Object.defineProperty(GameLoop.prototype, "systemManager", {
        get: function () {
            return this._systemManager;
        },
        set: function (systems) {
            this._systemManager = systems;
            this._fixedTSSystems = this._systemManager.getFixedTSSystems();
            this._nonFixedTSSystems = this._systemManager.getNonFixedTSSystems();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLoop.prototype, "currentTimer", {
        get: function () {
            return this._currentTimer;
        },
        set: function (timer) {
            this._currentTimer = timer;
        },
        enumerable: true,
        configurable: true
    });
    GameLoop.prototype.start = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._running = true;
        this._currentTimer.reset();
        this._currentTimer.lastFrame = pollyFill_1.TIMESTAMP.now();
        this.loop.apply(this, args);
        // this.update(timer);
    };
    GameLoop.prototype.stop = function () {
        this._running = false;
        cancelAnimationFrame(this._frameId);
    };
    GameLoop.prototype.resume = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._running = true;
        this._currentTimer.lastFrame = pollyFill_1.TIMESTAMP.now();
        this.loop.apply(this, args);
    };
    /* Set the process frequency in mms */
    GameLoop.prototype.setFrequency = function (frequency) {
        this._currentTimer.MS_PER_UPDATE = frequency;
    };
    GameLoop.prototype.loop = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = pollyFill_1.TIMESTAMP.now();
        var ellapsed = now - this._currentTimer.lastFrame;
        this._currentTimer.delta = ellapsed;
        this._currentTimer.lastFrame = now;
        this._currentTimer.lag += ellapsed;
        this._currentTimer.time += ellapsed;
        // limit delta max value when browser loose focus and resume ?
        while (this._currentTimer.lag >= this._currentTimer.MS_PER_UPDATE) {
            this.updateFixedTS.apply(this, args);
            this._currentTimer.lag -= this._currentTimer.MS_PER_UPDATE;
        }
        this.updateNonFixedTS.apply(this, args);
        if (this._running) {
            // is ... args necessary here ?
            this._frameId = requestAnimationFrame(function () { return _this.loop.apply(_this, args); });
        }
        else {
            cancelAnimationFrame(this._frameId);
        }
    };
    /* Process every Fixed Systems */
    GameLoop.prototype.updateFixedTS = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var l = this._fixedTSSystems.length;
        for (var i = 0; i < l; ++i) {
            if (this._fixedTSSystems[i].active) {
                (_a = this._fixedTSSystems[i]).process.apply(_a, [this._currentTimer].concat(args));
            }
        }
        var _a;
    };
    /* Process every Non Fixed Systems */
    GameLoop.prototype.updateNonFixedTS = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var l = this._nonFixedTSSystems.length;
        for (var i = 0; i < l; ++i) {
            if (this._nonFixedTSSystems[i].active) {
                (_a = this._nonFixedTSSystems[i]).process.apply(_a, [this._currentTimer].concat(args));
            }
        }
        var _a;
    };
    return GameLoop;
}());
exports.GameLoop = GameLoop;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FastIterationMap_1 = __webpack_require__(1);
var pollyFill_1 = __webpack_require__(0);
// fixedTimeStep = update at requestionAnimation frequency
// nonFixedTimeStep = update as much as possible between frame
var SystemManager = /** @class */ (function () {
    function SystemManager() {
        this.fixedTimeStepSystems = new FastIterationMap_1.FastIterationMap();
        this.nonFixedTimeStepSystems = new FastIterationMap_1.FastIterationMap();
    }
    /* Add a system to be processed in fixed time step or at render speed*/
    SystemManager.prototype.pushSystem = function (system, fixedTimeStep) {
        if (fixedTimeStep === void 0) { fixedTimeStep = false; }
        var id = this.generateId(system);
        // const sysWState = new SystemWithStates(id, system);
        if (fixedTimeStep) {
            this.fixedTimeStepSystems.push(id, system);
        }
        else {
            this.nonFixedTimeStepSystems.push(id, system);
        }
        return id;
    };
    SystemManager.prototype.insertAround = function (systemMiddleId, systemBefore, systemAfter) {
        var id1 = "";
        var id2 = "";
        id1 = this.generateId(systemBefore);
        id2 = this.generateId(systemAfter);
        // case the 2 sytems to insert are of the same class
        // generateId will be the same
        if (id1 === id2) {
            // add a random number to the id of id2
            // should be ok ...
            id2 = id2 + "_" + pollyFill_1.RANDOM.integer(100000);
        }
        if (this.fixedTimeStepSystems.has(systemMiddleId)) {
            this.fixedTimeStepSystems.insertAround(systemMiddleId, id1, systemBefore, id2, systemAfter);
            return [id1, id2];
        }
        else if (this.nonFixedTimeStepSystems.has(systemMiddleId)) {
            this.nonFixedTimeStepSystems.insertAround(systemMiddleId, id1, systemBefore, id2, systemAfter);
            return [id1, id2];
        }
        else {
            return ["", ""];
        }
    };
    SystemManager.prototype.insertAfter = function (systemRefId, systemToInsert) {
        var id = "";
        if (this.fixedTimeStepSystems.has(systemRefId)) {
            id = this.generateId(systemToInsert);
            this.fixedTimeStepSystems.insertAfter(id, systemToInsert, systemRefId);
        }
        else if (this.nonFixedTimeStepSystems.has(systemRefId)) {
            id = this.generateId(systemToInsert);
            this.nonFixedTimeStepSystems.insertAfter(id, systemToInsert, systemRefId);
        }
        return id;
    };
    SystemManager.prototype.insertBefore = function (systemRefId, systemToInsert) {
        var id = "";
        if (this.fixedTimeStepSystems.has(systemRefId)) {
            id = this.generateId(systemToInsert);
            this.fixedTimeStepSystems.insertBefore(id, systemToInsert, systemRefId);
        }
        else if (this.nonFixedTimeStepSystems.has(systemRefId)) {
            id = this.generateId(systemToInsert);
            this.nonFixedTimeStepSystems.insertBefore(id, systemToInsert, systemRefId);
        }
        return id;
    };
    SystemManager.prototype.remove = function (systemId) {
        if (!this.fixedTimeStepSystems.delete(systemId)) {
            if (!this.nonFixedTimeStepSystems.delete(systemId)) {
                return false;
            }
        }
        return true;
    };
    SystemManager.prototype.getFixedTSSystems = function () {
        return this.fixedTimeStepSystems.values;
    };
    SystemManager.prototype.getNonFixedTSSystems = function () {
        return this.nonFixedTimeStepSystems.values;
    };
    /* Get a system by its id.
    /*  return undefined if not found.
    */
    SystemManager.prototype.get = function (systemId) {
        if (this.fixedTimeStepSystems.has(systemId)) {
            return this.fixedTimeStepSystems.get(systemId);
        }
        else if (this.nonFixedTimeStepSystems.has(systemId)) {
            return this.nonFixedTimeStepSystems.get(systemId);
        }
        return undefined;
    };
    /* Generate an Id with the System class name + a number if more than one instance in the SystemManager.
    /* i.e : System, System_1, System_2
    */
    SystemManager.prototype.generateId = function (system) {
        var stringName = system.constructor["name"];
        var nbChar = stringName.length;
        var found = this.getListOfSystemId(stringName);
        if (found.length === 0) {
            return stringName;
        }
        else {
            // get the max number amound insances found
            var max_1 = null;
            found.forEach(function (k) {
                // if "_" then there is a number
                var numberIndex = k.indexOf("_");
                if (numberIndex !== -1) {
                    var num = Number(k.substring(k.length, numberIndex + 1));
                    if (num > max_1) {
                        max_1 = num;
                    }
                }
            });
            // found an instance without number
            if (max_1 === null) {
                return stringName + "_" + 1;
            }
            else {
                max_1 += 1;
                return stringName + "_" + max_1;
            }
        }
    };
    SystemManager.prototype.getListOfSystemId = function (className) {
        var res = [];
        // find all instance name
        this.fixedTimeStepSystems.keys.forEach(function (s, k) {
            // if there is already an instance of this system
            if (k.indexOf(className) === 0) {
                res.push(k);
            }
        });
        this.nonFixedTimeStepSystems.keys.forEach(function (s, k) {
            // if there is already an instance of this system
            if (k.indexOf(className) === 0) {
                res.push(k);
            }
        });
        return res;
    };
    return SystemManager;
}());
exports.SystemManager = SystemManager;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TM_POOL_SIZE = 30;
exports.TM_POOL_SIZE = TM_POOL_SIZE;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentFactory_1 = __webpack_require__(2);
exports.ComponentFactory = ComponentFactory_1.ComponentFactory;
var EntityFactory_1 = __webpack_require__(8);
exports.EntityFactory = EntityFactory_1.EntityFactory;
var GameLoop_1 = __webpack_require__(3);
exports.GameLoop = GameLoop_1.GameLoop;
var interfaces = __webpack_require__(9);
exports.interfaces = interfaces;
var pollyFill_1 = __webpack_require__(0);
exports.RANDOM = pollyFill_1.RANDOM;
exports.TIMESTAMP = pollyFill_1.TIMESTAMP;
var ProjectSetup_1 = __webpack_require__(10);
exports.Project = ProjectSetup_1.Project;
var System_1 = __webpack_require__(12);
exports.System = System_1.System;
var SystemManager_1 = __webpack_require__(4);
exports.SystemManager = SystemManager_1.SystemManager;
var DEFAULT_CONF = __webpack_require__(5);
exports.DEFAULT_CONF = DEFAULT_CONF;
var TimeMeasureUtil_1 = __webpack_require__(13);
exports.TimeMeasureComponent = TimeMeasureUtil_1.TimeMeasureComponent;
exports.TimeMeasureSystem = TimeMeasureUtil_1.TimeMeasureSystem;
exports.TimeMeasureSystemEndMark = TimeMeasureUtil_1.TimeMeasureSystemEndMark;
exports.TimeMeasureSystemStartMark = TimeMeasureUtil_1.TimeMeasureSystemStartMark;
exports.TimeMeasureUtil = TimeMeasureUtil_1.TimeMeasureUtil;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EntityFactory = /** @class */ (function () {
    function EntityFactory(_size, type) {
        if (type === void 0) { type = "Entity"; }
        this._size = _size;
        this.type = type;
        this._factories = new Map();
    }
    EntityFactory.prototype.activate = function (entityId, value, factoriesName) {
        var _this = this;
        if (factoriesName) {
            factoriesName.forEach(function (f) {
                var ff = _this.getFactory(f);
                if (ff) {
                    ff.activate(entityId, value);
                }
            });
        }
        else {
            this._factories.forEach(function (f) {
                f.activate(entityId, value);
            });
        }
    };
    EntityFactory.prototype.activateAll = function (value) {
        this._factories.forEach(function (f) {
            f.activateAll(value);
        });
    };
    EntityFactory.prototype.addFactory = function (name, factory) {
        if (factory.size !== this._size) {
            factory.resizeTo(this._size);
        }
        this._factories.set(name, factory);
    };
    EntityFactory.prototype.getComponent = function (entityId, factoryName) {
        var f = this._factories.get(factoryName);
        if (f) {
            return f.get(entityId);
        }
        else {
            return undefined;
        }
    };
    EntityFactory.prototype.getFactory = function (name) {
        return this._factories.get(name);
    };
    EntityFactory.prototype.free = function (entityId) {
        var d = true;
        this._factories.forEach(function (f) {
            if (!f.free(entityId)) {
                d = false;
            }
        });
        // false if no factories
        return this._factories.size > 0 && d;
    };
    EntityFactory.prototype.get = function (entityId) {
        var e = [];
        this._factories.forEach(function (f) {
            e.push(f.get(entityId));
        });
        return e;
    };
    EntityFactory.prototype.has = function (entityId) {
        var it = this._factories.entries();
        return it.next().value[1].has(entityId);
    };
    EntityFactory.prototype.create = function (entityId, active) {
        this._factories.forEach(function (f) {
            f.create(entityId, active);
        });
    };
    EntityFactory.prototype.resizeTo = function (size) {
        this._factories.forEach(function (f) {
            f.resizeTo(size);
        });
        this._size = size;
    };
    Object.defineProperty(EntityFactory.prototype, "activeLength", {
        get: function () {
            // return iteratorLength of the first factory;
            var it = this._factories.entries();
            return it.next().value[1].activeLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFactory.prototype, "nbActive", {
        get: function () {
            var it = this._factories.entries();
            return it.next().value[1].nbActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFactory.prototype, "nbCreated", {
        get: function () {
            var it = this._factories.entries();
            return it.next().value[1].nbCreated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFactory.prototype, "nbFreeSlot", {
        get: function () {
            var it = this._factories.entries();
            return it.next().value[1].nbFreeSlot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFactory.prototype, "nbInactive", {
        get: function () {
            var it = this._factories.entries();
            return it.next().value[1].nbInactive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityFactory.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    return EntityFactory;
}());
exports.EntityFactory = EntityFactory;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameLoop_1 = __webpack_require__(3);
var PoolManager_1 = __webpack_require__(11);
var SystemManager_1 = __webpack_require__(4);
var Project = /** @class */ (function () {
    function Project(globalObject, _projectName) {
        var utils = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            utils[_i - 2] = arguments[_i];
        }
        this._projectName = _projectName;
        var sysM = new SystemManager_1.SystemManager();
        this.project = {
            GameLoop: new GameLoop_1.GameLoop(sysM),
            PoolManager: new PoolManager_1.PoolManager(),
            SystemManager: sysM,
            Utils: utils.slice()
        };
        globalObject[_projectName] = this.project;
    }
    Object.defineProperty(Project.prototype, "projectName", {
        get: function () {
            return this._projectName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clear references so that the project can be garbage collected
     */
    Project.prototype.clear = function () {
        this.project.GameLoop.stop();
        this.project.GameLoop.systemManager = undefined;
        this.project.SystemManager = undefined;
        this.project.PoolManager = undefined;
        this.globalObject[this._projectName] = undefined;
        this.project.Utils = [];
        try {
            delete this.globalObject[this._projectName];
        }
        catch (e) { }
    };
    return Project;
}());
exports.Project = Project;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FastIterationMap_1 = __webpack_require__(1);
var pollyFill_1 = __webpack_require__(0);
var PoolManager = /** @class */ (function () {
    function PoolManager() {
        this._pools = new FastIterationMap_1.FastIterationMap();
    }
    PoolManager.prototype.get = function (poolId) {
        return this._pools.get(poolId);
    };
    PoolManager.prototype.pushPool = function (pool) {
        var id = this.generateId(pool);
        this._pools.set(id, pool);
        return id;
    };
    PoolManager.prototype.remove = function (poolId) {
        return this._pools.delete(poolId);
    };
    PoolManager.prototype.generateId = function (pool) {
        return pool.type + pollyFill_1.RANDOM.integer(100000);
    };
    return PoolManager;
}());
exports.PoolManager = PoolManager;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var System = /** @class */ (function () {
    function System(paramObj) {
        this.paramObj = paramObj;
        this.active = true;
        this.keys = Object.keys(this.paramObj);
    }
    System.prototype.setParamsSource = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // verify number of args
        // verify that the component the factory holds have the proprety define by the paramObj
        this.factories = args;
    };
    System.prototype.process = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = this.paramObj;
        var flist = this.factories;
        // flist.length = this.keys.length
        var nbComponent = flist[0].activeLength;
        var f = flist[0].values;
        for (var i = 0; i < nbComponent; ++i) {
            // get the component from the first factory that serve as a reference
            // if it is active query the other components
            var refComponent = f[i];
            if (refComponent.active) {
                params[this.keys[0]] = refComponent;
                var isFound = true;
                // Iterate others factories to query rest of the components
                for (var j = 1; j < flist.length; ++j) {
                    // If the factory is the same as the factory that serve as a reference
                    // we push the same component to the args array,
                    // otherwise we query the component though get(entityId)
                    if (flist[j] === flist[0]) {
                        params[this.keys[j]] = refComponent;
                    }
                    else {
                        var c = flist[j].get(refComponent.entityId);
                        if (!c) {
                            isFound = false;
                            break;
                        }
                        params[this.keys[j]] = c;
                    }
                }
                if (isFound) {
                    // why apply is necessary ?
                    // this.execute.apply(this, params);
                    this.execute.apply(this, [params].concat(args));
                }
            }
        }
    };
    return System;
}());
exports.System = System;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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
var ComponentFactory_1 = __webpack_require__(2);
var pollyFill_1 = __webpack_require__(0);
var DefaultConfig_1 = __webpack_require__(5);
/**
 * Component that holds time measure
 */
var TimeMeasureComponent = /** @class */ (function () {
    function TimeMeasureComponent(measureId, lastT, minT, maxT, meanT, frequency) {
        if (frequency === void 0) { frequency = 0; }
        this.measureId = measureId;
        this.lastT = lastT;
        this.minT = minT;
        this.maxT = maxT;
        this.meanT = meanT;
        this.frequency = frequency;
    }
    return TimeMeasureComponent;
}());
exports.TimeMeasureComponent = TimeMeasureComponent;
/**
 * Measure time passed between execution of n Systems
 */
var TimeMeasureUtil = /** @class */ (function () {
    function TimeMeasureUtil(sysManager, timeMeasurePool) {
        this.sysManager = sysManager;
        this.measures = new Map();
        this.timeMeasurePool = timeMeasurePool || new ComponentFactory_1.ComponentFactory(DefaultConfig_1.TM_POOL_SIZE, new TimeMeasureComponent("", 0, 0, 0, 0, 0));
    }
    TimeMeasureUtil.prototype.install = function (systemIdToMeasure) {
        // use the system id to measure as the measure id + a random number in case of multiple installation of a TimeMeasure on the same System (no use unless to measure the TM overhead)
        var measureId = systemIdToMeasure + pollyFill_1.RANDOM.integer(100000);
        var tmC = this.timeMeasurePool.create(this.timeMeasurePool.nbCreated + 1, true);
        tmC.measureId = measureId;
        var res = this.sysManager.insertAround(systemIdToMeasure, new TimeMeasureSystemStartMark(tmC), new TimeMeasureSystemEndMark(tmC));
        this.measures.set(measureId, { startSystem: res[0], endSystem: res[1] });
        return tmC;
    };
    /**
     * Remove TimeMeasure Systems from the SystemManager and free the TimeMeasure component
     */
    TimeMeasureUtil.prototype.uninstall = function (tmComponent) {
        var tmId = tmComponent.measureId;
        var systemIds = this.measures.get(tmId);
        this.sysManager.remove(systemIds.startSystem);
        this.sysManager.remove(systemIds.endSystem);
        this.timeMeasurePool.free(tmComponent.entityId);
        this.measures.delete(tmId);
    };
    return TimeMeasureUtil;
}());
exports.TimeMeasureUtil = TimeMeasureUtil;
var TimeMeasureSystem = /** @class */ (function () {
    /**
     * @param tmComponent the component used for recording time
     */
    function TimeMeasureSystem(tmComponent) {
        this.tmComponent = tmComponent;
        this.active = true;
        this.startMark = "start" + this.tmComponent.measureId;
        this.endMark = "end" + this.tmComponent.measureId;
    }
    TimeMeasureSystem.prototype.getData = function () {
        return TimeMeasureSystem.performance.getEntriesByName(this.tmComponent.measureId);
    };
    TimeMeasureSystem.performance = window.performance;
    return TimeMeasureSystem;
}());
exports.TimeMeasureSystem = TimeMeasureSystem;
/**
 * System that place a mark to start the measure of time
 */
var TimeMeasureSystemStartMark = /** @class */ (function (_super) {
    __extends(TimeMeasureSystemStartMark, _super);
    /**
     * @param tmComponent the component used for recording time
     */
    function TimeMeasureSystemStartMark(tmComponent) {
        return _super.call(this, tmComponent) || this;
    }
    /**
     * Place the starting mark
     */
    TimeMeasureSystemStartMark.prototype.process = function (args) {
        // TimeMeasureSystem.performance.mark(this.startMark);
        window.performance.mark(this.startMark);
    };
    /**
     * Not used
     */
    TimeMeasureSystemStartMark.prototype.execute = function () { };
    return TimeMeasureSystemStartMark;
}(TimeMeasureSystem));
exports.TimeMeasureSystemStartMark = TimeMeasureSystemStartMark;
var TimeMeasureSystemEndMark = /** @class */ (function (_super) {
    __extends(TimeMeasureSystemEndMark, _super);
    function TimeMeasureSystemEndMark(tmComponent) {
        var _this = _super.call(this, tmComponent) || this;
        _this.lastUpdate = 0;
        return _this;
    }
    /**
     * @param args first args have to be a FrameEvent object
     */
    TimeMeasureSystemEndMark.prototype.process = function (args) {
        this.execute(args[0]);
    };
    /**
     *  Measure time passed since the start mark and compute statistics if time.lag >= the specified frequency of computation
     * @param time FrameEvent used to decide when to compute data
     */
    TimeMeasureSystemEndMark.prototype.execute = function (time) {
        TimeMeasureSystem.performance.mark(this.endMark);
        this.measure();
        // console.log(TIMESTAMP.now() - this.lastUpdate);
        if ((pollyFill_1.TIMESTAMP.now() - this.lastUpdate) >= this.tmComponent.frequency) {
            this.computeData();
            this.clearData();
            this.lastUpdate = pollyFill_1.TIMESTAMP.now();
        }
    };
    TimeMeasureSystemEndMark.prototype.measure = function () {
        TimeMeasureSystem.performance.measure(this.tmComponent.measureId, this.startMark, this.endMark);
    };
    /**
     * Set max, min mean and last measure to the TMComponent from the performance.measure data set
     */
    TimeMeasureSystemEndMark.prototype.computeData = function () {
        var measures = TimeMeasureSystem.performance.getEntriesByName(this.tmComponent.measureId);
        var l = measures.length;
        var min = Number.MAX_VALUE;
        var max = 0;
        var mean = 0;
        for (var i = 0; i < l; ++i) {
            var d = measures[i].duration;
            if (d < min) {
                min = d;
            }
            if (d > max) {
                max = d;
            }
            mean += d;
        }
        mean /= l;
        this.tmComponent.meanT = mean;
        this.tmComponent.maxT = max;
        this.tmComponent.minT = min;
        this.tmComponent.lastT = measures[l - 1].duration;
    };
    /**
     * Clear the measure data set
     */
    TimeMeasureSystemEndMark.prototype.clearData = function () {
        TimeMeasureSystem.performance.clearMeasures(this.tmComponent.measureId);
    };
    return TimeMeasureSystemEndMark;
}(TimeMeasureSystem));
exports.TimeMeasureSystemEndMark = TimeMeasureSystemEndMark;


/***/ })
/******/ ]);
});