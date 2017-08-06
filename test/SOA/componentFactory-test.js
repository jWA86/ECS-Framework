"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var ComponentFactoryMap_1 = require("../../src/SOA/ComponentFactoryMap");
var ComponentFactoryArray_1 = require("../../src/SOA/ComponentFactoryArray");
var ComponentFactoryFastMap_1 = require("../../src/SOA/ComponentFactoryFastMap");
var poolImpl = [{ "name": "array", "impl": ComponentFactoryArray_1.ComponentFactoryArray }, { "name": "map", "impl": ComponentFactoryMap_1.ComponentFactoryMap }, { "name": "fastMap", "impl": ComponentFactoryFastMap_1.ComponentFactoryFastMap }];
poolImpl.forEach(function (p) {
    describe("Component Factory with " + p.name, function () {
        //for checking content of the pool whether it is a hashMap or array -> convert it to an array
        //ie: for checking order of elements in the map
        function poolToArray(factory) {
            var a = [];
            factory.pool.forEach(function (v) {
                a.push(v);
            });
            return a;
        }
        var concreteComponent = (function () {
            function concreteComponent(id) {
                this.id = id;
            }
            return concreteComponent;
        }());
        var simpleFactory = new p.impl();
        beforeEach(function () {
            simpleFactory = new p.impl();
        });
        it("should generate an id of the component it creates", function () {
            var c = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(c.id).to.not.be.null;
            chai_1.expect(poolToArray(simpleFactory)[0].id).to.equal(c.id);
            var c2 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(c2.id).to.not.equal(c.id);
            chai_1.expect(poolToArray(simpleFactory)[1].id).to.equal(c2.id);
        });
        it("should hold components it instanciates in a pool", function () {
            var ids = [];
            for (var i = 0; i < 5; ++i) {
                var t = simpleFactory.createComponent(concreteComponent);
                ids.push(t);
            }
            chai_1.expect(simpleFactory.size).to.equal(5);
            var a = poolToArray(simpleFactory);
            for (var i = 0; i < 5; ++i) {
                chai_1.expect(a[i].id).to.equal(ids[i].id);
            }
        });
        it("should be able to retrieve a component by its id", function () {
            var c = simpleFactory.createComponent(concreteComponent);
            var c2 = simpleFactory.createComponent(concreteComponent);
            var fetchedC = simpleFactory.getComponent(c2.id);
            chai_1.expect(fetchedC.id).to.equal(c2.id);
            //undefined if id not found
            var fetchedC2 = simpleFactory.getComponent("123456-abc");
            chai_1.expect(fetchedC2).to.equal(undefined);
        });
        it("should be able to insert a component after another one in pool", function () {
            var t = simpleFactory.createComponent(concreteComponent);
            var t2 = simpleFactory.createComponent(concreteComponent);
            var t3 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            chai_1.expect(poolToArray(simpleFactory)[1].id).to.equal(t2.id);
            chai_1.expect(poolToArray(simpleFactory)[2].id).to.equal(t3.id);
            //inserted t4 should be after t2
            var t4 = simpleFactory.createComponentAfter(concreteComponent, t2.id);
            chai_1.expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            chai_1.expect(poolToArray(simpleFactory)[1].id).to.equal(t2.id);
            chai_1.expect(poolToArray(simpleFactory)[2].id).to.equal(t4.id);
            chai_1.expect(poolToArray(simpleFactory)[3].id).to.equal(t3.id);
        });
        it("should be able to insert a component before another one in pool", function () {
            var t = simpleFactory.createComponent(concreteComponent);
            var t2 = simpleFactory.createComponent(concreteComponent);
            var t3 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            chai_1.expect(poolToArray(simpleFactory)[1].id).to.equal(t2.id);
            chai_1.expect(poolToArray(simpleFactory)[2].id).to.equal(t3.id);
            //inserted t4 should be before t2
            var t4 = simpleFactory.createComponentBefore(concreteComponent, t2.id);
            chai_1.expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            chai_1.expect(poolToArray(simpleFactory)[1].id).to.equal(t4.id);
            chai_1.expect(poolToArray(simpleFactory)[2].id).to.equal(t2.id);
            chai_1.expect(poolToArray(simpleFactory)[3].id).to.equal(t3.id);
        });
        it("should be able to remove a component from the pool and keep the same order", function () {
            var t = simpleFactory.createComponent(concreteComponent);
            var t2 = simpleFactory.createComponent(concreteComponent);
            var t3 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(simpleFactory.size).to.equal(3);
            chai_1.expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            chai_1.expect(poolToArray(simpleFactory)[1].id).to.equal(t2.id);
            chai_1.expect(poolToArray(simpleFactory)[2].id).to.equal(t3.id);
            simpleFactory.removeComponent(t2.id);
            chai_1.expect(simpleFactory.size).to.equal(2);
            chai_1.expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            chai_1.expect(poolToArray(simpleFactory)[1].id).to.equal(t3.id);
            simpleFactory.removeComponent(t.id);
            chai_1.expect(simpleFactory.size).to.equal(1);
            chai_1.expect(poolToArray(simpleFactory)[0].id).to.equal(t3.id);
            simpleFactory.removeComponent(t3.id);
            chai_1.expect(simpleFactory.size).to.equal(0);
        });
        it("should be able to remove all components from the pool", function () {
            //remove ref from the pool
            var t = simpleFactory.createComponent(concreteComponent);
            var t2 = simpleFactory.createComponent(concreteComponent);
            var t3 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(simpleFactory.size).to.equal(3);
            simpleFactory.removeAll();
            chai_1.expect(simpleFactory.size).to.equal(0);
        });
    });
});
