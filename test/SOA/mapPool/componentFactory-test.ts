import "mocha";
import { expect } from "chai";
import { ComponentFactory, IComponent } from "../../../src/SOA/mapPool/ComponentFactory";

describe("Component Factory", () => {
    //for checking order of elements in the map
    function readPool(factory:ComponentFactory<IComponent>){
        let a=[];
        simpleFactory.pool.forEach((v, k)=>{
            a.push(v);
        });
        return a;
    }
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
        expect(simpleFactory.pool.get(c.id).id).to.equal(c.id);
        let c2 = simpleFactory.createComponent(concreteComponent);
        expect(c2.id).to.not.equal(c.id);
        expect(simpleFactory.pool.get(c2.id).id).to.equal(c2.id);
    });
    it("should hold components it instanciates in a pool", () => {
        let ids =[];
        for (let i = 0; i < 5; ++i) {
            let t = simpleFactory.createComponent(concreteComponent);
            ids.push(t);
        }
        expect(simpleFactory.size).to.equal(5);
        let a = readPool(simpleFactory);
        for(let i = 0; i < 5; ++i){
            expect(a[i].id).to.equal(ids[i].id);
        }
    });
    it("should be able to retrieve a component by its id", () => {
        let c = simpleFactory.createComponent(concreteComponent);
        let c2 = simpleFactory.createComponent(concreteComponent);
        let fetchedC = simpleFactory.getComponent(c2.id);
        expect(fetchedC.id).to.equal(c2.id);
        //undefined if id not found
        let fetchedC2 = simpleFactory.getComponent("123456-abc");
        expect(fetchedC2).to.equal(undefined);
    });
    it("should be able to insert a component after another one in pool", () => {
        let t = simpleFactory.createComponent(concreteComponent);
        let t2 = simpleFactory.createComponent(concreteComponent);
        let t3 = simpleFactory.createComponent(concreteComponent);
        let a = readPool(simpleFactory);
        expect(a[0].id).to.equal(t.id);
        expect(a[1].id).to.equal(t2.id);
        expect(a[2].id).to.equal(t3.id);

        //inserted t4 should be after t2
        let t4 = simpleFactory.createComponentAfter(concreteComponent, t2.id);
        a= readPool(simpleFactory);
        expect(a[0].id).to.equal(t.id);
        expect(a[1].id).to.equal(t2.id);
        expect(a[2].id).to.equal(t4.id);
        expect(a[3].id).to.equal(t3.id);
    });
    it("should be able to insert a component before another one in pool", () => {
        
        let t = simpleFactory.createComponent(concreteComponent);
        let t2 = simpleFactory.createComponent(concreteComponent);
        let t3 = simpleFactory.createComponent(concreteComponent);
        let a = readPool(simpleFactory);
        expect(a[0].id).to.equal(t.id);
        expect(a[1].id).to.equal(t2.id);
        expect(a[2].id).to.equal(t3.id);

        //inserted t4 should be before t2
        let t4 = simpleFactory.createComponentBefore(concreteComponent, t2.id);
        a = readPool(simpleFactory);
        expect(a[0].id).to.equal(t.id);
        expect(a[1].id).to.equal(t4.id);
        expect(a[2].id).to.equal(t2.id);
        expect(a[3].id).to.equal(t3.id);
    });
    it("should be able to remove a component from the pool and keep the same order", () => {
        let t = simpleFactory.createComponent(concreteComponent);
        let t2 = simpleFactory.createComponent(concreteComponent);
        let t3 = simpleFactory.createComponent(concreteComponent);
        expect(simpleFactory.size).to.equal(3);
        let a = readPool(simpleFactory);
        expect(a[0].id).to.equal(t.id);
        expect(a[1].id).to.equal(t2.id);
        expect(a[2].id).to.equal(t3.id);

        simpleFactory.removeComponent(t2.id);
        a = readPool(simpleFactory);
        expect(simpleFactory.size).to.equal(2);
        expect(a[0].id).to.equal(t.id);
        expect(a[1].id).to.equal(t3.id);

        simpleFactory.removeComponent(t.id);
        a = readPool(simpleFactory);
        expect(simpleFactory.size).to.equal(1);
        expect(a[0].id).to.equal(t3.id);

        simpleFactory.removeComponent(t3.id);
        expect(simpleFactory.size).to.equal(0);
    });
    it("should be able to remove all components from the pool", ()=>{
        //remove ref from the pool
        let t = simpleFactory.createComponent(concreteComponent);
        let t2 = simpleFactory.createComponent(concreteComponent);
        let t3 = simpleFactory.createComponent(concreteComponent);
        expect(simpleFactory.size).to.equal(3);
        simpleFactory.removeAll();
        expect(simpleFactory.size).to.equal(0);
    });

});