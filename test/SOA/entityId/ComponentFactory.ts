import "mocha";
import { expect } from "chai";
import { IComponent, IComponentFactory } from "../../../src/SOA/interfaces";
import { ComponentFactory } from "../../../src/SOA/entityId/ComponentFactoryFastMap";


    describe("Component Factory with entityID", () => {
        class concreteComponent implements IComponent {
            constructor(public id: string) {}
        }
        let simpleFactory = new ComponentFactory<IComponent>();
        beforeEach(() => {
            simpleFactory = new ComponentFactory<IComponent>();
        });
        
        it("creating 2 components with the same entity Id should create only one component ", () => {
            let c = simpleFactory.createComponent(concreteComponent, "1");
            expect(c.id).to.not.be.null;
            
            expect(simpleFactory.pool[0].id).to.equal(c.id);
            let c2 = simpleFactory.createComponent(concreteComponent, "1");
            expect(c2.id).to.equal(c.id);
            expect(simpleFactory.pool[0].id).to.equal(c.id);
            expect(simpleFactory.size).to.equal(1);
        });
        it("should be able to retrieve a component by entity id", () => {
            let c = simpleFactory.createComponent(concreteComponent, "1");
            let c2 = simpleFactory.createComponent(concreteComponent, "2");
            let fetchedC = simpleFactory.getComponent(c2.id);
            expect(fetchedC.id).to.equal(c2.id);
            //undefined if id not found
            let fetchedC2 = simpleFactory.getComponent("123456-abc");
            expect(fetchedC2).to.equal(undefined);
        });
        it("should be able to insert a component after another one in pool", () => {
            let t = simpleFactory.createComponent(concreteComponent, "1");
            let t2 = simpleFactory.createComponent(concreteComponent, "2");
            let t3 = simpleFactory.createComponent(concreteComponent, "3");
            expect(simpleFactory.pool[0].id).to.equal(t.id);
            expect(simpleFactory.pool[1].id).to.equal(t2.id);
            expect(simpleFactory.pool[2].id).to.equal(t3.id);

            //inserted t4 should be after t2"
            let t4 = simpleFactory.createComponentAfter(concreteComponent, "4", t2.id);
            expect(simpleFactory.pool[0].id).to.equal(t.id);
            expect(simpleFactory.pool[1].id).to.equal(t2.id);
            expect(simpleFactory.pool[2].id).to.equal(t4.id);
            expect(simpleFactory.pool[3].id).to.equal(t3.id);
        });
        it("should be able to insert a component before another one in pool", () => {
            let t = simpleFactory.createComponent(concreteComponent, "1");
            let t2 = simpleFactory.createComponent(concreteComponent, "2");
            let t3 = simpleFactory.createComponent(concreteComponent, "3");
            expect(simpleFactory.pool[0].id).to.equal(t.id);
            expect(simpleFactory.pool[1].id).to.equal(t2.id);
            expect(simpleFactory.pool[2].id).to.equal(t3.id);

            //inserted t4 should be before t2
            let t4 = simpleFactory.createComponentBefore(concreteComponent, "4", t2.id);
            expect(simpleFactory.pool[0].id).to.equal(t.id);
            expect(simpleFactory.pool[1].id).to.equal(t4.id);
            expect(simpleFactory.pool[2].id).to.equal(t2.id);
            expect(simpleFactory.pool[3].id).to.equal(t3.id);
        });
        it("should be able to remove a component from the pool and keep the same order", () => {
            let t = simpleFactory.createComponent(concreteComponent, "1");
            let t2 = simpleFactory.createComponent(concreteComponent, "2");
            let t3 = simpleFactory.createComponent(concreteComponent, "3");
            expect(simpleFactory.size).to.equal(3);
            expect(simpleFactory.pool[0].id).to.equal(t.id);
            expect(simpleFactory.pool[1].id).to.equal(t2.id);
            expect(simpleFactory.pool[2].id).to.equal(t3.id);

            simpleFactory.removeComponent(t2.id);
            expect(simpleFactory.size).to.equal(2);
            expect(simpleFactory.pool[0].id).to.equal(t.id);
            expect(simpleFactory.pool[1].id).to.equal(t3.id);

            simpleFactory.removeComponent(t.id);
            expect(simpleFactory.size).to.equal(1);
            expect(simpleFactory.pool[0].id).to.equal(t3.id);

            simpleFactory.removeComponent(t3.id);
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
    });
