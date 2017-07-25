"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var ComponentFactory_1 = require("../src/ComponentFactory");
describe("Component Factory", function () {
    var concreteComponent = (function () {
        function concreteComponent(id) {
            this.id = id;
        }
        return concreteComponent;
    }());
    var simpleFactory = new ComponentFactory_1.ComponentFactory();
    beforeEach(function () {
        simpleFactory = new ComponentFactory_1.ComponentFactory();
    });
    it("should return the id of the comopnent it creates", function () {
        var id = simpleFactory.createComponent(concreteComponent);
        chai_1.expect(id).to.not.be.null;
        var id2 = simpleFactory.createComponent(concreteComponent);
        chai_1.expect(id2).to.not.equal(id);
    });
    it("should hold components it instanciates in a pool", function () {
        for (var i = 0; i < 5; ++i) {
            var t = simpleFactory.createComponent(concreteComponent);
        }
        chai_1.expect(simpleFactory.pool.length).to.equal(5);
    });
    it("should be able to retrieve a component by its id", function () {
        var c = simpleFactory.createComponent(concreteComponent);
        var c2 = simpleFactory.createComponent(concreteComponent);
        var fetchedC = simpleFactory.getComponent(c2.id);
        chai_1.expect(fetchedC.id).to.equal(c2.id);
    });
    it("should be able to insert a component after another one in pool", function () {
        var t = simpleFactory.createComponent(concreteComponent);
        var t2 = simpleFactory.createComponent(concreteComponent);
        var t3 = simpleFactory.createComponent(concreteComponent);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t3.id);
        //insert t4 should after t2
        var t4 = simpleFactory.createComponentAfter(concreteComponent, t2.id);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t4.id);
        chai_1.expect(simpleFactory.pool[3].id).to.equal(t3.id);
    });
    it("should be able to insert a component before another one in pool", function () {
        var t = simpleFactory.createComponent(concreteComponent);
        var t2 = simpleFactory.createComponent(concreteComponent);
        var t3 = simpleFactory.createComponent(concreteComponent);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t3.id);
        //insert t4 should before t2
        var t4 = simpleFactory.createComponentAt(concreteComponent, t2.id);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t4.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[3].id).to.equal(t3.id);
    });
    it("should be able to remove a component from the pool", function () {
        var t = simpleFactory.createComponent(concreteComponent);
        var t2 = simpleFactory.createComponent(concreteComponent);
        var t3 = simpleFactory.createComponent(concreteComponent);
        chai_1.expect(simpleFactory.pool.length).to.equal(3);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t2.id);
        chai_1.expect(simpleFactory.pool[2].id).to.equal(t3.id);
        simpleFactory.removeComponent(t2.id);
        chai_1.expect(simpleFactory.pool.length).to.equal(2);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t.id);
        chai_1.expect(simpleFactory.pool[1].id).to.equal(t3.id);
        simpleFactory.removeComponent(t.id);
        chai_1.expect(simpleFactory.pool.length).to.equal(1);
        chai_1.expect(simpleFactory.pool[0].id).to.equal(t3.id);
        simpleFactory.removeComponent(t3.id);
        chai_1.expect(simpleFactory.pool.length).to.equal(0);
    });
});
