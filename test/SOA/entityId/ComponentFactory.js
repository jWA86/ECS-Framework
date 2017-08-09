"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var ComponentFactoryFastMap_1 = require("../../../src/SOA/entityId/ComponentFactoryFastMap");
describe("Component Factory with entityID", function () {
    var concreteComponent = (function () {
        function concreteComponent(id) {
            this.id = id;
        }
        return concreteComponent;
    }());
    var simpleFactory = new ComponentFactoryFastMap_1.ComponentFactory();
    beforeEach(function () {
        simpleFactory = new ComponentFactoryFastMap_1.ComponentFactory();
    });
    it("creating 2 components with the same entity Id should create only one component ", function () {
        var c = simpleFactory.createComponent(concreteComponent, "1");
        chai_1.expect(c.id).to.not.be.null;
        chai_1.expect(simpleFactory.pool[0].id).to.equal(c.id);
        var c2 = simpleFactory.createComponent(concreteComponent, "1");
        chai_1.expect(c2.id).to.equal(c.id);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(c.id);
        chai_1.expect(simpleFactory.size).to.equal(1);
    });
    it("should be able to retrieve a component by entity id", function () {
        var c = simpleFactory.createComponent(concreteComponent, "1");
        var c2 = simpleFactory.createComponent(concreteComponent, "2");
        var fetchedC = simpleFactory.getComponent(c2.id);
        chai_1.expect(fetchedC.id).to.equal(c2.id);
        //undefined if id not found
        var fetchedC2 = simpleFactory.getComponent("123456-abc");
        chai_1.expect(fetchedC2).to.equal(undefined);
    });
    it("should be able to insert a component after another one in pool", function () {
        var t = simpleFactory.createComponent(concreteComponent, "1");
        var t2 = simpleFactory.createComponent(concreteComponent, "2");
        var t3 = simpleFactory.createComponent(concreteComponent, "3");
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t3.id);
        //inserted t4 should be after t2"
        var t4 = simpleFactory.createComponentAfter(concreteComponent, "4", t2.id);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t4.id);
        chai_1.expect(simpleFactory.pool[3].id).to.equal(t3.id);
    });
    it("should be able to insert a component before another one in pool", function () {
        var t = simpleFactory.createComponent(concreteComponent, "1");
        var t2 = simpleFactory.createComponent(concreteComponent, "2");
        var t3 = simpleFactory.createComponent(concreteComponent, "3");
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t3.id);
        //inserted t4 should be before t2
        var t4 = simpleFactory.createComponentBefore(concreteComponent, "4", t2.id);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t4.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[3].id).to.equal(t3.id);
    });
    it("should be able to remove a component from the pool and keep the same order", function () {
        var t = simpleFactory.createComponent(concreteComponent, "1");
        var t2 = simpleFactory.createComponent(concreteComponent, "2");
        var t3 = simpleFactory.createComponent(concreteComponent, "3");
        chai_1.expect(simpleFactory.size).to.equal(3);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t3.id);
        simpleFactory.removeComponent(t2.id);
        chai_1.expect(simpleFactory.size).to.equal(2);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t3.id);
        simpleFactory.removeComponent(t.id);
        chai_1.expect(simpleFactory.size).to.equal(1);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t3.id);
        simpleFactory.removeComponent(t3.id);
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
});
