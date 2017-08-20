"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//abstract class that iterate over the pool and execute every component
var System = (function () {
    function System() {
    }
    System.prototype.process = function (factory) {
        var l = factory.size;
        for (var i = 0; i < l; ++i) {
            this.execute(factory.pool.values[i]);
        }
        ;
    };
    return System;
}());
exports.System = System;
var TSystem = (function () {
    function TSystem() {
    }
    TSystem.prototype.process = function (factory) {
        var l = factory.size;
        var f = factory.pool.values;
        for (var i = 0; i < l; ++i) {
            if (f[i].active) {
                this.execute(f.values[i]);
            }
        }
        ;
    };
    return TSystem;
}());
exports.TSystem = TSystem;
