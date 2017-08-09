import "mocha";
import { expect } from "chai";
import { IComponent, IComponentFactory } from "../../src/SOA/interfaces";
import { ComponentFactoryMap } from "../../src/SOA/ComponentFactoryMap";
import { ComponentFactoryArray } from "../../src/SOA/ComponentFactoryArray";
import { ComponentFactoryFastMap } from "../../src/SOA/ComponentFactoryFastMap";

import { TupleComponentSystem, ITupleComponent } from "../../src/SOA/MultiComponentSystem";

const poolImpl = [{"name":"array", "impl": ComponentFactoryArray},{"name":"map", "impl":ComponentFactoryMap},{"name":"fastMap", "impl":ComponentFactoryFastMap}];
poolImpl.forEach((p) => {
    describe("MultiComponentSystem with pool factory using " + p.name, () => {
        //for checking content of the pool whether it is a hashMap or array -> convert it to an array
        //ie: for checking order of elements in the map
        function poolToArray(factory: IComponentFactory<IComponent>) {
            let a = [];
            factory.pool.forEach((v) => {
                a.push(v);
            });
            return a;
        }
        class ConcreteComponent implements IComponent {
            public val = 1;
            constructor(public id: string) { }
        }

        class TupleComponent implements ITupleComponent {
            constructor(public id: string, public tuple: string[]) { }
        }

        let factories = [];
        let components1 = [];
        let components2 = [];
        let components3 = [];

        class MultiComponentSystem extends TupleComponentSystem {
            constructor(f1: IComponentFactory<IComponent>, f2: IComponentFactory<IComponent>, f3: IComponentFactory<IComponent>) {
                super(f1, f2, f3);
            }
            // process(idsTuples: IComponentFactory<TupleComponent>) {
            //     super.process(idsTuples);
            // }
            //sum all components val to the first component val in the tuple
            execute(components: ConcreteComponent[]) {
                let l = components.length;
                for (let i = 1; i < l; ++i) {
                    components[0].val += components[i].val;
                }
            }
        }

        let mCSystem: MultiComponentSystem;

        beforeEach(() => {
            let simpleFactory1 = new p.impl<ConcreteComponent>();
            let simpleFactory2 = new p.impl<ConcreteComponent>();
            let simpleFactory3 = new p.impl<ConcreteComponent>();

            factories = [];
            factories.push(simpleFactory1);
            factories.push(simpleFactory2);
            factories.push(simpleFactory3);

            components1 = [];
            components2 = [];
            components3 = [];

            mCSystem = new MultiComponentSystem(simpleFactory1, simpleFactory2, simpleFactory3);

            for (let i = 0; i < 10; ++i) {
                components1.push(simpleFactory1.createComponent(ConcreteComponent));
                components2.push(simpleFactory2.createComponent(ConcreteComponent));
                components3.push(simpleFactory3.createComponent(ConcreteComponent));
            }
        });
        it("should take an array of factories ref in constructor", () => {
            expect(mCSystem.factories[0].getComponent(components1[0].id).id).to.equal(components1[0].id);
            expect(mCSystem.factories[1].getComponent(components2[0].id).id).to.equal(components2[0].id);
            expect(mCSystem.factories[2].getComponent(components3[0].id).id).to.equal(components3[0].id);
        });
        it("should be able to query components by ids in the proper factory ", () => {
            let tuples = new p.impl<TupleComponent>();
            let q = tuples.createComponent(TupleComponent, [components1[0].id, components2[0].id, components3[0].id]);
            let result = mCSystem.getComponents(q);
            expect(result[0].id).to.equal(components1[0].id);
            expect(result[1].id).to.equal(components2[0].id);
            expect(result[2].id).to.equal(components3[0].id);
        });
        it("should be able to process all components tuples", () => {
            let tuples = new p.impl<TupleComponent>();
            for (let i = 0; i < 10; ++i) {
                expect(components1[i].val).to.equal(1);
                expect(components2[i].val).to.equal(1);
                expect(components3[i].val).to.equal(1);
                let t = tuples.createComponent(TupleComponent, [components1[i].id, components2[i].id, components3[i].id]);
            }
            mCSystem.process(tuples);
            for (let i = 0; i < 10; ++i) {
                expect(components1[i].val).to.equal(3);
            }
        });
    });
});