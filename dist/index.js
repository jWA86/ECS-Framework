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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    FastIterationMap.prototype.has = function (key) {
        return this._keys.has(key);
    };
    FastIterationMap.prototype.insertAfter = function (key, value, keyRef) {
        if (this._keys.get(key) !== undefined) {
            return false;
        }
        var i = this._keys.get(keyRef);
        this.insertValue(key, value, i + 1);
        if (i === undefined) {
            return false;
        }
        else {
            this.offsetIndexInKeys(i, 1);
            this._keys.set(key, i + 1);
            return true;
        }
    };
    FastIterationMap.prototype.insertBefore = function (key, value, keyRef) {
        if (this._keys.get(key) !== undefined) {
            return false;
        }
        var i = this._keys.get(keyRef);
        this.insertValue(key, value, i);
        if (i === undefined) {
            return false;
        }
        else {
            this.offsetIndexInKeys(i - 1, 1);
            this._keys.set(key, i);
            return true;
        }
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
    FastIterationMap.prototype.insertValue = function (key, value, index) {
        return this._values.splice(index, 0, value);
    };
    // from exclusive
    // to exclusive
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentFactory_1 = __webpack_require__(3);
exports.ComponentFactory = ComponentFactory_1.ComponentFactory;
exports.EntityFactory = ComponentFactory_1.EntityFactory;
var GameLoop_1 = __webpack_require__(4);
exports.GameLoop = GameLoop_1.GameLoop;
__webpack_require__(9);
var System_1 = __webpack_require__(10);
exports.System = System_1.System;
var SystemManager_1 = __webpack_require__(11);
exports.SystemManager = SystemManager_1.SystemManager;


/***/ }),
/* 3 */
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
var FastIterationMap_1 = __webpack_require__(0);
var ComponentFactory = /** @class */ (function (_super) {
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
        _this._zeroedRef = new (componentType.bind.apply(componentType, [void 0, 0, false].concat(args)))();
        _this._values.length = _this._size;
        for (var i = 0; i < _size; ++i) {
            _this.createZeroedComponentAt(i);
        }
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
        this._iterationLength = 0;
    };
    ComponentFactory.prototype.create = function (entityId, active) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
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
                toReplaceComp = this._values[index];
            }
        }
        else {
            index = this._keys.get(entityId);
            // replace all propreties value from the component to update
            toReplaceComp = this._values[index];
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
        toReplaceComp.entityId = entityId;
        toReplaceComp.active = active;
        // lastly increment the lastActiveIndex
        this.incrementCreatedLength(index);
        return this._values[index];
    };
    /* Set entityId back to 0 and desactivate the component
    * note : when the component is reuse it still has the old values
    */
    ComponentFactory.prototype.free = function (entityId) {
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
        // note : removed while a solution is found to deep clone an object
        // this.mapObject(this._values[index], this._zeroedRef);
        this._values[index].entityId = 0;
        this._keys.delete(entityId);
        this.decrementCreatedLength(index);
        this._nbCreated -= 1;
        return true;
    };
    ComponentFactory.prototype.recycle = function (indexComponentToReplace, componentRef) {
        var _this = this;
        // parsing Date ?
        // parsing Function ?
        var prop = JSON.parse(JSON.stringify(componentRef));
        this._values[indexComponentToReplace] = Object.create(componentRef);
        Object.keys(componentRef).forEach(function (p) {
            _this._values[indexComponentToReplace][p] = prop[p];
        });
    };
    ComponentFactory.prototype.resize = function (size) {
        var dif = size - this.size;
        if (dif > 0) {
            var oldL = this._values.length;
            this._values.length += dif;
            for (var i = 0; i < dif; ++i) {
                this.createZeroedComponentAt(oldL + i);
            }
        }
        else if (dif < 0) {
            dif = Math.abs(dif);
            for (var i = 0; i < dif; ++i) {
                var toDelete = this._values[this._values.length - 1];
                this._keys.delete(toDelete.entityId);
                this._values.pop();
            }
        }
        this._size += dif;
    };
    // overwrite fastIterationMap method we don't want to use
    ComponentFactory.prototype.insertAfter = function (key, value, keyRef) {
        return false;
    };
    ComponentFactory.prototype.insertBefore = function (key, value, keyRef) {
        return false;
    };
    ComponentFactory.prototype.createZeroedComponentAt = function (index) {
        this.recycle(index, this._zeroedRef);
        this._values[index].entityId = 0;
        this._values[index].active = false;
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
    ComponentFactory.prototype.mapObject = function (oldC, newC) {
        for (var i in newC) {
            if (oldC.hasOwnProperty(i)) {
                oldC[i] = newC[i];
            }
        }
    };
    ComponentFactory.prototype.decrementCreatedLength = function (inputIndex) {
        if (inputIndex >= this._iterationLength - 1) {
            this._iterationLength -= 1;
        }
    };
    ComponentFactory.prototype.incrementCreatedLength = function (inputIndex) {
        if (inputIndex >= this._iterationLength) {
            this._iterationLength += 1;
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
    return ComponentFactory;
}(FastIterationMap_1.FastIterationMap));
exports.ComponentFactory = ComponentFactory;
var EntityFactory = /** @class */ (function () {
    function EntityFactory(_size) {
        this._size = _size;
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
            factory.resize(this._size);
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
    EntityFactory.prototype.resize = function (size) {
        this._factories.forEach(function (f) {
            f.resize(size);
        });
        this._size = size;
    };
    Object.defineProperty(EntityFactory.prototype, "iterationLength", {
        get: function () {
            // return iteratorLength of the first factory;
            var it = this._factories.entries();
            return it.next().value[1].iterationLength;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(5);
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
        this.timestamp = this._pollyFillHighResolutionTime();
        this.setSystemManager(systemManager);
        this._currentTimer = timer;
        this._running = false;
    }
    GameLoop.prototype.isRunning = function () {
        return this._running;
    };
    GameLoop.prototype.getSystemManager = function () {
        return this._systemManager;
    };
    GameLoop.prototype.getCurrentTimer = function () {
        return this._currentTimer;
    };
    GameLoop.prototype.setCurretnTimer = function (timer) {
        this._currentTimer = timer;
    };
    GameLoop.prototype.setSystemManager = function (systems) {
        this._systemManager = systems;
        this._fixedTSSystems = this._systemManager.getFixedTSSystems();
        this._nonFixedTSSystems = this._systemManager.getNonFixedTSSystems();
    };
    GameLoop.prototype.start = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._running = true;
        this._currentTimer.reset();
        this._currentTimer.lastFrame = this.timestamp.now();
        this.loop(args);
        // this.update(timer);
    };
    GameLoop.prototype.stop = function () {
        this._running = false;
        cancelAnimationFrame(this._frameId);
    };
    GameLoop.prototype.resume = function () {
        this._running = true;
        this._currentTimer.lastFrame = this.timestamp.now();
        this.loop();
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
        var now = this.timestamp.now();
        var ellapsed = now - this._currentTimer.lastFrame;
        this._currentTimer.delta = ellapsed;
        this._currentTimer.lastFrame = now;
        this._currentTimer.lag += ellapsed;
        this._currentTimer.time += ellapsed;
        // limit delta max value when browser loose focus and resume ?
        while (this._currentTimer.lag >= this._currentTimer.MS_PER_UPDATE) {
            this.updateFixedTS(args);
            this._currentTimer.lag -= this._currentTimer.MS_PER_UPDATE;
        }
        this.updateNonFixedTS(args);
        if (this._running) {
            this._frameId = requestAnimationFrame(function () { return _this.loop(); });
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
                this._fixedTSSystems[i].process([this._currentTimer, args]);
            }
        }
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
                this._nonFixedTSSystems[i].process([this._currentTimer, args]);
            }
        }
    };
    GameLoop.prototype._pollyFillHighResolutionTime = function () {
        return window.performance && window.performance.now ? window.performance : Date;
    };
    return GameLoop;
}());
exports.GameLoop = GameLoop;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(7)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// interface IFrameEvent {
//     /* The number of times the frame event was fired */
//     count: number;
//     /* The time passed in seconds since the last frame event */
//     delta: number;
//     loopCount: number;
//     reverse: boolean;
//     /* The total amount of time passed since the first frame event in seconds */
//     time: number;
// }


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// A factory for each parameters of the exectute function
var System = /** @class */ (function () {
    // public active: boolean = true;
    function System() {
    }
    /**  Set the source of the components that will be processed.
     * One factory per component parameters in the order requested by the executed method.
     * i.e :setFactories(movingFactory, movingFactory, iaFactory);
     */
    System.prototype.setFactories = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.factories = args;
    };
    // Query the components and execute active ones
    System.prototype.process = function (args) {
        var flist = this.factories;
        var l = flist[0].iterationLength;
        var f = flist[0].values;
        for (var i = 0; i < l; ++i) {
            // get the component from the first factory that serve as a reference
            // if it is active query the other components
            var refComponent = f[i];
            if (refComponent.active) {
                // Array that hold component that will be used by the execute function
                var arr = [];
                arr.push(refComponent);
                var isFound = true;
                // Iterate others factories to query rest of the components
                for (var j = 1; j < flist.length; ++j) {
                    // If the factory is the same as the factory that serve as a reference
                    // we push the same component to the args array,
                    // otherwise we query the component though get(entityId)
                    if (flist[j] === flist[0]) {
                        arr.push(refComponent);
                    }
                    else {
                        var c = flist[j].get(refComponent.entityId);
                        if (!c) {
                            isFound = false;
                            break;
                        }
                        arr.push(c);
                    }
                }
                if (isFound) {
                    // add eventual parameters passed to the process function at the end of the execute parameters list
                    if (args) {
                        var al = args.length;
                        for (var a = 0; a < al; ++a) {
                            arr.push(args[a]);
                        }
                    }
                    this.execute.apply(this, arr);
                }
            }
        }
    };
    return System;
}());
exports.System = System;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FastIterationMap_1 = __webpack_require__(0);
var TimeMeasure_1 = __webpack_require__(12);
var SystemWithStates = /** @class */ (function () {
    function SystemWithStates(id, system) {
        this.active = true;
        this._measureTime = false;
        this.perfMeasure = new TimeMeasure_1.TimeMeasure(id);
        this.system = system;
        this.process = this.processDefault;
    }
    SystemWithStates.prototype.setFactories = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._system).setFactories.apply(_a, args);
        var _a;
    };
    SystemWithStates.prototype.processWithTimeMeasure = function (args) {
        this.perfMeasure.placeStartMark();
        this._system.process(args);
        this.perfMeasure.placeEndingMark();
        // measure and compute then clear data so we don't use memory since it's run in infinit loop
        this.perfMeasure.measure();
        this.perfMeasure.computeData();
        this.perfMeasure.clearData();
    };
    SystemWithStates.prototype.processDefault = function (args) {
        this._system.process(args);
    };
    Object.defineProperty(SystemWithStates.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemWithStates.prototype, "system", {
        get: function () {
            return this._system;
        },
        set: function (system) {
            this._system = system;
            this.perfMeasure.buildMark(this._id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemWithStates.prototype, "measureTime", {
        set: function (val) {
            this._measureTime = val;
            if (val) {
                this.process = this.processWithTimeMeasure;
            }
            else {
                this.process = this.processDefault;
            }
        },
        enumerable: true,
        configurable: true
    });
    return SystemWithStates;
}());
// renomage necessaire fixed et non fixedTimeStep
// en realité les 2 sont executés en fixedTimeSteps
// seulement l'un est executer plusieurs fois si possible
var SystemManager = /** @class */ (function () {
    function SystemManager() {
        this.fixedTimeStepSystems = new FastIterationMap_1.FastIterationMap();
        this.nonFixedTimeStepSystems = new FastIterationMap_1.FastIterationMap();
    }
    /* Add a system to be processed in fixed time step or at render speed*/
    SystemManager.prototype.pushSystem = function (system, fixedTimeStep) {
        if (fixedTimeStep === void 0) { fixedTimeStep = false; }
        var id = this.generateId(system);
        var sysWState = new SystemWithStates(id, system);
        if (fixedTimeStep) {
            this.fixedTimeStepSystems.push(id, sysWState);
        }
        else {
            this.nonFixedTimeStepSystems.push(id, sysWState);
        }
        return id;
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
        var stringName = system.constructor.name;
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
            // if already an instance of this system
            if (k.indexOf(className) === 0) {
                res.push(k);
            }
        });
        this.nonFixedTimeStepSystems.keys.forEach(function (s, k) {
            // if already an instance of this system
            if (k.indexOf(className) === 0) {
                res.push(k);
            }
        });
        return res;
    };
    SystemManager.prototype.orderSystem = function () {
    };
    return SystemManager;
}());
exports.SystemManager = SystemManager;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(13);
var TimeMeasure = /** @class */ (function () {
    function TimeMeasure(id) {
        this.performance = window.performance;
        this._min = Number.MAX_VALUE;
        this._max = 0;
        this._mean = 0;
        this.buildMark(id);
    }
    TimeMeasure.prototype.buildMark = function (id) {
        this._id = id;
        this._startingMark = id + "-start";
        this._endingMark = id + "-end";
    };
    TimeMeasure.prototype.placeStartMark = function () {
        this.performance.mark(this._startingMark);
    };
    TimeMeasure.prototype.placeEndingMark = function () {
        this.performance.mark(this._endingMark);
    };
    TimeMeasure.prototype.measure = function () {
        this.performance.measure(this._id, this._startingMark, this._endingMark);
    };
    TimeMeasure.prototype.clearData = function () {
        this.performance.clearMeasures(this._id);
    };
    /* Set the max, min, and mean value from the performance.measure data set */
    TimeMeasure.prototype.computeData = function () {
        var measures = this.performance.getEntriesByName(this._id);
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
        this._mean = mean;
        this._max = max;
        this._min = min;
    };
    Object.defineProperty(TimeMeasure.prototype, "data", {
        get: function () {
            return this.performance.getEntriesByName(this._id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeMeasure.prototype, "mean", {
        get: function () {
            return this._mean;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeMeasure.prototype, "min", {
        get: function () {
            return this._min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeMeasure.prototype, "max", {
        get: function () {
            return this._max;
        },
        enumerable: true,
        configurable: true
    });
    return TimeMeasure;
}());
exports.TimeMeasure = TimeMeasure;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * User Timing polyfill (http://www.w3.org/TR/user-timing/)
 * @author RubaXa <trash@rubaxa.org>
 */
(function (scope){
	var
		  startOffset = Date.now ? Date.now() : +(new Date)
		, performance = scope.performance || {}

		, _entries = []
		, _marksIndex = {}

		, _filterEntries = function (key, value){
			var i = 0, n = _entries.length, result = [];
			for( ; i < n; i++ ){
				if( _entries[i][key] == value ){
					result.push(_entries[i]);
				}
			}
			return	result;
		}

		, _clearEntries = function (type, name){
			var i = _entries.length, entry;
			while( i-- ){
				entry = _entries[i];
				if( entry.entryType == type && (name === void 0 || entry.name == name) ){
					_entries.splice(i, 1);
				}
			}
		}
	;


	if( !performance.now ){
		performance.now = performance.webkitNow || performance.mozNow || performance.msNow || function (){
			return (Date.now ? Date.now() : +(new Date)) - startOffset;
		};
	}


	if( !performance.mark ){
		performance.mark = performance.webkitMark || function (name){
			var mark = {
				  name:			name
				, entryType:	'mark'
				, startTime:	performance.now()
				, duration:		0
			};
			_entries.push(mark);
			_marksIndex[name] = mark;
		};
	}


	if( !performance.measure ){
		performance.measure = performance.webkitMeasure || function (name, startMark, endMark){
			startMark	= _marksIndex[startMark].startTime;
			endMark		= _marksIndex[endMark].startTime;

			_entries.push({
				  name:			name
				, entryType:	'measure'
				, startTime:	startMark
				, duration:		endMark - startMark
			});
		};
	}


	if( !performance.getEntriesByType ){
		performance.getEntriesByType = performance.webkitGetEntriesByType || function (type){
			return _filterEntries('entryType', type);
		};
	}


	if( !performance.getEntriesByName ){
		performance.getEntriesByName = performance.webkitGetEntriesByName || function (name){
			return _filterEntries('name', name);
		};
	}


	if( !performance.clearMarks ){
		performance.clearMarks = performance.webkitClearMarks || function (name){
			_clearEntries('mark', name);
		};
	}


	if( !performance.clearMeasures ){
		performance.clearMeasures = performance.webkitClearMeasures || function (name){
			_clearEntries('measure', name);
		};
	}


	// exports
	scope.performance = performance;

	if( true ){
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function (){ return performance }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})(self);


/***/ })
/******/ ]);
});