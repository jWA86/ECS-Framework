(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ecs"] = factory();
	else
		root["ecs"] = factory();
})(this, function() {
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
var ComponentFactory_1 = __webpack_require__(2);
exports.ComponentFactory = ComponentFactory_1.ComponentFactory;
exports.EntityFactory = ComponentFactory_1.EntityFactory;
var System_1 = __webpack_require__(4);
exports.System = System_1.System;
exports.MultiParallelSystem = System_1.MultiParallelSystem;
exports.MultiNonParallelSystem = System_1.MultiNonParallelSystem;


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
var FastIterationMap_1 = __webpack_require__(3);
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
        _this._zeroedRef = new (componentType.bind.apply(componentType, [void 0, "zeroedCompRef", false].concat(args)))();
        _this._values.length = _this._size;
        for (var i = 0; i < _size; ++i) {
            _this.createZeroedComponentAt(i);
        }
        return _this;
    }
    ComponentFactory.prototype.createZeroedComponentAt = function (index) {
        this.recycle(index, this._zeroedRef);
        this._values[index].entityId = '0';
        this._values[index].active = false;
    };
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
        for (var i = 0; i < this.size; ++i) {
            this.values[i].active = value;
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
        toReplaceComp.entityId = entityId;
        toReplaceComp.active = active;
        // lastly increment the lastActiveIndex
        this.incrementCreatedLength(index);
        return this.values[index];
    };
    ComponentFactory.prototype.getIndexOfFirstAvailableSpot = function () {
        var l = this._values.length;
        for (var i = 0; i < l; ++i) {
            if (this._values[i].entityId === '0') {
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
    ComponentFactory.prototype.recycle = function (indexComponentToReplace, componentRef) {
        var _this = this;
        // parsing Date ?
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
var EntityFactory = (function () {
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
    EntityFactory.prototype.delete = function (entityId) {
        var d = true;
        this._factories.forEach(function (f) {
            if (!f.delete(entityId)) {
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
/* 3 */
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
})(this, function() {
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
    FastIterationMap.prototype.push = function (key, value) {
        var e = this._keys.get(key);
        //if the key doesn't exist add the element
        if (e === undefined) {
            var l = this._values.push(value);
            this._keys.set(key, l - 1);
        }
        else {
            //if the key is already there, update the value
            this._values[e] = value;
        }
        return this._values.length;
    };
    FastIterationMap.prototype.set = function (key, value) {
        return this.push(key, value);
    };
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
    return FastIterationMap;
}());
exports.FastIterationMap = FastIterationMap;


/***/ })
/******/ ]);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// are generics need here ?
var System = (function () {
    function System() {
    }
    System.prototype.process = function (factory) {
        var l = factory.iterationLength;
        var f = factory.values;
        for (var i = 0; i < l; ++i) {
            if (f[i].active) {
                this.execute(f[i]);
            }
        }
        ;
    };
    return System;
}());
exports.System = System;
// system that iterate on pool that have their values array set in parallel, ie: same entityId at same index, same number of components
// how to make sure they are parallel ? use a parent pool that .
// call in sync instead of parallel ?
var MultiParallelSystem = (function () {
    function MultiParallelSystem() {
    }
    MultiParallelSystem.prototype.process = function (factory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var l = factory.iterationLength;
        var f = factory.values;
        for (var i = 0; i < l; ++i) {
            if (f[i].active) {
                var arr = [];
                arr.push(f[i]);
                for (var j = 0; j < args.length; ++j) {
                    arr.push(args[j].values[i]);
                }
                this.execute.apply(null, arr);
            }
        }
        ;
    };
    return MultiParallelSystem;
}());
exports.MultiParallelSystem = MultiParallelSystem;
// non parallel pool, components are query by id (slower)
var MultiNonParallelSystem = (function () {
    function MultiNonParallelSystem() {
    }
    MultiNonParallelSystem.prototype.process = function (factory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var l = factory.iterationLength;
        var f = factory.values;
        for (var i = 0; i < l; ++i) {
            if (f[i].active) {
                var arr = [];
                arr.push(f[i]);
                var isFound = true;
                for (var j = 0; j < args.length; ++j) {
                    var c = args[j].get(f[i].entityId);
                    if (!c) {
                        isFound = false;
                        break;
                    }
                    arr.push(c);
                }
                if (isFound) {
                    this.execute.apply(null, arr);
                }
            }
        }
        ;
    };
    return MultiNonParallelSystem;
}());
exports.MultiNonParallelSystem = MultiNonParallelSystem;


/***/ })
/******/ ]);
});