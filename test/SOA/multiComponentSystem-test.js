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
require("mocha");
var chai_1 = require("chai");
var ComponentFactoryFastMap_1 = require("../../src/SOA/ComponentFactoryFastMap");
var MultiComponentSystem_1 = require("../../src/SOA/MultiComponentSystem");
var poolImpl = [{ "name": "fastMap", "impl": ComponentFactoryFastMap_1.ComponentFactoryFastMap }];
poolImpl.forEach(function (p) {
    describe("MultiComponentSystem with pool factory using " + p.name, function () {
        //for checking content of the pool whether it is a hashMap or array -> convert it to an array
        //ie: for checking order of elements in the map
        function poolToArray(factory) {
            var a = [];
            factory.pool.forEach(function (v) {
                a.push(v);
            });
            return a;
        }
        var ConcreteComponent = (function () {
            function ConcreteComponent(id) {
                this.id = id;
                this.val = 1;
            }
            return ConcreteComponent;
        }());
        var TupleComponent = (function () {
            function TupleComponent(id, tuple) {
                this.id = id;
                this.tuple = tuple;
            }
            return TupleComponent;
        }());
        var factories = [];
        var components1 = [];
        var components2 = [];
        var components3 = [];
        var MultiComponentSystem = (function (_super) {
            __extends(MultiComponentSystem, _super);
            function MultiComponentSystem(f1, f2, f3) {
                return _super.call(this, f1, f2, f3) || this;
            }
            //sum all components val to the first component val in the tuple
            MultiComponentSystem.prototype.execute = function (components) {
                var l = components.length;
                for (var i = 1; i < l; ++i) {
                    components[0].val += components[i].val;
                }
            };
            return MultiComponentSystem;
        }(MultiComponentSystem_1.TupleComponentSystem));
        var mCSystem;
        beforeEach(function () {
            var simpleFactory1 = new p.impl();
            var simpleFactory2 = new p.impl();
            var simpleFactory3 = new p.impl();
            factories = [];
            factories.push(simpleFactory1);
            factories.push(simpleFactory2);
            factories.push(simpleFactory3);
            components1 = [];
            components2 = [];
            components3 = [];
            mCSystem = new MultiComponentSystem(simpleFactory1, simpleFactory2, simpleFactory3);
            for (var i = 0; i < 10; ++i) {
                components1.push(simpleFactory1.createComponent(ConcreteComponent));
                components2.push(simpleFactory2.createComponent(ConcreteComponent));
                components3.push(simpleFactory3.createComponent(ConcreteComponent));
            }
        });
        it("should take an array of factories ref in constructor", function () {
            chai_1.expect(mCSystem.factories[0].getComponent(components1[0].id).id).to.equal(components1[0].id);
            chai_1.expect(mCSystem.factories[1].getComponent(components2[0].id).id).to.equal(components2[0].id);
            chai_1.expect(mCSystem.factories[2].getComponent(components3[0].id).id).to.equal(components3[0].id);
        });
        it("should be able to query components by ids in the proper factory ", function () {
            var tuples = new p.impl();
            var q = tuples.createComponent(TupleComponent, [components1[0].id, components2[0].id, components3[0].id]);
            var result = mCSystem.getComponents(q);
            chai_1.expect(result[0].id).to.equal(components1[0].id);
            chai_1.expect(result[1].id).to.equal(components2[0].id);
            chai_1.expect(result[2].id).to.equal(components3[0].id);
        });
        it("should be able to process all components tuples", function () {
            var tuples = new p.impl();
            for (var i = 0; i < 10; ++i) {
                chai_1.expect(components1[i].val).to.equal(1);
                chai_1.expect(components2[i].val).to.equal(1);
                chai_1.expect(components3[i].val).to.equal(1);
                var t = tuples.createComponent(TupleComponent, [components1[i].id, components2[i].id, components3[i].id]);
            }
            mCSystem.process(tuples);
            for (var i = 0; i < 10; ++i) {
                chai_1.expect(components1[i].val).to.equal(3);
            }
        });
    });
});
