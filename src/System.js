"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//abstract class that iterate over the pool and execute every component
var System = (function () {
    function System() {
    }
    System.prototype.process = function (factory) {
        var l = factory.size;
        for (var i_1 = 0; i_1 < l; ++i_1) {
            this.execute(factory.pool.values[i_1]);
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
        for (var i_2 = 0; i_2 < l; ++i_2) {
            if (f[i_2].active) {
                this.execute(f.values[i_2]);
            }
        }
        ;
    };
    return TSystem;
}());
exports.TSystem = TSystem;
