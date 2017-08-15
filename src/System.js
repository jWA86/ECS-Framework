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
//abstract class that iterate over the pool and execute ToggableComponent that have the active proprety setted to true
// for testing only, should use a ComponentFactory that separate active & inactive so we process only active components
var TSystem = (function () {
    function TSystem() {
    }
    TSystem.prototype.process = function (factory) {
        var l = factory.size;
        for (var i = 0; i < l; ++i) {
            if (factory.pool.values[i].active) {
                this.execute(factory.pool.values[i]);
            }
        }
        ;
    };
    return TSystem;
}());
exports.TSystem = TSystem;
