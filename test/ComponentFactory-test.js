"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var ComponentFactory_1 = require("../src/ComponentFactory");
describe("Component Factory with entityID", function () {
    var concreteComponent = (function () {
        function concreteComponent(entityId) {
            this.entityId = entityId;
        }
        return concreteComponent;
    }());
    var simpleFactory = new ComponentFactory_1.ComponentFactory();
    beforeEach(function () {
        simpleFactory = new ComponentFactory_1.ComponentFactory();
    });
    it("creating 2 components with the same entity Id should create only one component ", function () {
        var c = simpleFactory.createComponent(concreteComponent, "1");
        chai_1.expect(c.entityId).to.not.be.null;
        chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(c.entityId);
        var c2 = simpleFactory.createComponent(concreteComponent, "1");
        chai_1.expect(c2.entityId).to.equal(c.entityId);
        chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(c.entityId);
        chai_1.expect(simpleFactory.size).to.equal(1);
    });
    it("should be able to retrieve a component by entity id", function () {
        var c = simpleFactory.createComponent(concreteComponent, "1");
        var c2 = simpleFactory.createComponent(concreteComponent, "2");
        var fetchedC = simpleFactory.getComponent(c2.entityId);
        chai_1.expect(fetchedC.entityId).to.equal(c2.entityId);
        //undefined if id not found
        var fetchedC2 = simpleFactory.getComponent("123456-abc");
        chai_1.expect(fetchedC2).to.equal(undefined);
    });
    it("should be able to insert a component after another one in pool", function () {
        var t = simpleFactory.createComponent(concreteComponent, "1");
        var t2 = simpleFactory.createComponent(concreteComponent, "2");
        var t3 = simpleFactory.createComponent(concreteComponent, "3");
        chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
        chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);
        //inserted t4 should be after t2"
        var t4 = simpleFactory.createComponentAfter(concreteComponent, "4", t2.entityId);
        chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
        chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t4.entityId);
        chai_1.expect(simpleFactory.pool.values[3].entityId).to.equal(t3.entityId);
    });
    it("should be able to insert a component before another one in pool", function () {
        var t = simpleFactory.createComponent(concreteComponent, "1");
        var t2 = simpleFactory.createComponent(concreteComponent, "2");
        var t3 = simpleFactory.createComponent(concreteComponent, "3");
        chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
        chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);
        //inserted t4 should be before t2
        var t4 = simpleFactory.createComponentBefore(concreteComponent, "4", t2.entityId);
        chai_1.expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        chai_1.expect(simpleFactory.pool.values[1].entityId).to.equal(t4.entityId);
        chai_1.expect(simpleFactory.pool.values[2].entityId).to.equal(t2.entityId);
        chai_1.expect(simpleFactory.pool.values[3].entityId).to.equal(t3.entityId);
    });
    it("should be able to remove a component from the pool and keep the same order", function () {
        var t = simpleFactory.createComponent(concreteComponent, "1");
        var t2 = simpleFactory.createComponent(concreteComponent, "2");
        var t3 = simpleFactory.createComponent(concreteComponent, "3");
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
        var t = simpleFactory.createComponent(concreteComponent, "1");
        var t2 = simpleFactory.createComponent(concreteComponent, "2");
        var t3 = simpleFactory.createComponent(concreteComponent, "3");
        chai_1.expect(simpleFactory.size).to.equal(3);
        simpleFactory.removeAll();
        chai_1.expect(simpleFactory.size).to.equal(0);
    });
    it("should be able to create components with various number of arguments", function () {
        var multiPropComponent = (function () {
            function multiPropComponent(entityId, prop1, prop2, prop3) {
                this.entityId = entityId;
                this.prop1 = prop1;
                this.prop2 = prop2;
                this.prop3 = prop3;
            }
            return multiPropComponent;
        }());
        var mcFactory = new ComponentFactory_1.ComponentFactory();
        var mc = mcFactory.createComponent(multiPropComponent, "c1", "p1", 2, { "x": 1, "y": 3 });
        chai_1.expect(mc.entityId).to.equal("c1");
        chai_1.expect(mc.prop1).to.equal("p1");
        chai_1.expect(mc.prop2).to.equal(2);
        chai_1.expect(mc.prop3.x).to.equal(1);
        chai_1.expect(mc.prop3.y).to.equal(3);
    });
});
