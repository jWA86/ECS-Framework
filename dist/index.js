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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var isNode = new Function("try {return this===global;}catch(e){return false;}");
var TIMESTAMP = window.performance && window.performance.now ? window.performance : Date;
exports.TIMESTAMP = TIMESTAMP;
var RANDOM = {
    decimal: function (max) { return Math.random() * max; },
    integer: function (max) { return Math.floor(Math.random() * max); },
};
exports.RANDOM = RANDOM;
var GLOBAL = isBrowser() ? window : isNode() ? global : new Error("Unknow environment");
exports.GLOBAL = GLOBAL;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

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
/* 4 */
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
            this._fixedTSSystems = this._systemManager.getFixedTSSystemsArray();
            this._nonFixedTSSystems = this._systemManager.getNonFixedTSSystemsArray();
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
        this._currentTimer.lastFrame = pollyFill_1.TIMESTAMP.now();
        this.loop.apply(this, args);
    };
    GameLoop.prototype.pause = function () {
        this._running = false;
        cancelAnimationFrame(this._frameId);
    };
    GameLoop.prototype.stop = function () {
        this.pause();
        this._currentTimer.reset();
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FastIterationMap_1 = __webpack_require__(1);
// Comment forcer l'implementation des noms de parametres lors de l'heritage/ implementation
var System = /** @class */ (function () {
    function System() {
        this.active = true;
        this.initialized = false;
    }
    System.prototype.init = function () {
        this._parametersSource = new FastIterationMap_1.FastIterationMap();
        this.extractingParametersKeys();
        this.initialized = true;
    };
    Object.defineProperty(System.prototype, "parameters", {
        get: function () {
            return this._parameters;
        },
        set: function (val) {
            // to implement
            this._parameters = val;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(System.prototype, "parametersSource", {
        get: function () {
            if (!this.initialized) {
                this.init();
            }
            return this._parametersSource;
        },
        enumerable: true,
        configurable: true
    });
    System.prototype.process = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Holds currently process component
        var params = this._parameters;
        // const flist = this.factories;
        var flist = this._parametersSource.values;
        // flist.length = this.keys.length
        var nbComponent = flist[0].source.activeLength;
        var f = flist[0].source.values;
        for (var i = 0; i < nbComponent; ++i) {
            // get the component from the first factory that serve as a reference
            // if it is active query the other components
            var refComponent = f[i];
            if (refComponent.active) {
                params[flist[0].key] = refComponent;
                var isFound = true;
                // Iterate others factories to query rest of the components
                for (var j = 1; j < flist.length; ++j) {
                    // If the factory is the same as the factory that serve as a reference
                    // we push the same component to the args array,
                    // otherwise we query the component though get(entityId)
                    if (flist[j] === flist[0]) {
                        params[flist[j].key] = refComponent;
                    }
                    else {
                        var c = flist[j].source.get(refComponent.entityId);
                        if (!c) {
                            isFound = false;
                            break;
                        }
                        params[flist[j].key] = c;
                    }
                }
                if (isFound) {
                    this.execute.apply(this, [params].concat(args));
                }
            }
        }
    };
    System.prototype.setParamSource = function (paramKey, pool) {
        if (!this.initialized) {
            this.init();
        }
        // set the same source to every parameters if the key is *
        if (paramKey === "*") {
            this._parametersSource.values.forEach(function (p) {
                p.source = pool;
            });
        }
        else if (!this._parametersSource.has(paramKey)) {
            throw Error("Parameter name '" + paramKey + "' is not a parameter of the system.");
        }
        this._parametersSource.set(paramKey, { key: paramKey, source: pool });
    };
    /** Extract parameters key from the parameter object */
    System.prototype.extractingParametersKeys = function () {
        var _this = this;
        var keys = Object.keys(this._parameters);
        keys.forEach(function (k) {
            _this._parametersSource.set(k, { key: k, source: undefined });
        });
    };
    return System;
}());
exports.System = System;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FastIterationMap_1 = __webpack_require__(1);
var pollyFill_1 = __webpack_require__(0);
// fixedTimeStep = frame independant // https://docs.unity3d.com/Manual/class-TimeManager.html
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
        return this.fixedTimeStepSystems;
    };
    SystemManager.prototype.getNonFixedTSSystems = function () {
        return this.nonFixedTimeStepSystems;
    };
    SystemManager.prototype.getFixedTSSystemsArray = function () {
        return this.fixedTimeStepSystems.values;
    };
    SystemManager.prototype.getNonFixedTSSystemsArray = function () {
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TM_POOL_SIZE = 30;
exports.TM_POOL_SIZE = TM_POOL_SIZE;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentFactory_1 = __webpack_require__(2);
exports.ComponentFactory = ComponentFactory_1.ComponentFactory;
var EntityFactory_1 = __webpack_require__(3);
exports.EntityFactory = EntityFactory_1.EntityFactory;
var GameLoop_1 = __webpack_require__(4);
exports.GameLoop = GameLoop_1.GameLoop;
var Graphics_1 = __webpack_require__(11);
exports.Graphics = Graphics_1.Graphics;
var interfaces = __webpack_require__(12);
exports.interfaces = interfaces;
var pollyFill_1 = __webpack_require__(0);
exports.RANDOM = pollyFill_1.RANDOM;
exports.TIMESTAMP = pollyFill_1.TIMESTAMP;
var Project_1 = __webpack_require__(13);
exports.Project = Project_1.Project;
var System_1 = __webpack_require__(5);
exports.System = System_1.System;
var SystemManager_1 = __webpack_require__(6);
exports.SystemManager = SystemManager_1.SystemManager;
var DEFAULT_CONF = __webpack_require__(7);
exports.DEFAULT_CONF = DEFAULT_CONF;
var HtmlInterface_1 = __webpack_require__(15);
exports.HtmlInterface = HtmlInterface_1.HtmlInterface;
var TimeMeasureUtil_1 = __webpack_require__(16);
exports.TimeMeasureComponent = TimeMeasureUtil_1.TimeMeasureComponent;
exports.TimeMeasureSystem = TimeMeasureUtil_1.TimeMeasureSystem;
exports.TimeMeasureSystemEndMark = TimeMeasureUtil_1.TimeMeasureSystemEndMark;
exports.TimeMeasureSystemStartMark = TimeMeasureUtil_1.TimeMeasureSystemStartMark;
exports.TimeMeasureUtil = TimeMeasureUtil_1.TimeMeasureUtil;


/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Graphics = /** @class */ (function () {
    function Graphics(_canvasId, _renderingContext) {
        this._canvasId = _canvasId;
        this._renderingContext = _renderingContext;
    }
    Graphics.prototype.initCanvas = function () {
        this._canvas = document.getElementById(this._canvasId);
        this._context = this._canvas.getContext(this._renderingContext);
    };
    Object.defineProperty(Graphics.prototype, "canvasId", {
        // protected getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext {
        //     return canvas.getContext("2d");
        // }
        get: function () {
            return this._canvasId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    return Graphics;
}());
exports.Graphics = Graphics;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FastIterationMap_1 = __webpack_require__(1);
var Mousetrap = __webpack_require__(14);
var ComponentFactory_1 = __webpack_require__(2);
var EntityFactory_1 = __webpack_require__(3);
var GameLoop_1 = __webpack_require__(4);
var pollyFill_1 = __webpack_require__(0);
var System_1 = __webpack_require__(5);
var SystemManager_1 = __webpack_require__(6);
var Project = /** @class */ (function () {
    function Project(_projectName, dependencies) {
        this._projectName = _projectName;
        var sysM = new SystemManager_1.SystemManager();
        this.gameLoop = new GameLoop_1.GameLoop(sysM);
        this.poolManager = new FastIterationMap_1.FastIterationMap();
        this.factories = new FastIterationMap_1.FastIterationMap();
        this.systemManager = sysM;
        this._dependencies = dependencies || [];
        this.keyboardShortCut = Mousetrap;
        pollyFill_1.GLOBAL[this._projectName] = this;
        this.exposeCore();
        this.exposeDependencies(this._dependencies);
        this.utils = new Map();
    }
    Project.prototype.clear = function () {
        this.gameLoop.stop();
        this.gameLoop.systemManager = undefined;
        this.systemManager = undefined;
        this.poolManager = undefined;
        if (pollyFill_1.GLOBAL) {
            pollyFill_1.GLOBAL[this._projectName] = undefined;
            try {
                delete pollyFill_1.GLOBAL[this._projectName];
                this._dependencies.forEach(function (d) {
                    pollyFill_1.GLOBAL[d.name] = undefined;
                    delete pollyFill_1.GLOBAL[d.name];
                });
            }
            catch (e) {
                throw e;
            }
        }
    };
    Project.prototype.exposeCore = function () {
        pollyFill_1.GLOBAL["ComponentFactory"] = ComponentFactory_1.ComponentFactory;
        pollyFill_1.GLOBAL["System"] = System_1.System;
        pollyFill_1.GLOBAL["EntityFactory"] = EntityFactory_1.EntityFactory;
    };
    Project.prototype.exposeDependencies = function (dependencies) {
        dependencies.forEach(function (d) {
            pollyFill_1.GLOBAL[d.name] = d.object;
        });
    };
    Object.defineProperty(Project.prototype, "projectName", {
        get: function () {
            return this._projectName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "dependencies", {
        /** Class that could be instantiate after the project has started */
        get: function () {
            return this._dependencies;
        },
        enumerable: true,
        configurable: true
    });
    return Project;
}());
exports.Project = Project;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*global define:false */
/**
 * Copyright 2012-2017 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.6.1
 * @url craig.is/killing/mice
 */
(function(window, document, undefined) {

    // Check if mousetrap is used inside browser, if not, return
    if (!window) {
        return;
    }

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        20: 'capslock',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'ins',
        46: 'del',
        91: 'meta',
        93: 'meta',
        224: 'meta'
    };

    /**
     * mapping for special characters so they can support
     *
     * this dictionary is only used incase you want to bind a
     * keyup or keydown event to one of these keys
     *
     * @type {Object}
     */
    var _KEYCODE_MAP = {
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111 : '/',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    };

    /**
     * this is a mapping of keys that require shift on a US keypad
     * back to the non shift equivelents
     *
     * this is so you can use keyup events with these keys
     *
     * note that this will only work reliably on US keyboards
     *
     * @type {Object}
     */
    var _SHIFT_MAP = {
        '~': '`',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
        '_': '-',
        '+': '=',
        ':': ';',
        '\"': '\'',
        '<': ',',
        '>': '.',
        '?': '/',
        '|': '\\'
    };

    /**
     * this is a list of special strings you can use to map
     * to modifier keys when you specify your keyboard shortcuts
     *
     * @type {Object}
     */
    var _SPECIAL_ALIASES = {
        'option': 'alt',
        'command': 'meta',
        'return': 'enter',
        'escape': 'esc',
        'plus': '+',
        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
    };

    /**
     * variable to store the flipped version of _MAP from above
     * needed to check if we should use keypress or not when no action
     * is specified
     *
     * @type {Object|undefined}
     */
    var _REVERSE_MAP;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {

        // This needs to use a string cause otherwise since 0 is falsey
        // mousetrap will never fire for numpad 0 pressed as part of a keydown
        // event.
        //
        // @see https://github.com/ccampbell/mousetrap/pull/258
        _MAP[i + 96] = i.toString();
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            var character = String.fromCharCode(e.which);

            // if the shift key is not pressed then it is safe to assume
            // that we want the character to be lowercase.  this means if
            // you accidentally have caps lock on then your key bindings
            // will continue to work
            //
            // the only side effect that might not be desired is if you
            // bind something like 'A' cause you want to trigger an
            // event when capital A is pressed caps lock will no longer
            // trigger the event.  shift+a will though.
            if (!e.shiftKey) {
                character = character.toLowerCase();
            }

            return character;
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map

        // with keydown and keyup events the character seems to always
        // come in as an uppercase character whether you are pressing shift
        // or not.  we should make sure it is always lowercase for comparisons
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            return;
        }

        e.returnValue = false;
    }

    /**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
            return;
        }

        e.cancelBubble = true;
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
    function _keysFromString(combination) {
        if (combination === '+') {
            return ['+'];
        }

        combination = combination.replace(/\+{2}/g, '+plus');
        return combination.split('+');
    }

    /**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
    function _getKeyInfo(combination, action) {
        var keys;
        var key;
        var i;
        var modifiers = [];

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = _keysFromString(combination);

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        return {
            key: key,
            modifiers: modifiers,
            action: action
        };
    }

    function _belongsTo(element, ancestor) {
        if (element === null || element === document) {
            return false;
        }

        if (element === ancestor) {
            return true;
        }

        return _belongsTo(element.parentNode, ancestor);
    }

    function Mousetrap(targetElement) {
        var self = this;

        targetElement = targetElement || document;

        if (!(self instanceof Mousetrap)) {
            return new Mousetrap(targetElement);
        }

        /**
         * element to attach key events to
         *
         * @type {Element}
         */
        self.target = targetElement;

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        self._callbacks = {};

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        self._directMap = {};

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        var _sequenceLevels = {};

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        var _resetTimer;

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        var _ignoreNextKeyup = false;

        /**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
        var _ignoreNextKeypress = false;

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        var _nextExpectedAction = false;

        /**
         * resets all sequence counters except for the ones passed in
         *
         * @param {Object} doNotReset
         * @returns void
         */
        function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};

            var activeSequences = false,
                key;

            for (key in _sequenceLevels) {
                if (doNotReset[key]) {
                    activeSequences = true;
                    continue;
                }
                _sequenceLevels[key] = 0;
            }

            if (!activeSequences) {
                _nextExpectedAction = false;
            }
        }

        /**
         * finds all callbacks that match based on the keycode, modifiers,
         * and action
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event|Object} e
         * @param {string=} sequenceName - name of the sequence we are looking for
         * @param {string=} combination
         * @param {number=} level
         * @returns {Array}
         */
        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i;
            var callback;
            var matches = [];
            var action = e.type;

            // if there are no events related to this keycode
            if (!self._callbacks[character]) {
                return [];
            }

            // if a modifier key is coming up on its own we should allow it
            if (action == 'keyup' && _isModifier(character)) {
                modifiers = [character];
            }

            // loop through all callbacks for the key that was pressed
            // and see if any of them match
            for (i = 0; i < self._callbacks[character].length; ++i) {
                callback = self._callbacks[character][i];

                // if a sequence name is not specified, but this is a sequence at
                // the wrong level then move onto the next match
                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                    continue;
                }

                // if the action we are looking for doesn't match the action we got
                // then we should keep going
                if (action != callback.action) {
                    continue;
                }

                // if this is a keypress event and the meta key and control key
                // are not pressed that means that we need to only look at the
                // character, otherwise check the modifiers as well
                //
                // chrome will not fire a keypress if meta or control is down
                // safari will fire a keypress if meta or meta+shift is down
                // firefox will fire a keypress if meta or control is down
                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                    // when you bind a combination or sequence a second time it
                    // should overwrite the first one.  if a sequenceName or
                    // combination is specified in this call it does just that
                    //
                    // @todo make deleting its own method?
                    var deleteCombo = !sequenceName && callback.combo == combination;
                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                    if (deleteCombo || deleteSequence) {
                        self._callbacks[character].splice(i, 1);
                    }

                    matches.push(callback);
                }
            }

            return matches;
        }

        /**
         * actually calls the callback function
         *
         * if your callback function returns false this will use the jquery
         * convention - prevent default and stop propogation on the event
         *
         * @param {Function} callback
         * @param {Event} e
         * @returns void
         */
        function _fireCallback(callback, e, combo, sequence) {

            // if this event should not happen stop here
            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
                return;
            }

            if (callback(e, combo) === false) {
                _preventDefault(e);
                _stopPropagation(e);
            }
        }

        /**
         * handles a character key event
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event} e
         * @returns void
         */
        self._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;

            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
            for (i = 0; i < callbacks.length; ++i) {
                if (callbacks[i].seq) {
                    maxLevel = Math.max(maxLevel, callbacks[i].level);
                }
            }

            // loop through matching callbacks for this key event
            for (i = 0; i < callbacks.length; ++i) {

                // fire for all sequence callbacks
                // this is because if for example you have multiple sequences
                // bound such as "g i" and "g t" they both need to fire the
                // callback for matching g cause otherwise you can only ever
                // match the first one
                if (callbacks[i].seq) {

                    // only fire callbacks for the maxLevel to prevent
                    // subsequences from also firing
                    //
                    // for example 'a option b' should not cause 'option b' to fire
                    // even though 'option b' is part of the other sequence
                    //
                    // any sequences that do not match here will be discarded
                    // below by the _resetSequences call
                    if (callbacks[i].level != maxLevel) {
                        continue;
                    }

                    processedSequenceCallback = true;

                    // keep a list of which sequences were matches for later
                    doNotReset[callbacks[i].seq] = 1;
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                    continue;
                }

                // if there were no sequence matches but we are still here
                // that means this is a regular match so we should fire that
                if (!processedSequenceCallback) {
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
                }
            }

            // if the key you pressed matches the type of sequence without
            // being a modifier (ie "keyup" or "keypress") then we should
            // reset all sequences that were not matched by this event
            //
            // this is so, for example, if you have the sequence "h a t" and you
            // type "h e a r t" it does not match.  in this case the "e" will
            // cause the sequence to reset
            //
            // modifier keys are ignored because you can have a sequence
            // that contains modifiers such as "enter ctrl+space" and in most
            // cases the modifier key will be pressed before the next key
            //
            // also if you have a sequence such as "ctrl+b a" then pressing the
            // "b" key will trigger a "keypress" and a "keydown"
            //
            // the "keydown" is expected when there is a modifier, but the
            // "keypress" ends up matching the _nextExpectedAction since it occurs
            // after and that causes the sequence to reset
            //
            // we ignore keypresses in a sequence that directly follow a keydown
            // for the same character
            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
                _resetSequences(doNotReset);
            }

            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
        };

        /**
         * handles a keydown event
         *
         * @param {Event} e
         * @returns void
         */
        function _handleKeyEvent(e) {

            // normalize e.which for key events
            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
            if (typeof e.which !== 'number') {
                e.which = e.keyCode;
            }

            var character = _characterFromEvent(e);

            // no character found then stop
            if (!character) {
                return;
            }

            // need to use === for the character check because the character can be 0
            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
                _ignoreNextKeyup = false;
                return;
            }

            self.handleKey(character, _eventModifiers(e), e);
        }

        /**
         * called to set a 1 second timeout on the specified sequence
         *
         * this is so after each key press in the sequence you have 1 second
         * to press the next key before you have to start over
         *
         * @returns void
         */
        function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1000);
        }

        /**
         * binds a key sequence to an event
         *
         * @param {string} combo - combo specified in bind call
         * @param {Array} keys
         * @param {Function} callback
         * @param {string=} action
         * @returns void
         */
        function _bindSequence(combo, keys, callback, action) {

            // start off by adding a sequence level record for this combination
            // and setting the level to 0
            _sequenceLevels[combo] = 0;

            /**
             * callback to increase the sequence level for this sequence and reset
             * all other sequences that were active
             *
             * @param {string} nextAction
             * @returns {Function}
             */
            function _increaseSequence(nextAction) {
                return function() {
                    _nextExpectedAction = nextAction;
                    ++_sequenceLevels[combo];
                    _resetSequenceTimer();
                };
            }

            /**
             * wraps the specified callback inside of another function in order
             * to reset all sequence counters as soon as this sequence is done
             *
             * @param {Event} e
             * @returns void
             */
            function _callbackAndReset(e) {
                _fireCallback(callback, e, combo);

                // we should ignore the next key up if the action is key down
                // or keypress.  this is so if you finish a sequence and
                // release the key the final key will not trigger a keyup
                if (action !== 'keyup') {
                    _ignoreNextKeyup = _characterFromEvent(e);
                }

                // weird race condition if a sequence ends with the key
                // another sequence begins with
                setTimeout(_resetSequences, 10);
            }

            // loop through keys one at a time and bind the appropriate callback
            // function.  for any key leading up to the final one it should
            // increase the sequence. after the final, it should reset all sequences
            //
            // if an action is specified in the original bind call then that will
            // be used throughout.  otherwise we will pass the action that the
            // next key in the sequence should match.  this allows a sequence
            // to mix and match keypress and keydown events depending on which
            // ones are better suited to the key provided
            for (var i = 0; i < keys.length; ++i) {
                var isFinal = i + 1 === keys.length;
                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
                _bindSingle(keys[i], wrappedCallback, action, combo, i);
            }
        }

        /**
         * binds a single keyboard combination
         *
         * @param {string} combination
         * @param {Function} callback
         * @param {string=} action
         * @param {string=} sequenceName - name of sequence if part of sequence
         * @param {number=} level - what part of the sequence the command is
         * @returns void
         */
        function _bindSingle(combination, callback, action, sequenceName, level) {

            // store a direct mapped reference for use with Mousetrap.trigger
            self._directMap[combination + ':' + action] = callback;

            // make sure multiple spaces in a row become a single space
            combination = combination.replace(/\s+/g, ' ');

            var sequence = combination.split(' ');
            var info;

            // if this pattern is a sequence of keys then run through this method
            // to reprocess each pattern one key at a time
            if (sequence.length > 1) {
                _bindSequence(combination, sequence, callback, action);
                return;
            }

            info = _getKeyInfo(combination, action);

            // make sure to initialize array if this is the first time
            // a callback is added for this key
            self._callbacks[info.key] = self._callbacks[info.key] || [];

            // remove an existing match if there is one
            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

            // add this call back to the array
            // if it is a sequence put it at the beginning
            // if not put it at the end
            //
            // this is important because the way these are processed expects
            // the sequence ones to come first
            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
                callback: callback,
                modifiers: info.modifiers,
                action: info.action,
                seq: sequenceName,
                level: level,
                combo: combination
            });
        }

        /**
         * binds multiple combinations to the same callback
         *
         * @param {Array} combinations
         * @param {Function} callback
         * @param {string|undefined} action
         * @returns void
         */
        self._bindMultiple = function(combinations, callback, action) {
            for (var i = 0; i < combinations.length; ++i) {
                _bindSingle(combinations[i], callback, action);
            }
        };

        // start!
        _addEvent(targetElement, 'keypress', _handleKeyEvent);
        _addEvent(targetElement, 'keydown', _handleKeyEvent);
        _addEvent(targetElement, 'keyup', _handleKeyEvent);
    }

    /**
     * binds an event to mousetrap
     *
     * can be a single key, a combination of keys separated with +,
     * an array of keys, or a sequence of keys separated by spaces
     *
     * be sure to list the modifier keys first to make sure that the
     * correct key ends up getting bound (the last key in the pattern)
     *
     * @param {string|Array} keys
     * @param {Function} callback
     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
     * @returns void
     */
    Mousetrap.prototype.bind = function(keys, callback, action) {
        var self = this;
        keys = keys instanceof Array ? keys : [keys];
        self._bindMultiple.call(self, keys, callback, action);
        return self;
    };

    /**
     * unbinds an event to mousetrap
     *
     * the unbinding sets the callback function of the specified key combo
     * to an empty function and deletes the corresponding key in the
     * _directMap dict.
     *
     * TODO: actually remove this from the _callbacks dictionary instead
     * of binding an empty function
     *
     * the keycombo+action has to be exactly the same as
     * it was defined in the bind method
     *
     * @param {string|Array} keys
     * @param {string} action
     * @returns void
     */
    Mousetrap.prototype.unbind = function(keys, action) {
        var self = this;
        return self.bind.call(self, keys, function() {}, action);
    };

    /**
     * triggers an event that has already been bound
     *
     * @param {string} keys
     * @param {string=} action
     * @returns void
     */
    Mousetrap.prototype.trigger = function(keys, action) {
        var self = this;
        if (self._directMap[keys + ':' + action]) {
            self._directMap[keys + ':' + action]({}, keys);
        }
        return self;
    };

    /**
     * resets the library back to its initial state.  this is useful
     * if you want to clear out the current keyboard shortcuts and bind
     * new ones - for example if you switch to another page
     *
     * @returns void
     */
    Mousetrap.prototype.reset = function() {
        var self = this;
        self._callbacks = {};
        self._directMap = {};
        return self;
    };

    /**
     * should we stop this event before firing off callbacks
     *
     * @param {Event} e
     * @param {Element} element
     * @return {boolean}
     */
    Mousetrap.prototype.stopCallback = function(e, element) {
        var self = this;

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        if (_belongsTo(element, self.target)) {
            return false;
        }

        // stop for input, select, and textarea
        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
    };

    /**
     * exposes _handleKey publicly so it can be overwritten by extensions
     */
    Mousetrap.prototype.handleKey = function() {
        var self = this;
        return self._handleKey.apply(self, arguments);
    };

    /**
     * allow custom key mappings
     */
    Mousetrap.addKeycodes = function(object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                _MAP[key] = object[key];
            }
        }
        _REVERSE_MAP = null;
    };

    /**
     * Init the global mousetrap functions
     *
     * This method is needed to allow the global mousetrap functions to work
     * now that mousetrap is a constructor function.
     */
    Mousetrap.init = function() {
        var documentMousetrap = Mousetrap(document);
        for (var method in documentMousetrap) {
            if (method.charAt(0) !== '_') {
                Mousetrap[method] = (function(method) {
                    return function() {
                        return documentMousetrap[method].apply(documentMousetrap, arguments);
                    };
                } (method));
            }
        }
    };

    Mousetrap.init();

    // expose mousetrap to the global object
    window.Mousetrap = Mousetrap;

    // expose as a common js module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Mousetrap;
    }

    // expose mousetrap as an AMD module
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return Mousetrap;
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// TO do , propriety to place it on top of the canvas
var HtmlInterface = /** @class */ (function () {
    function HtmlInterface(_htmlId, _url) {
        this._htmlId = _htmlId;
        this._url = _url;
        this._display = false;
    }
    /**
     * Insert the html object inside a container
     * @param placeHolderId html id of the container
     */
    HtmlInterface.prototype.install = function (placeHolderId, display) {
        this._placeHolderId = placeHolderId;
        var obj = "<object id=\"" + this._htmlId + "\" type=\"text/html\" data=\"" + this._url + "\"></object>";
        document.getElementById(placeHolderId).insertAdjacentHTML("afterbegin", obj);
        this.toggleDisplay(display);
    };
    /**
     * Remove the html object from the page
     */
    HtmlInterface.prototype.uninstall = function () {
        var parent = document.getElementById(this._placeHolderId);
        var content = document.getElementById(this._htmlId);
        parent.removeChild(content);
    };
    /**
     * Toggle css style : display: "none" || display: "initial"
     */
    HtmlInterface.prototype.toggleDisplay = function (val) {
        this._display = val || !this._display;
        document.getElementById(this._htmlId).style.display = this._display ? "initial" : "none";
    };
    /**
     *
     */
    HtmlInterface.prototype.modifyContent = function (url) {
        this._url = url;
        document.getElementById(this._htmlId).setAttribute("data", url);
        // change data in html
    };
    Object.defineProperty(HtmlInterface.prototype, "id", {
        get: function () {
            return this._htmlId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlInterface.prototype, "display", {
        get: function () {
            return this._display;
        },
        set: function (val) {
            this._display = val;
            this.toggleDisplay(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlInterface.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    return HtmlInterface;
}());
exports.HtmlInterface = HtmlInterface;


/***/ }),
/* 16 */
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
var DefaultConfig_1 = __webpack_require__(7);
/**
 * Component that holds time measure
 */
var TimeMeasureComponent = /** @class */ (function () {
    function TimeMeasureComponent(systemId, lastT, minT, maxT, meanT, nbCall, frequency) {
        if (frequency === void 0) { frequency = 1000; }
        this.systemId = systemId;
        this.lastT = lastT;
        this.minT = minT;
        this.maxT = maxT;
        this.meanT = meanT;
        this.nbCall = nbCall;
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
        this.timeMeasurePool = timeMeasurePool || new ComponentFactory_1.ComponentFactory(DefaultConfig_1.TM_POOL_SIZE, new TimeMeasureComponent("", 0, 0, 0, 0, 0, 0));
    }
    TimeMeasureUtil.prototype.install = function (systemIdToMeasure) {
        if (this.measures.has(systemIdToMeasure)) {
            throw Error("the system already have a time measure installed");
        }
        var measureId = systemIdToMeasure;
        var tmC = this.timeMeasurePool.create(this.timeMeasurePool.nbCreated + 1, true);
        tmC.systemId = measureId;
        var res = this.sysManager.insertAround(systemIdToMeasure, new TimeMeasureSystemStartMark(tmC), new TimeMeasureSystemEndMark(tmC));
        this.measures.set(measureId, { startSystem: res[0], endSystem: res[1], tmComponentId: tmC.entityId });
        return tmC;
    };
    /**
     * Remove TimeMeasure Systems from the SystemManager and free the TimeMeasure component
     */
    TimeMeasureUtil.prototype.uninstall = function (systemId) {
        var measure = this.measures.get(systemId);
        this.sysManager.remove(measure.startSystem);
        this.sysManager.remove(measure.endSystem);
        this.timeMeasurePool.free(measure.tmComponentId);
        this.measures.delete(systemId);
    };
    TimeMeasureUtil.prototype.getMeasures = function (systemId) {
        return TimeMeasureSystem.performance.getEntriesByName(systemId);
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
        this._parameters = {};
        this.startMark = "start" + this.tmComponent.systemId;
        this.endMark = "end" + this.tmComponent.systemId;
    }
    Object.defineProperty(TimeMeasureSystem.prototype, "parameters", {
        /** Not used */
        get: function () { return this._parameters; },
        enumerable: true,
        configurable: true
    });
    TimeMeasureSystem.prototype.setParamSource = function () { };
    TimeMeasureSystem.prototype.getMeasures = function () {
        return TimeMeasureSystem.performance.getEntriesByName(this.tmComponent.systemId);
    };
    /**
     * Set max, min mean and last measure to the TMComponent from the performance.measure data set
     */
    TimeMeasureSystem.prototype.computeData = function () {
        var measures = TimeMeasureSystem.performance.getEntriesByName(this.tmComponent.systemId);
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
        l > 0 ? this.tmComponent.lastT = measures[l - 1].duration : this.tmComponent.lastT = undefined;
    };
    TimeMeasureSystem.prototype.measure = function () {
        TimeMeasureSystem.performance.measure(this.tmComponent.systemId, this.startMark, this.endMark);
        this.tmComponent.nbCall += 1;
    };
    /**
     * Clear the measure data set
     */
    TimeMeasureSystem.prototype.clearMeasures = function () {
        TimeMeasureSystem.performance.clearMeasures(this.tmComponent.systemId);
        this.tmComponent.nbCall = 0;
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
    TimeMeasureSystemStartMark.prototype.process = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        TimeMeasureSystem.performance.mark(this.startMark);
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
    TimeMeasureSystemEndMark.prototype.process = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.execute(args[0]);
    };
    /**
     *  Measure time passed since the start mark and compute statistics if time.lag >= the specified frequency of computation
     */
    TimeMeasureSystemEndMark.prototype.execute = function (time) {
        TimeMeasureSystem.performance.mark(this.endMark);
        this.measure();
        if ((pollyFill_1.TIMESTAMP.now() - this.lastUpdate) >= this.tmComponent.frequency) {
            this.computeData();
            this.clearMeasures();
            this.lastUpdate = pollyFill_1.TIMESTAMP.now();
        }
    };
    return TimeMeasureSystemEndMark;
}(TimeMeasureSystem));
exports.TimeMeasureSystemEndMark = TimeMeasureSystemEndMark;


/***/ })
/******/ ]);
});