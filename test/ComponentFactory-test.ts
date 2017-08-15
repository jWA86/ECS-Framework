import "mocha";
import { expect } from "chai";
import { IComponent, IComponentFactory } from "../src/interfaces";
import { ComponentFactory } from "../src/ComponentFactory";

describe("Component Factory with entityID", () => {
    class concreteComponent implements IComponent {
        constructor(public entityId: string) { }
    }
    let simpleFactory = new ComponentFactory<IComponent>();
    beforeEach(() => {
        simpleFactory = new ComponentFactory<IComponent>();
    });

    it("creating 2 components with the same entity Id should create only one component ", () => {
        let c = simpleFactory.createComponent(concreteComponent, "1");
        expect(c.entityId).to.not.be.null;
        expect(simpleFactory.pool.values[0].entityId).to.equal(c.entityId);
        let c2 = simpleFactory.createComponent(concreteComponent, "1");
        expect(c2.entityId).to.equal(c.entityId);
        expect(simpleFactory.pool.values[0].entityId).to.equal(c.entityId);
        expect(simpleFactory.size).to.equal(1);
    });
    it("should be able to retrieve a component by entity id", () => {
        let c = simpleFactory.createComponent(concreteComponent, "1");
        let c2 = simpleFactory.createComponent(concreteComponent, "2");
        let fetchedC = simpleFactory.getComponent(c2.entityId);
        expect(fetchedC.entityId).to.equal(c2.entityId);
        //undefined if id not found
        let fetchedC2 = simpleFactory.getComponent("123456-abc");
        expect(fetchedC2).to.equal(undefined);
    });
    it("should be able to insert a component after another one in pool", () => {
        let t = simpleFactory.createComponent(concreteComponent, "1");
        let t2 = simpleFactory.createComponent(concreteComponent, "2");
        let t3 = simpleFactory.createComponent(concreteComponent, "3");
        expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
        expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);

        //inserted t4 should be after t2"
        let t4 = simpleFactory.createComponentAfter(concreteComponent, "4", t2.entityId);
        expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
        expect(simpleFactory.pool.values[2].entityId).to.equal(t4.entityId);
        expect(simpleFactory.pool.values[3].entityId).to.equal(t3.entityId);
    });
    it("should be able to insert a component before another one in pool", () => {
        let t = simpleFactory.createComponent(concreteComponent, "1");
        let t2 = simpleFactory.createComponent(concreteComponent, "2");
        let t3 = simpleFactory.createComponent(concreteComponent, "3");
        expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
        expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);

        //inserted t4 should be before t2
        let t4 = simpleFactory.createComponentBefore(concreteComponent, "4", t2.entityId);
        expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        expect(simpleFactory.pool.values[1].entityId).to.equal(t4.entityId);
        expect(simpleFactory.pool.values[2].entityId).to.equal(t2.entityId);
        expect(simpleFactory.pool.values[3].entityId).to.equal(t3.entityId);
    });
    it("should be able to remove a component from the pool and keep the same order", () => {
        let t = simpleFactory.createComponent(concreteComponent, "1");
        let t2 = simpleFactory.createComponent(concreteComponent, "2");
        let t3 = simpleFactory.createComponent(concreteComponent, "3");
        expect(simpleFactory.size).to.equal(3);
        expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
        expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);

        simpleFactory.removeComponent(t2.entityId);
        expect(simpleFactory.size).to.equal(2);
        expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
        expect(simpleFactory.pool.values[1].entityId).to.equal(t3.entityId);

        simpleFactory.removeComponent(t.entityId);
        expect(simpleFactory.size).to.equal(1);
        expect(simpleFactory.pool.values[0].entityId).to.equal(t3.entityId);

        simpleFactory.removeComponent(t3.entityId);
        expect(simpleFactory.size).to.equal(0);
    });
    it("should be able to remove all components from the pool", () => {
        //remove ref from the pool
        let t = simpleFactory.createComponent(concreteComponent, "1");
        let t2 = simpleFactory.createComponent(concreteComponent, "2");
        let t3 = simpleFactory.createComponent(concreteComponent, "3");
        expect(simpleFactory.size).to.equal(3);
        simpleFactory.removeAll();
        expect(simpleFactory.size).to.equal(0);
    });
    it("should be able to create components with various number of arguments", () => {
        class multiPropComponent implements IComponent {
            constructor(public entityId: string, public prop1: string, public prop2: number, public prop3: { "x": 0, "y": 2 }) { }
        }
        let mcFactory = new ComponentFactory<multiPropComponent>();
        let mc = mcFactory.createComponent(multiPropComponent, "c1", "p1", 2, { "x": 1, "y": 3 });
        expect(mc.entityId).to.equal("c1");
        expect(mc.prop1).to.equal("p1");
        expect(mc.prop2).to.equal(2);
        expect(mc.prop3.x).to.equal(1);
        expect(mc.prop3.y).to.equal(3);
    });
});
