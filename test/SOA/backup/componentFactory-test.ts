import "mocha";
import { expect } from "chai";
import { IComponent, IComponentFactory } from "../../src/SOA/interfaces";
import { ComponentFactoryFastMap } from "../../src/SOA/ComponentFactoryFastMap";

// entityId is use as component Id in this implementation
// SOA/entityId/ComponentFactoryFastMap should be the default ComponententFactory in the futur
const poolImpl = [{"name":"fastMap", "impl":ComponentFactoryFastMap}];
poolImpl.forEach((p) => {
    describe("Component Factory with " + p.name, () => {

        class concreteComponent implements IComponent {
            constructor(public entityId: string) {}
        }
        let simpleFactory: IComponentFactory<IComponent> = new p.impl<IComponent>();
        beforeEach(() => {
            simpleFactory = new p.impl<IComponent>();
        });
        it("should generate an id of the component it creates", () => {
            let c = simpleFactory.createComponent(concreteComponent);
            expect(c.entityId).to.not.be.null;
            expect(simpleFactory.pool.values[0].entityId).to.equal(c.entityId);
            let c2 = simpleFactory.createComponent(concreteComponent);
            expect(c2.entityId).to.not.equal(c.entityId);
            expect(simpleFactory.pool.values[1].entityId).to.equal(c2.entityId);
        });
        it("should hold components it instanciates in a pool", () => {
            let ids = [];
            for (let i = 0; i < 5; ++i) {
                let t = simpleFactory.createComponent(concreteComponent);
                ids.push(t);
            }
            expect(simpleFactory.size).to.equal(5);
            let a = simpleFactory.pool.values;
            for (let i = 0; i < 5; ++i) {
                expect(a[i].entityId).to.equal(ids[i].entityId);
            }
        });
        it("should be able to retrieve a component by its id", () => {
            let c = simpleFactory.createComponent(concreteComponent);
            let c2 = simpleFactory.createComponent(concreteComponent);
            let fetchedC = simpleFactory.getComponent(c2.entityId);
            expect(fetchedC.entityId).to.equal(c2.entityId);
            //undefined if id not found
            let fetchedC2 = simpleFactory.getComponent("123456-abc");
            expect(fetchedC2).to.equal(undefined);
        });
        it("should be able to insert a component after another one in pool", () => {
            let t = simpleFactory.createComponent(concreteComponent);
            let t2 = simpleFactory.createComponent(concreteComponent);
            let t3 = simpleFactory.createComponent(concreteComponent);
            expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
            expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);

            //inserted t4 should be after t2
            let t4 = simpleFactory.createComponentAfter(concreteComponent, t2.entityId);
            expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
            expect(simpleFactory.pool.values[2].entityId).to.equal(t4.entityId);
            expect(simpleFactory.pool.values[3].entityId).to.equal(t3.entityId);
        });
        it("should be able to insert a component before another one in pool", () => {

            let t = simpleFactory.createComponent(concreteComponent);
            let t2 = simpleFactory.createComponent(concreteComponent);
            let t3 = simpleFactory.createComponent(concreteComponent);
            expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            expect(simpleFactory.pool.values[1].entityId).to.equal(t2.entityId);
            expect(simpleFactory.pool.values[2].entityId).to.equal(t3.entityId);

            //inserted t4 should be before t2
            let t4 = simpleFactory.createComponentBefore(concreteComponent, t2.entityId);
            expect(simpleFactory.pool.values[0].entityId).to.equal(t.entityId);
            expect(simpleFactory.pool.values[1].entityId).to.equal(t4.entityId);
            expect(simpleFactory.pool.values[2].entityId).to.equal(t2.entityId);
            expect(simpleFactory.pool.values[3].entityId).to.equal(t3.entityId);
        });
        it("should be able to remove a component from the pool and keep the same order", () => {
            let t = simpleFactory.createComponent(concreteComponent);
            let t2 = simpleFactory.createComponent(concreteComponent);
            let t3 = simpleFactory.createComponent(concreteComponent);
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
            let t = simpleFactory.createComponent(concreteComponent);
            let t2 = simpleFactory.createComponent(concreteComponent);
            let t3 = simpleFactory.createComponent(concreteComponent);
            expect(simpleFactory.size).to.equal(3);
            simpleFactory.removeAll();
            expect(simpleFactory.size).to.equal(0);
        });
    });
});
