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
var XArray = (function () {
    function XArray() {
        Array.apply(this, arguments);
        return new Array();
    }
    XArray.prototype.push = function (val) { return 0; };
    ;
    return XArray;
}());
//Adding Arrray to XArray prototype chain.
XArray["prototype"] = new Array();
var FastHashMap = (function (_super) {
    __extends(FastHashMap, _super);
    // protected _values: V[];
    function FastHashMap() {
        var _this = _super.call(this) || this;
        _this.test = function () {
            console.log("t");
        };
        _this.clear = function () {
            this._keys.clear();
            while (this.length > 0) {
                this.pop();
            }
        };
        _this.delete = function (key) {
            var i = this._keys.get(key);
            var r = this._keys.delete(key);
            this.offsetIndexInKeys(i, -1);
            var r2 = this.splice(i, 1);
            if (r2.length > 0 && r) {
                return true;
            }
            else {
                return false;
            }
        };
        _this.forEach = function (callBack) {
            var l = this.length;
            for (var i = 0; i < l; ++i) {
                callBack(this[i]);
            }
        };
        _this.get = function (key) {
            return this[this._keys.get(key)];
        };
        _this.has = function (key) {
            return this._keys.has(key);
        };
        _this.insertValue = function (key, value, index) {
            return this.splice(index, 0, value);
        };
        _this.offsetIndexInKeys = function (after, offsetVal) {
            var mapIter = this._keys.entries();
            var l = this._keys.size;
            for (var i = 0; i < l; ++i) {
                var e = mapIter.next().value;
                if (e[1] > after) {
                    this._keys.set(e[0], e[1] += offsetVal);
                }
            }
        };
        _this.insertAfter = function (key, value, keyRef) {
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
        _this.insertBefore = function (key, value, keyRef) {
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
        _this.keys = function () {
            return this._keys;
        };
        _this.push = function (key, value) {
            if (value === undefined) {
                return;
            }
            arguments[0] = value;
            arguments.length = 1;
            var l = Array.prototype.push.apply(this, arguments);
            this._keys.set(key, l - 1);
            return this.length;
        };
        _this.set = function (key, value) {
            this.push(key, value);
            return this.length;
        };
        _this._keys = new Map();
        return _this;
    }
    return FastHashMap;
}(Array));
exports.FastHashMap = FastHashMap;
