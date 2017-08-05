"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TupleComponent = (function () {
    function TupleComponent(id, tuple) {
        this.id = id;
        this.tuple = tuple;
    }
    return TupleComponent;
}());
exports.TupleComponent = TupleComponent;
var TupleComponentSystem = (function () {
    function TupleComponentSystem(firstFactory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.factories = [];
        this.factories.push(firstFactory);
        for (var i = 0; i < args.length; ++i) {
            this.factories.push(args[i]);
        }
    }
    //get a tuple of components 
    //should be same number as the number of factories and in the order corresponding
    TupleComponentSystem.prototype.getComponents = function (tComponent) {
        var r = [];
        var l = this.factories.length;
        for (var i = 0; i < l; ++i) {
            r.push(this.factories[i].getComponent(tComponent.tuple[i]));
        }
        return r;
    };
    TupleComponentSystem.prototype.process = function (tupleFactory) {
        var _this = this;
        var l = tupleFactory.size;
        tupleFactory.pool.forEach(function (tuple) {
            var t = _this.getComponents(tuple);
            _this.execute(t);
        });
    };
    return TupleComponentSystem;
}());
exports.TupleComponentSystem = TupleComponentSystem;
