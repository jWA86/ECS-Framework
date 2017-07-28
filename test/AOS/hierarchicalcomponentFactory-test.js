"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var HierarchicalComponentFactory_1 = require("../../src/SOA/HierarchicalComponentFactory");
describe("Hierarchical Component Factory ", function () {
    var HierarchicalComponent = (function () {
        function HierarchicalComponent(id) {
            this.id = id;
            this.children = [];
        }
        return HierarchicalComponent;
    }());
    var HierarchicalFactory = new HierarchicalComponentFactory_1.HierarchicalComponentFactory();
    beforeEach(function () {
        HierarchicalFactory = new HierarchicalComponentFactory_1.HierarchicalComponentFactory();
    });
    it("should be able to add child component to one component and insert it after in the pool", function () {
        var t = HierarchicalFactory.createComponent(HierarchicalComponent);
        var child1 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        chai_1.expect(HierarchicalFactory.pool[1].id).to.equal(child1.id);
        chai_1.expect(HierarchicalFactory.pool[0].children.length).to.equal(1);
        chai_1.expect(HierarchicalFactory.pool[0].children[0]).to.equal(child1.id);
        // insert a new component at the top
        var t2 = HierarchicalFactory.createComponentAt(HierarchicalComponent, t.id);
        var child2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t2.id);
        chai_1.expect(HierarchicalFactory.pool[0].id).to.equal(t2.id);
        chai_1.expect(HierarchicalFactory.pool[0].children[0]).to.equal(child2.id);
        //child2 should be placed after it parents in the pool
        chai_1.expect(HierarchicalFactory.pool[1].id).to.equal(child2.id);
        //other components should have been moved futher down the pool
        chai_1.expect(HierarchicalFactory.pool[2].id).to.equal(t.id);
        chai_1.expect(HierarchicalFactory.pool[3].id).to.equal(child1.id);
    });
    it("should be able to remove a parent and all its children in the factory pool", function () {
        var t = HierarchicalFactory.createComponent(HierarchicalComponent);
        var child1 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        var child2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        var t2 = HierarchicalFactory.createComponent(HierarchicalComponent);
        chai_1.expect(HierarchicalFactory.pool.length).to.equal(4);
        HierarchicalFactory.removeComponent(t.id, true);
        chai_1.expect(HierarchicalFactory.pool.length).to.equal(1);
        chai_1.expect(HierarchicalFactory.pool[0].id).to.equal(t2.id);
    });
    it("should be able to remove the whole branch of a hierachy recursively", function () {
        var t = HierarchicalFactory.createComponent(HierarchicalComponent);
        var child1 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        var child2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        var child1OfChild2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, child2.id);
        var child2OfChild2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, child2.id);
        var t2 = HierarchicalFactory.createComponent(HierarchicalComponent);
        chai_1.expect(HierarchicalFactory.pool.length).to.equal(6);
        //          t           t2
        //       /     \
        //      c1      c2
        //             /   \
        //          cOc1    cOc2
        //
        //  t, c1, c2, coc2, t2
        // after removing t : t2 at pool[0]
        HierarchicalFactory.removeComponent(t.id, true);
        chai_1.expect(HierarchicalFactory.pool[0].id).to.equal(t2.id);
        chai_1.expect(HierarchicalFactory.pool.length).to.equal(1);
    });
    it("should be able to remove a parent but not its children in the factory pool", function () {
        var t = HierarchicalFactory.createComponent(HierarchicalComponent);
        var child1 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        var child2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        var t2 = HierarchicalFactory.createComponent(HierarchicalComponent);
        chai_1.expect(HierarchicalFactory.pool.length).to.equal(4);
        HierarchicalFactory.removeComponent(t.id, false);
        chai_1.expect(HierarchicalFactory.pool.length).to.equal(3);
        chai_1.expect(HierarchicalFactory.pool[0].id).to.equal(child1.id);
        chai_1.expect(HierarchicalFactory.pool[1].id).to.equal(child2.id);
        chai_1.expect(HierarchicalFactory.pool[2].id).to.equal(t2.id);
    });
});
