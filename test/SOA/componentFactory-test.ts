import "mocha";
import { expect } from "chai";
import { IComponent, IComponentFactory } from "../../src/SOA/interfaces";
import { ComponentFactoryMap} from "../../src/SOA/ComponentFactoryMap";
import { ComponentFactoryArray } from "../../src/SOA/ComponentFactoryArray";
import { ComponentFactoryFastMap } from "../../src/SOA/ComponentFactoryFastMap";

const poolImpl = [{"name":"array", "impl": ComponentFactoryArray},{"name":"map", "impl":ComponentFactoryMap},{"name":"fastMap", "impl":ComponentFactoryFastMap}];
poolImpl.forEach((p) => {
    describe("Component Factory with " + p.name, () => {
        //for checking content of the pool whether it is a hashMap or array -> convert it to an array
        //ie: for checking order of elements in the map
        function poolToArray(factory: IComponentFactory<IComponent>) {
            let a = [];
            factory.pool.forEach((v) => {
                a.push(v);
            });
            return a;
        }
        class concreteComponent implements IComponent {
            constructor(public id: string) { }
        }
        let simpleFactory: IComponentFactory<IComponent> = new p.impl<IComponent>();
        beforeEach(() => {
            simpleFactory = new p.impl<IComponent>();
        });
        it("should generate an id of the component it creates", () => {
            let c = simpleFactory.createComponent(concreteComponent);
            expect(c.id).to.not.be.null;
            expect(poolToArray(simpleFactory)[0].id).to.equal(c.id);
            let c2 = simpleFactory.createComponent(concreteComponent);
            expect(c2.id).to.not.equal(c.id);
            expect(poolToArray(simpleFactory)[1].id).to.equal(c2.id);
        });
        it("should hold components it instanciates in a pool", () => {
            let ids = [];
            for (let i = 0; i < 5; ++i) {
                let t = simpleFactory.createComponent(concreteComponent);
                ids.push(t);
            }
            expect(simpleFactory.size).to.equal(5);
            let a = poolToArray(simpleFactory);
            for (let i = 0; i < 5; ++i) {
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
            expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            expect(poolToArray(simpleFactory)[1].id).to.equal(t2.id);
            expect(poolToArray(simpleFactory)[2].id).to.equal(t3.id);

            //inserted t4 should be after t2
            let t4 = simpleFactory.createComponentAfter(concreteComponent, t2.id);
            expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            expect(poolToArray(simpleFactory)[1].id).to.equal(t2.id);
            expect(poolToArray(simpleFactory)[2].id).to.equal(t4.id);
            expect(poolToArray(simpleFactory)[3].id).to.equal(t3.id);
        });
        it("should be able to insert a component before another one in pool", () => {

            let t = simpleFactory.createComponent(concreteComponent);
            let t2 = simpleFactory.createComponent(concreteComponent);
            let t3 = simpleFactory.createComponent(concreteComponent);
            expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            expect(poolToArray(simpleFactory)[1].id).to.equal(t2.id);
            expect(poolToArray(simpleFactory)[2].id).to.equal(t3.id);

            //inserted t4 should be before t2
            let t4 = simpleFactory.createComponentBefore(concreteComponent, t2.id);
            expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            expect(poolToArray(simpleFactory)[1].id).to.equal(t4.id);
            expect(poolToArray(simpleFactory)[2].id).to.equal(t2.id);
            expect(poolToArray(simpleFactory)[3].id).to.equal(t3.id);
        });
        it("should be able to remove a component from the pool and keep the same order", () => {
            let t = simpleFactory.createComponent(concreteComponent);
            let t2 = simpleFactory.createComponent(concreteComponent);
            let t3 = simpleFactory.createComponent(concreteComponent);
            expect(simpleFactory.size).to.equal(3);
            expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            expect(poolToArray(simpleFactory)[1].id).to.equal(t2.id);
            expect(poolToArray(simpleFactory)[2].id).to.equal(t3.id);

            simpleFactory.removeComponent(t2.id);
            expect(simpleFactory.size).to.equal(2);
            expect(poolToArray(simpleFactory)[0].id).to.equal(t.id);
            expect(poolToArray(simpleFactory)[1].id).to.equal(t3.id);

            simpleFactory.removeComponent(t.id);
            expect(simpleFactory.size).to.equal(1);
            expect(poolToArray(simpleFactory)[0].id).to.equal(t3.id);

            simpleFactory.removeComponent(t3.id);
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
