import "mocha";
import { expect } from "chai";
import { ComponentFactory, IComponent } from "../src/ComponentFactory";

describe("Component Factory", () => {

    class concreteComponent implements IComponent {
        constructor(public id: string) {}
    }
    let simpleFactory = new ComponentFactory<IComponent>();
    beforeEach(() => {
        simpleFactory = new ComponentFactory<IComponent>();
    });
    it("should generate an id of the component it creates", () => {
        let c = simpleFactory.createComponent(concreteComponent);
        expect(c.id).to.not.be.null;
        expect(simpleFactory.pool[0].id).to.equal(c.id);
        let c2 = simpleFactory.createComponent(concreteComponent);
        expect(c2.id).to.not.equal(c.id);
        expect(simpleFactory.pool[1].id).to.equal(c2.id);
    });
    it("should hold components it instanciates in a pool", () => {
        for (let i = 0; i < 5; ++i) {
            let t = simpleFactory.createComponent(concreteComponent);
        }
        expect(simpleFactory.pool.length).to.equal(5);
    });
    it("should be able to retrieve a component by its id", () => {
        
        let c = simpleFactory.createComponent(concreteComponent);
        let c2 = simpleFactory.createComponent(concreteComponent);
        let fetchedC = simpleFactory.getComponent(c2.id);
        expect(fetchedC.id).to.equal(c2.id);
    });
    it("should be able to insert a component after another one in pool", () => {
        
        let t = simpleFactory.createComponent(concreteComponent);
        let t2 = simpleFactory.createComponent(concreteComponent);
        let t3 = simpleFactory.createComponent(concreteComponent);
        expect(simpleFactory.pool[0].id).to.equal(t.id);
        expect(simpleFactory.pool[1].id).to.equal(t2.id);
        expect(simpleFactory.pool[2].id).to.equal(t3.id);

        //inserted t4 should be after t2
        let t4 = simpleFactory.createComponentAfter(concreteComponent, t2.id);
        expect(simpleFactory.pool[0].id).to.equal(t.id);
        expect(simpleFactory.pool[1].id).to.equal(t2.id);
        expect(simpleFactory.pool[2].id).to.equal(t4.id);
        expect(simpleFactory.pool[3].id).to.equal(t3.id);
    });
    it("should be able to insert a component before another one in pool", () => {
        
        let t = simpleFactory.createComponent(concreteComponent);
        let t2 = simpleFactory.createComponent(concreteComponent);
        let t3 = simpleFactory.createComponent(concreteComponent);
        expect(simpleFactory.pool[0].id).to.equal(t.id);
        expect(simpleFactory.pool[1].id).to.equal(t2.id);
        expect(simpleFactory.pool[2].id).to.equal(t3.id);

        //inserted t4 should be before t2
        let t4 = simpleFactory.createComponentAt(concreteComponent, t2.id);
        expect(simpleFactory.pool[0].id).to.equal(t.id);
        expect(simpleFactory.pool[1].id).to.equal(t4.id);
        expect(simpleFactory.pool[2].id).to.equal(t2.id);
        expect(simpleFactory.pool[3].id).to.equal(t3.id);
    });
    it("should be able to remove a component from the pool", () => {
        
        let t = simpleFactory.createComponent(concreteComponent);
        let t2 = simpleFactory.createComponent(concreteComponent);
        let t3 = simpleFactory.createComponent(concreteComponent);
        expect(simpleFactory.pool.length).to.equal(3);
        expect(simpleFactory.pool[0].id).to.equal(t.id);
        expect(simpleFactory.pool[1].id).to.equal(t2.id);
        expect(simpleFactory.pool[2].id).to.equal(t3.id);

        simpleFactory.removeComponent(t2.id);
        expect(simpleFactory.pool.length).to.equal(2);
        expect(simpleFactory.pool[0].id).to.equal(t.id);
        expect(simpleFactory.pool[1].id).to.equal(t3.id);

        simpleFactory.removeComponent(t.id);
        expect(simpleFactory.pool.length).to.equal(1);
        expect(simpleFactory.pool[0].id).to.equal(t3.id);

        simpleFactory.removeComponent(t3.id);
        expect(simpleFactory.pool.length).to.equal(0);
    });
});