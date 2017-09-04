"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var ComponentFactory_1 = require("../src/ComponentFactory");
describe("Togglable Component Factory", function () {
    var concreteComponent = (function () {
        function concreteComponent(entityId, active) {
            this.entityId = entityId;
            this.active = active;
        }
        return concreteComponent;
    }());
    var multiPropComponent = (function () {
        function multiPropComponent(entityId, active, prop1, prop2, prop3) {
            this.entityId = entityId;
            this.active = active;
            this.prop1 = prop1;
            this.prop2 = prop2;
            this.prop3 = prop3;
        }
        return multiPropComponent;
    }());
    var simpleFactory = new ComponentFactory_1.ComponentFactory(5, multiPropComponent);
    var multiPropFactory = new ComponentFactory_1.ComponentFactory(5, multiPropComponent, "default string", "default string", { x: 0.0, y: 0.0 });
    beforeEach(function () {
        multiPropFactory = new ComponentFactory_1.ComponentFactory(5, multiPropComponent, "default string", "default string", { x: 0.0, y: 0.0 });
        simpleFactory = new ComponentFactory_1.ComponentFactory(5, multiPropComponent);
    });
    it("should be able to retrieve a component by entity id", function () {
        var c = simpleFactory.create(multiPropComponent, "1", true);
        var c2 = simpleFactory.create(multiPropComponent, "2", true);
        var fetchedC = simpleFactory.get(c2.entityId);
        chai_1.expect(fetchedC.entityId).to.equal(c2.entityId);
        //undefined if id not found
        var fetchedC2 = simpleFactory.get("123456-abc");
        chai_1.expect(fetchedC2).to.equal(undefined);
    });
    it("should be able to create components with various number of arguments", function () {
        var mc = multiPropFactory.create(multiPropComponent, "c1", true, "p1", 2, { "x": 1, "y": 3 });
        chai_1.expect(mc.entityId).to.equal("c1");
        chai_1.expect(mc.prop1).to.equal("p1");
        chai_1.expect(mc.prop2).to.equal(2);
        chai_1.expect(mc.prop3.x).to.equal(1);
        chai_1.expect(mc.prop3.y).to.equal(3);
    });
    it("should be able to create a number of zeroed components at instanciation ", function () {
        var simpleFactory = new ComponentFactory_1.ComponentFactory(5, multiPropComponent);
        chai_1.expect(simpleFactory.values.length).to.equal(5);
    });
    it("zeored component should have a key starting by 0", function () {
        var simpleFactory = new ComponentFactory_1.ComponentFactory(5, multiPropComponent);
        for (var i_1 = 0; i_1 < 5; ++i_1) {
            chai_1.expect(simpleFactory.values[i_1].entityId).to.equal('0');
        }
    });
    it("should be able to provid zeroed value for component proreties ", function () {
        for (var i_2 = 0; i_2 < 5; ++i_2) {
            chai_1.expect(multiPropFactory.values[i_2].prop1).to.equal("default string");
            chai_1.expect(multiPropFactory.values[i_2].prop2).to.equal("default string");
            chai_1.expect(multiPropFactory.values[i_2].prop3.x).to.equal(0.0);
            chai_1.expect(multiPropFactory.values[i_2].prop3.y).to.equal(0.0);
        }
    });
    it("zeroed component should be inactive ", function () {
        for (var i_3 = 0; i_3 < 5; ++i_3) {
            chai_1.expect(multiPropFactory.values[i_3].active).to.equal(false);
        }
    });
    it("zeroed component should not be referenced in the key map", function () {
        var simpleFactory = new ComponentFactory_1.ComponentFactory(5, multiPropComponent);
        chai_1.expect(simpleFactory.values.length).to.equal(5);
        chai_1.expect(simpleFactory.keys.size).to.equal(0);
    });
    it("created components should be created at the first spot available ", function () {
        multiPropFactory.create(multiPropComponent, "c1", false, "p1", 2, { "x": 1, "y": 3 });
        chai_1.expect(multiPropFactory.size).to.equal(5);
        chai_1.expect(multiPropFactory.values[0].entityId).to.equal("c1");
    });
    it("creating 2 components with the same entity Id should create only one component ", function () {
        var initialSize = multiPropFactory.size;
        var c = multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, { "x": 0.0, "y": 0.0 });
        chai_1.expect(c.entityId).to.not.be.null;
        chai_1.expect(multiPropFactory.values[0].entityId).to.equal(c.entityId);
        var c2 = multiPropFactory.create(multiPropComponent, "1", false, "p2", 3, { "x": 1.0, "y": 1.0 });
        chai_1.expect(c2.entityId).to.equal(c.entityId);
        chai_1.expect(multiPropFactory.values[0].entityId).to.equal(c.entityId);
        chai_1.expect(multiPropFactory.size).to.equal(initialSize);
        chai_1.expect(multiPropFactory.get("1").prop1).to.equal(c2.prop1);
    });
    it("should increment the createdLength only if the components is created at an index greater than createdLength", function () {
        chai_1.expect(multiPropFactory.iterationLength).to.equal(0);
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, { "x": 0.0, "y": 0.0 });
        chai_1.expect(multiPropFactory.iterationLength).to.equal(1);
        multiPropFactory.create(multiPropComponent, "2", false, "p1", 2, { "x": 0.0, "y": 0.0 });
        chai_1.expect(multiPropFactory.iterationLength).to.equal(2);
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 3, { "x": 0.0, "y": 0.0 });
        chai_1.expect(multiPropFactory.iterationLength).to.equal(2);
    });
    it("should zeroed the component when we 'remove' ", function () {
        var initialSize = multiPropFactory.size;
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, { "x": 0.0, "y": 0.0 });
        chai_1.expect(multiPropFactory.has('1')).to.equal(true);
        // id should be found in order to delete it first
        chai_1.expect(multiPropFactory.delete('1')).to.equal(true);
        // size of the pool should not be changed since we zeroed the component instead of removing it from the pool
        chai_1.expect(multiPropFactory.size).to.equal(initialSize);
        // we created only one component so it was at the first index of the values array, it is now zeroed
        chai_1.expect(multiPropFactory.values[0].entityId).to.equal('0');
        // the component should not be referenced anymore
        chai_1.expect(multiPropFactory.has('1')).to.equal(false);
    });
    it("removed components should decrement the createdLength only if it is the last one ", function () {
        var initialSize = multiPropFactory.size;
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, { "x": 0.0, "y": 0.0 });
        chai_1.expect(multiPropFactory.iterationLength).to.equal(1);
        chai_1.expect(multiPropFactory.delete('1')).to.equal(true);
        chai_1.expect(multiPropFactory.iterationLength).to.equal(0);
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, { "x": 0.0, "y": 0.0 });
        multiPropFactory.create(multiPropComponent, "2", false, "p1", 2, { "x": 0.0, "y": 0.0 });
        chai_1.expect(multiPropFactory.iterationLength).to.equal(2);
        chai_1.expect(multiPropFactory.delete('1')).to.equal(true);
        // still equal 2 since the one we removed is not the last one
        chai_1.expect(multiPropFactory.iterationLength).to.equal(2);
    });
    it("should be able to create components with an active proprety and other proreties", function () {
        var mcFactory = new ComponentFactory_1.ComponentFactory(2, multiPropComponent, "default string", "default string", { x: 0.0, y: 0.0 });
        var mc = mcFactory.create(multiPropComponent, "c1", true, "p1", 2, { "x": 1.0, "y": 3.0 });
        chai_1.expect(mc.active).to.equal(true);
        chai_1.expect(mc.entityId).to.equal("c1");
        chai_1.expect(mc.prop1).to.equal("p1");
        chai_1.expect(mc.prop2).to.equal(2);
        chai_1.expect(mc.prop3.x).to.equal(1);
        chai_1.expect(mc.prop3.y).to.equal(3);
        var mc2 = mcFactory.create(multiPropComponent, "c1", false, "p1", 2, { "x": 1.0, "y": 3.0 });
        chai_1.expect(mc2.active).to.equal(false);
    });
    it("should be able to active all created components", function () {
        simpleFactory.create(multiPropComponent, "1", false);
        simpleFactory.create(multiPropComponent, "2", false);
        simpleFactory.activateAll(true);
        chai_1.expect(simpleFactory.values[0].active).to.equal(true);
        chai_1.expect(simpleFactory.values[1].active).to.equal(true);
    });
    it("should be able to desactivate all created components", function () {
        simpleFactory.create(multiPropComponent, "1", true);
        simpleFactory.create(multiPropComponent, "2", true);
        simpleFactory.activateAll(false);
        chai_1.expect(simpleFactory.values[0].active).to.equal(false);
        chai_1.expect(simpleFactory.values[1].active).to.equal(false);
    });
    it("should keep track of the nb of created components", function () {
        chai_1.expect(simpleFactory.nbCreated).to.equal(0);
        simpleFactory.create(multiPropComponent, "1", false);
        chai_1.expect(simpleFactory.nbCreated).to.equal(1);
        simpleFactory.create(multiPropComponent, "2", true);
        chai_1.expect(simpleFactory.nbCreated).to.equal(2);
        simpleFactory.create(multiPropComponent, "2", true);
        chai_1.expect(simpleFactory.nbCreated).to.equal(2);
        simpleFactory.delete("2");
        chai_1.expect(simpleFactory.nbCreated).to.equal(1);
        simpleFactory.delete("1");
        chai_1.expect(simpleFactory.nbCreated).to.equal(0);
    });
    it("should keep track of the number of active components", function () {
        chai_1.expect(simpleFactory.nbActive).to.equal(0);
        simpleFactory.create(multiPropComponent, "1", true);
        chai_1.expect(simpleFactory.nbActive).to.equal(1);
        simpleFactory.create(multiPropComponent, "2", true);
        chai_1.expect(simpleFactory.nbActive).to.equal(2);
        simpleFactory.create(multiPropComponent, "2", true);
        chai_1.expect(simpleFactory.nbActive).to.equal(2);
        simpleFactory.create(multiPropComponent, "2", false);
        chai_1.expect(simpleFactory.nbActive).to.equal(1);
        simpleFactory.create(multiPropComponent, "3", false);
        chai_1.expect(simpleFactory.nbActive).to.equal(1);
        simpleFactory.create(multiPropComponent, "4", true);
        chai_1.expect(simpleFactory.nbActive).to.equal(2);
        simpleFactory.delete("2");
        chai_1.expect(simpleFactory.nbActive).to.equal(2);
        simpleFactory.delete("1");
        chai_1.expect(simpleFactory.nbActive).to.equal(1);
        simpleFactory.activate("4", false);
        chai_1.expect(simpleFactory.nbActive).to.equal(0);
        simpleFactory.activateAll(true);
        chai_1.expect(simpleFactory.nbActive).to.equal(simpleFactory.nbCreated);
    });
    it("should keep track of the number of inactive components", function () {
        chai_1.expect(simpleFactory.nbInactive).to.equal(0);
        simpleFactory.create(multiPropComponent, "1", true);
        chai_1.expect(simpleFactory.nbInactive).to.equal(0);
        simpleFactory.create(multiPropComponent, "2", false);
        chai_1.expect(simpleFactory.nbInactive).to.equal(1);
        simpleFactory.create(multiPropComponent, "2", false);
        chai_1.expect(simpleFactory.nbInactive).to.equal(1);
        simpleFactory.create(multiPropComponent, "2", true);
        chai_1.expect(simpleFactory.nbInactive).to.equal(0);
        simpleFactory.create(multiPropComponent, "3", false);
        chai_1.expect(simpleFactory.nbInactive).to.equal(1);
        simpleFactory.create(multiPropComponent, "4", false);
        chai_1.expect(simpleFactory.nbInactive).to.equal(2);
        simpleFactory.delete("2");
        chai_1.expect(simpleFactory.nbInactive).to.equal(2);
        simpleFactory.delete("3");
        chai_1.expect(simpleFactory.nbInactive).to.equal(1);
        simpleFactory.activate("4", true);
        chai_1.expect(simpleFactory.nbInactive).to.equal(0);
        simpleFactory.activateAll(false);
        chai_1.expect(simpleFactory.nbInactive).to.equal(simpleFactory.nbCreated);
    });
    it("should keep track of the number of free slot", function () {
        chai_1.expect(simpleFactory.nbFreeSlot).to.equal(5);
        simpleFactory.create(multiPropComponent, "1", true);
        chai_1.expect(simpleFactory.nbFreeSlot).to.equal(4);
        simpleFactory.create(multiPropComponent, "2", false);
        chai_1.expect(simpleFactory.nbFreeSlot).to.equal(3);
        simpleFactory.create(multiPropComponent, "2", true);
        chai_1.expect(simpleFactory.nbFreeSlot).to.equal(3);
    });
    it("resize the pool down", function () {
        chai_1.expect(multiPropFactory.size).to.equal(5);
        multiPropFactory.resize(3);
        chai_1.expect(multiPropFactory.size).to.equal(3);
        for (var i_4 = 0; i_4 < multiPropFactory.size; ++i_4) {
            chai_1.expect(multiPropFactory[i_4]).to.equal(undefined);
        }
    });
    it("resize the pool up", function () {
        chai_1.expect(multiPropFactory.size).to.equal(5);
        multiPropFactory.resize(10);
        chai_1.expect(multiPropFactory.size).to.equal(10);
        for (var i_5 = 0; i_5 < multiPropFactory.size; ++i_5) {
            chai_1.expect(multiPropFactory.values[i_5].entityId).to.equal('0');
        }
        // make sure object in component are distinct copy and not a reference
        multiPropFactory.values[multiPropFactory.size - 1].prop3.x += 1;
        chai_1.expect(multiPropFactory.values[multiPropFactory.size - 2].prop3.x).to.not.equal(multiPropFactory.values[multiPropFactory.size - 1].prop3.x);
    });
});
