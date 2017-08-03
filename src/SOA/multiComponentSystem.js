"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TupleComponentSystem = (function () {
    function TupleComponentSystem(factories) {
        this.factories = factories;
    }
    //get a tuple of components 
    //should be same number as the number of factories and in the order corresponding
    TupleComponentSystem.prototype.getComponents = function (ids) {
        var r = [];
        var l = this.factories.length;
        for (var i = 0; i < l; ++i) {
            r.push(this.factories[i].getComponent(ids.tuple[i]));
        }
        return r;
    };
    TupleComponentSystem.prototype.process = function (idsTuples) {
        var _this = this;
        var l = idsTuples.size;
        idsTuples.pool.forEach(function (tuple) {
            var t = _this.getComponents(tuple);
            _this.exec(t);
        });
    };
    return TupleComponentSystem;
}());
exports.TupleComponentSystem = TupleComponentSystem;
