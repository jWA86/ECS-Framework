import "mocha";
import { expect } from "chai";
import { IHierarchicalComponent,  HierarchicalComponentFactory }
    from "../../src/AOS/HierarchicalComponentFactory";

describe("Hierarchical Component Factory ", () => {

    class HierarchicalComponent implements IHierarchicalComponent {
        public children: string[] = [];
        constructor(public id: string) {
        }
    }
    let HierarchicalFactory = new HierarchicalComponentFactory<IHierarchicalComponent>();
    beforeEach( () => {
        HierarchicalFactory = new HierarchicalComponentFactory<IHierarchicalComponent>();
    });

    it("should be able to add child component to one component and insert it after in the pool", () => {
        let t = HierarchicalFactory.createComponent(HierarchicalComponent);

        let child1 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        expect(HierarchicalFactory.pool[1].id).to.equal(child1.id);
        expect(HierarchicalFactory.pool[0].children.length).to.equal(1);
        expect(HierarchicalFactory.pool[0].children[0]).to.equal(child1.id);

        // insert a new component at the top
        let t2 = HierarchicalFactory.createComponentAt(HierarchicalComponent, t.id);
        let child2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t2.id);

        expect(HierarchicalFactory.pool[0].id).to.equal(t2.id);
        expect(HierarchicalFactory.pool[0].children[0]).to.equal(child2.id);
        //child2 should be placed after it parents in the pool
        expect(HierarchicalFactory.pool[1].id).to.equal(child2.id);
        //other components should have been moved futher down the pool
        expect(HierarchicalFactory.pool[2].id).to.equal(t.id);
        expect(HierarchicalFactory.pool[3].id).to.equal(child1.id);

    });
    it("should be able to remove a parent and all its children in the factory pool", () => {
        let t = HierarchicalFactory.createComponent(HierarchicalComponent);
        let child1 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        let child2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);

        let t2 = HierarchicalFactory.createComponent(HierarchicalComponent);
        expect(HierarchicalFactory.pool.length).to.equal(4);

        HierarchicalFactory.removeComponent(t.id, true);
        expect(HierarchicalFactory.pool.length).to.equal(1);
        expect(HierarchicalFactory.pool[0].id).to.equal(t2.id);

    });
    it("should be able to remove the whole branch of a hierachy recursively", () => {
        let t = HierarchicalFactory.createComponent(HierarchicalComponent);
        let child1 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        let child2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        let child1OfChild2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, child2.id);
        let child2OfChild2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, child2.id);
        let t2 = HierarchicalFactory.createComponent(HierarchicalComponent);
        expect(HierarchicalFactory.pool.length).to.equal(6);
        //          t           t2
        //       /     \
        //      c1      c2
        //             /   \
        //          cOc1    cOc2
        //
        //  t, c1, c2, coc2, t2
        // after removing t : t2 at pool[0]

        HierarchicalFactory.removeComponent(t.id, true);
        expect(HierarchicalFactory.pool[0].id).to.equal(t2.id);
        expect(HierarchicalFactory.pool.length).to.equal(1);

    });
    it("should be able to remove a parent but not its children in the factory pool", () => {
        let t = HierarchicalFactory.createComponent(HierarchicalComponent);
        let child1 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);
        let child2 = HierarchicalFactory.createChildComponent(HierarchicalComponent, t.id);

        let t2 = HierarchicalFactory.createComponent(HierarchicalComponent);
        expect(HierarchicalFactory.pool.length).to.equal(4);

        HierarchicalFactory.removeComponent(t.id, false);
        expect(HierarchicalFactory.pool.length).to.equal(3);
        expect(HierarchicalFactory.pool[0].id).to.equal(child1.id);
        expect(HierarchicalFactory.pool[1].id).to.equal(child2.id);
        expect(HierarchicalFactory.pool[2].id).to.equal(t2.id);
    });
});