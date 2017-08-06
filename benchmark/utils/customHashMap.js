"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FastHashMap = (function () {
    function FastHashMap() {
        this._values = [];
        this._keys = new Map();
    }
    FastHashMap.prototype.clear = function () {
        this._keys.clear();
        this._values = [];
    };
    FastHashMap.prototype.delete = function (key) {
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
    FastHashMap.prototype.get = function (key) {
        return this._values[this._keys.get(key)];
    };
    FastHashMap.prototype.has = function (key) {
        return this._keys.has(key);
    };
    FastHashMap.prototype.insertValue = function (key, value, index) {
        return this._values.splice(index, 0, value);
    };
    FastHashMap.prototype.offsetIndexInKeys = function (after, offsetVal) {
        var mapIter = this._keys.entries();
        var l = this._keys.size;
        for (var i = 0; i < l; ++i) {
            var e = mapIter.next().value;
            if (e[1] > after) {
                this._keys.set(e[0], e[1] += offsetVal);
            }
        }
    };
    FastHashMap.prototype.insertAfter = function (key, value, keyRef) {
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
    FastHashMap.prototype.insertBefore = function (key, value, keyRef) {
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
    FastHashMap.prototype.keys = function () {
        return this._keys;
    };
    FastHashMap.prototype.set = function (key, value) {
        var l = this._values.push(value);
        this._keys.set(key, l - 1);
    };
    Object.defineProperty(FastHashMap.prototype, "size", {
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    FastHashMap.prototype.values = function () {
        return this._values;
    };
    return FastHashMap;
}());
exports.FastHashMap = FastHashMap;
