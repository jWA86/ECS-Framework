"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var ComponentFactoryFastMap_1 = require("../../src/SOA/ComponentFactoryFastMap");
// entityId is use as component Id in this implementation
// SOA/entityId/ComponentFactoryFastMap should be the default ComponententFactory in the futur
var poolImpl = [{ "name": "fastMap", "impl": ComponentFactoryFastMap_1.ComponentFactoryFastMap }];
poolImpl.forEach(function (p) {
    describe("Component Factory with " + p.name, function () {
        var concreteComponent = (function () {
            function concreteComponent(entityId) {
                this.entityId = entityId;
            }
            return concreteComponent;
        }());
        var simpleFactory = new p.impl();
        beforeEach(function () {
            simpleFactory = new p.impl();
        });
        it("should generate an id of the component it creates", function () {
            var c = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(c.entityId).to.not.be.null;
            chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(c.entityId);
            var c2 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(c2.entityId).to.not.equal(c.entityId);
            chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(c2.entityId);
        });
        it("should hold components it instanciates in a pool", function () {
            var ids = [];
            for (var i = 0; i < 5; ++i) {
                var t = simpleFactory.createComponent(concreteComponent);
                ids.push(t);
            }
            chai_1.expect(simpleFactory.size).to.equal(5);
            var a = simpleFactory.pool.values;
            for (var i = 0; i < 5; ++i) {
                chai_1.expect(a[i].entityId).to.equal(ids[i].entityId);
            }
        });
        it("should be able to retrieve a component by its id", function () {
            var c = simpleFactory.createComponent(concreteComponent);
            var c2 = simpleFactory.createComponent(concreteComponent);
            var fetchedC = simpleFactory.getComponent(c2.entityId);
            chai_1.expect(fetchedC.entityId).to.equal(c2.entityId);
            //undefined if id not found
            var fetchedC2 = simpleFactory.getComponent("123456-abc");
            chai_1.expect(fetchedC2).to.equal(undefined);
        });
        it("should be able to insert a component after another one in pool", function () {
            var t = simpleFactory.createComponent(concreteComponent);
            var t2 = simpleFactory.createComponent(concreteComponent);
            var t3 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
            chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);
            //inserted t4 should be after t2
            var t4 = simpleFactory.createComponentAfter(concreteComponent, t2.entityId);
            chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
            chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t4.entityId);
            chai_1.expect(simpleFactory.pool.values[3].entityId).to.equal(t3.entityId);
        });
        it("should be able to insert a component before another one in pool", function () {
            var t = simpleFactory.createComponent(concreteComponent);
            var t2 = simpleFactory.createComponent(concreteComponent);
            var t3 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
            chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);
            //inserted t4 should be before t2
            var t4 = simpleFactory.createComponentBefore(concreteComponent, t2.entityId);
            chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t4.entityId);
            chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t2.entityId);
            chai_1.expect(simpleFactory.pool.values[3].entityId).to.equal(t3.entityId);
        });
        it("should be able to remove a component from the pool and keep the same order", function () {
            var t = simpleFactory.createComponent(concreteComponent);
            var t2 = simpleFactory.createComponent(concreteComponent);
            var t3 = simpleFactory.createComponent(concreteComponent);
            chai_1.expect(simpleFactory.size).to.equal(3);
            chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
            chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);
            simpleFactory.removeComponent(t2.entityId);
            chai_1.expect(simpleFactory.size).to.equal(2);
            chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t3.entityId);
            simpleFactory.removeComponent(t.entityId);
            chai_1.expect(simpleFactory.size).to.equal(1);
            chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t3.entityId);
            simpleFactory.removeComponent(t3.entityId);
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
