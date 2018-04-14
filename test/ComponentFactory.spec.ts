import { expect } from "chai";
import "mocha";
import { ComponentFactory } from "../src/ComponentFactory";
import { IComponent, IComponentFactory } from "../src/interfaces";

describe("Component Factory", () => {
    class ConcreteComponent implements IComponent {
        constructor(public entityId: number, public active: boolean) { }
    }
    class MultiPropComponent implements IComponent {
        constructor(public entityId: number, public active: boolean, public prop1: string, public prop2: number, public prop3: { x: number, y: number }) { }
    }
    class ComponentWithObjects implements IComponent {
        constructor(public entityId: number, public active: boolean, public prop1: string, public lObj: IlitteralObj, public instantiatedObj: InstantiatedObj, public nestedObj: NestedObj, public date: Date, public array1, public arrayOfObject: NestedObj[])  { }
    }

    interface IlitteralObj {
        x: number;
        y: number;
    }
    class InstantiatedObj {
        constructor(public x: number, public y: number) { }
    }
    class NestedObj {
        constructor(public obj1: InstantiatedObj) {
        }
    }

    const defaultX = 1;
    const defaultY = 2;

    let simpleFactory: ComponentFactory<MultiPropComponent>;

    let objectFactory: ComponentFactory<ComponentWithObjects>;

    let defaultComponentWithObjects;

    beforeEach(() => {
        simpleFactory = new ComponentFactory<MultiPropComponent>(5, new MultiPropComponent(0, false, "default string", 111, { x: 0.0, y: 0.0 }));

        const defaultLO1 = { x: defaultX, y: defaultY };
        const defaultIO1 = new InstantiatedObj(defaultX, defaultY);
        const defaultNO1 = new NestedObj(new InstantiatedObj(defaultX, defaultY));
        const defaultProp1 = "stringProp1";
        const defaultArr = [defaultX, defaultY];
        const defaultNOArr = [new NestedObj(new InstantiatedObj(defaultX, defaultY)), new NestedObj(new InstantiatedObj(defaultX, defaultY))];

        defaultComponentWithObjects = new ComponentWithObjects(0, false, defaultProp1, defaultLO1, defaultIO1, defaultNO1, new Date(), defaultArr, defaultNOArr);

        objectFactory = new ComponentFactory<ComponentWithObjects>(10, defaultComponentWithObjects);
    });

    describe("create", () => {
        it("should return a component with the entityId provided", () => {
            const id = 1;
            const mc = objectFactory.create(id, true);
            expect(mc.entityId).to.equal(id);
            expect(mc).to.have.ownPropertyDescriptor("array1");
            expect(mc).to.have.ownPropertyDescriptor("arrayOfObject");
            expect(mc).to.have.ownPropertyDescriptor("prop1");
            expect(mc).to.have.ownPropertyDescriptor("date");
            expect(mc).to.have.ownPropertyDescriptor("lObj");
            expect(mc).to.have.ownPropertyDescriptor("instantiatedObj");
            expect(mc).to.have.ownPropertyDescriptor("nestedObj");
        });
        it("should create the component after the last created component", () => {
            const c1 = objectFactory.create(1, true);
            expect(objectFactory.values[0]).to.equal(c1);
            const c2 = objectFactory.create(2, true);
            expect(objectFactory.values[1]).to.equal(c2);
        });
        it("created components should be able to be created at the first spot available", () => {
            simpleFactory.create(1, true);
            simpleFactory.create(2, true);
            simpleFactory.free(1);
            // should be created at the place component 1 were before it was freed
            simpleFactory.create(3, true, true);
            expect(simpleFactory.values[0].entityId).to.equal(3);
            expect(simpleFactory.values[1].entityId).to.equal(2);
        });
        it("creating 2 components with the same entity Id throw an error ", () => {
            const initialSize = simpleFactory.size;
            const c = simpleFactory.create(1, false);
            const noUsedVariable = expect(c.entityId).to.not.be.null;
            expect(simpleFactory.values[0].entityId).to.equal(c.entityId);
            try {
                simpleFactory.create(1, false);
            } catch (err) {
                expect(err.message).to.equal("a component with this entityId already exists");
            }
            expect(simpleFactory.values[0].entityId).to.equal(c.entityId);
            expect(simpleFactory.size).to.equal(initialSize);
        });
        it("should increment the iterationLength only if the components is created at an index greater than iterationLength", () => {
            expect(simpleFactory.activeLength).to.equal(0);
            simpleFactory.create(1, false);
            expect(simpleFactory.activeLength).to.equal(1);
            simpleFactory.create(2, false);
            expect(simpleFactory.activeLength).to.equal(2);
            simpleFactory.free(1);
            expect(simpleFactory.activeLength).to.equal(2);
            // create component 3 at index 0
            simpleFactory.create(3, false, true);
            expect(simpleFactory.activeLength).to.equal(2);
        });
        it("createFrom(entityId) should create and return a deep copy of the component (recursive copy)", () => {
            const xCoord = 3;
            const yCoord = 4;
            expect(defaultX).to.not.equal(xCoord);
            expect(defaultY).to.not.equal(yCoord);

            const comp1 = objectFactory.create(1, true);
            comp1.prop1 = "comp1 string";
            comp1.array1 = [xCoord, yCoord];
            comp1.date = new Date();
            comp1.lObj = { x: xCoord, y: yCoord };
            comp1.instantiatedObj = new InstantiatedObj(xCoord, yCoord);
            comp1.nestedObj = new NestedObj(new InstantiatedObj(xCoord, yCoord));
            comp1.arrayOfObject = [new NestedObj(new InstantiatedObj(xCoord, yCoord)), new NestedObj(new InstantiatedObj(xCoord, yCoord))];

            const newCompId = 2;
            const c2 = objectFactory.createFromComponent(newCompId, comp1);
            expect(c2.entityId).to.equal(newCompId);
            const comp2 = objectFactory.get(newCompId);
            expect(comp2).to.not.equal(undefined);

            expect(objectFactory.get(1)).to.not.equal(comp2);

            expect(comp2.prop1).to.equal(comp1.prop1);

            expect(comp2.array1.length).to.equal(2);
            expect(comp2.array1[0]).to.equal(xCoord);
            expect(comp2.array1[1]).to.equal(yCoord);

            expect(new Date(comp2.date)).to.deep.equal(new Date(comp1.date));

            expect(comp2.lObj.x).to.equal(xCoord);
            expect(comp2.lObj.y).to.equal(yCoord);

            expect(comp2.instantiatedObj.x).to.equal(xCoord);
            expect(comp2.instantiatedObj.y).to.equal(yCoord);

            expect(comp2.nestedObj.obj1.x).to.equal(xCoord);
            expect(comp2.nestedObj.obj1.y).to.equal(yCoord);

            expect(comp2.arrayOfObject.length).to.equal(2);
            expect(comp2.arrayOfObject[1].obj1.x).to.equal(xCoord);
            expect(comp2.arrayOfObject[1].obj1.y).to.equal(yCoord);

            comp2.prop1 = "modified";
            expect(comp2.prop1).to.not.equal(comp1.prop1);

            comp2.date =  new Date();
            expect(comp2.date).to.not.equal(comp1.date);

            comp2.instantiatedObj.x += 10;
            expect(comp2.instantiatedObj.x).to.not.equal(comp1.instantiatedObj.x);

            comp2.lObj.x += 10;
            expect(comp2.lObj.x).to.not.equal(comp1.lObj.x);

            comp2.array1[0] += 10;
            expect(comp2.array1[0]).to.not.equal(comp1.array1[0]);

            comp2.arrayOfObject[0].obj1.x += 10;
            expect(comp2.arrayOfObject[0].obj1.x).to.not.equal(comp1.arrayOfObject[0].obj1.x);

            comp2.nestedObj.obj1.x += 10;
            expect(comp2.nestedObj.obj1.x).to.not.equal(comp1.nestedObj.obj1.x);
        });
        it("should recycle zeroed components witch holds nested objects", () => {
            const c = objectFactory.create(1, true);
            objectFactory.free(1);
            objectFactory.create(2, true);
            expect(objectFactory.get(2).nestedObj.obj1.x).to.equal(defaultX);
        });
    });
    describe("zeroed component", () => {
        it("its parameters should have the same value as the default constructor", () => {
            const factory = new ComponentFactory<ComponentWithObjects>(5, defaultComponentWithObjects);
            factory.values.forEach((c) => {
                Object.keys(defaultComponentWithObjects).forEach((p) => {
                    if (defaultComponentWithObjects[p] instanceof Date) {
                        expect(new Date(c[p])).to.deep.equal(new Date(defaultComponentWithObjects[p]));
                    } else {
                        expect(c[p]).to.deep.equal(defaultComponentWithObjects[p]);
                    }
                });
            });
        });
        it("should be created and fill the values array at the ComponentFactory instantiation", () => {
            const factory = new ComponentFactory<ConcreteComponent>(5, new ConcreteComponent(0, false));
            expect(factory.values.length).to.equal(5);
            factory.values.forEach((c) => {
                expect(c.entityId).to.equal(0);
            });
        });
        it("each component should be a different instance", () => {
            it("zeroed component should not share references", () => {
                simpleFactory.values[0].prop3.x += 1.0;
                expect(simpleFactory.values[1].prop3.x).to.not.equal(simpleFactory.values[0].prop3.x);
                expect(simpleFactory.values[0].prop3.x).to.equal(1);
            });
        });
        it("zeored component should have an entityId of 0", () => {
            const factory = new ComponentFactory<IComponent>(5, new ConcreteComponent(1, true));
            for (let i = 0; i < 5; ++i) {
                expect(factory.values[i].entityId).to.equal(0);
            }
        });
        it("zeroed component should be inactive ", () => {
            const factory = new ComponentFactory<IComponent>(5, new ConcreteComponent(1, true));
            for (let i = 0; i < 5; ++i) {
                expect(factory.values[i].active).to.equal(false);
            }
        });
        it("zeroed component should not be referenced in the key map", () => {
            const factory = new ComponentFactory<IComponent>(5, new ConcreteComponent(0, false));
            expect(factory.values.length).to.equal(5);
            expect(factory.keys.size).to.equal(0);
        });
    });
    describe("get", () => {
        it("should be able to retrieve a component by entity id", () => {
            const c = simpleFactory.create(1, true);
            const c2 = simpleFactory.create(2, true);
            const fetchedC = simpleFactory.get(c2.entityId);
            expect(fetchedC.entityId).to.equal(c2.entityId);
            // undefined if id not found
            const fetchedC2 = simpleFactory.get(123456);
            expect(fetchedC2).to.equal(undefined);
        });
    });
    describe("delete", () => {
        it("should zeroed the component when we free it", () => {
            const initialSize = simpleFactory.size;
            simpleFactory.create(1, false);
            expect(simpleFactory.has(1)).to.equal(true);
            // id should be found in order to delete it first
            expect(simpleFactory.free(1)).to.equal(true);
            // size of the pool should not be changed since we zeroed the component instead of removing it from the pool
            expect(simpleFactory.size).to.equal(initialSize);
            // we created only one component so it was at the first index of the values array, it is now zeroed
            expect(simpleFactory.values[0].entityId).to.equal(0);
            // the component should not be referenced anymore
            expect(simpleFactory.has(1)).to.equal(false);
        });
        it("free should decrement the lastActiveIndex only if it is the last one ", () => {
            const initialSize = simpleFactory.size;
            simpleFactory.create(1, false);
            expect(simpleFactory.activeLength).to.equal(1);
            expect(simpleFactory.free(1)).to.equal(true);
            expect(simpleFactory.activeLength).to.equal(0);

            simpleFactory.create(1, false);
            simpleFactory.create(2, false);
            expect(simpleFactory.activeLength).to.equal(2);
            expect(simpleFactory.free(1)).to.equal(true);
            // still equal 2 since the one we removed is not the last one
            expect(simpleFactory.activeLength).to.equal(2);
        });
        it("reused component should have default parameters values", () => {
            const comp1 = simpleFactory.create(1, true);
            comp1.prop1 = "p1";
            comp1.prop3.x = 100;
            comp1.prop3.y = 200;
            const c1 = simpleFactory.get(1);
            expect(c1.prop1).to.equal("p1");
            expect(c1.prop3.x).to.equal(100);
            expect(c1.prop3.y).to.equal(200);

            simpleFactory.create(2, true);
            simpleFactory.free(1);
            const c3 = simpleFactory.create(3, true, true);

            expect(c3.prop1).to.not.equal("p1");
            expect(c3.prop3.x).to.not.equal(100);
            expect(c3.prop3.y).to.not.equal(200);
        });
        it("clear should remove everyting from the pool", () => {
            simpleFactory.create(1, true);
            simpleFactory.create(2, false);
            expect(simpleFactory.size).to.equal(5);
            simpleFactory.clear();
            expect(simpleFactory.size).to.equal(0);
        });
        it("free range of components should avoid having to call computeLastActiveIndex if the range reach the end", () => {
            simpleFactory.create(1, true);
            simpleFactory.create(2, false);
            simpleFactory.create(3, true);
            simpleFactory.create(4, true);
            simpleFactory.freeRangeComponents(2, 4);
            expect(simpleFactory.activeLength).to.equal(1);
        });
    });
    describe("update", () => {
        it("should be able to active all created components", () => {
            simpleFactory.create(1, false);
            simpleFactory.create(2, false);
            simpleFactory.activateAll(true);
            expect(simpleFactory.values[0].active).to.equal(true);
            expect(simpleFactory.values[1].active).to.equal(true);
        });
        it("should be able to desactivate all created components", () => {
            simpleFactory.create(1, true);
            simpleFactory.create(2, true);
            simpleFactory.activateAll(false);
            expect(simpleFactory.values[0].active).to.equal(false);
            expect(simpleFactory.values[1].active).to.equal(false);
        });
        it("should keep track of the nb of created components", () => {
            expect(simpleFactory.nbCreated).to.equal(0);
            simpleFactory.create(1, false);
            expect(simpleFactory.nbCreated).to.equal(1);
            simpleFactory.create(2, true);
            expect(simpleFactory.nbCreated).to.equal(2);

            simpleFactory.free(2);
            expect(simpleFactory.nbCreated).to.equal(1);

            simpleFactory.create(2, true);
            simpleFactory.free(1);
            expect(simpleFactory.nbCreated).to.equal(1);
            simpleFactory.create(1, true, true);
            expect(simpleFactory.nbCreated).to.equal(2);
            simpleFactory.free(1);
            expect(simpleFactory.nbCreated).to.equal(1);
        });
        it("should keep track of the number of active components", () => {
            expect(simpleFactory.nbActive).to.equal(0);
            simpleFactory.create(1, true);
            expect(simpleFactory.nbActive).to.equal(1);
            simpleFactory.create(2, true);
            expect(simpleFactory.nbActive).to.equal(2);
            simpleFactory.activate(2, false);
            expect(simpleFactory.nbActive).to.equal(1);

            simpleFactory.create(3, false);
            expect(simpleFactory.nbActive).to.equal(1);

            simpleFactory.create(4, true);
            expect(simpleFactory.nbActive).to.equal(2);

            simpleFactory.free(2);
            expect(simpleFactory.nbActive).to.equal(2);
            simpleFactory.free(1);
            expect(simpleFactory.nbActive).to.equal(1);

            simpleFactory.activate(4, false);
            expect(simpleFactory.nbActive).to.equal(0);

            simpleFactory.activateAll(true);
            expect(simpleFactory.nbActive).to.equal(simpleFactory.nbCreated);
        });
        it("should keep track of the number of inactive components", () => {

            expect(simpleFactory.nbInactive).to.equal(0);
            simpleFactory.create(1, true);
            expect(simpleFactory.nbInactive).to.equal(0);
            simpleFactory.create(2, false);
            expect(simpleFactory.nbInactive).to.equal(1);

            simpleFactory.create(3, false);
            expect(simpleFactory.nbInactive).to.equal(2);

            simpleFactory.free(2);
            expect(simpleFactory.nbInactive).to.equal(1);

            simpleFactory.activate(3, true);
            expect(simpleFactory.nbInactive).to.equal(0);

            simpleFactory.activateAll(false);
            expect(simpleFactory.nbInactive).to.equal(simpleFactory.nbCreated);
        });
        it("should keep track of the number of free slot", () => {

            expect(simpleFactory.nbFreeSlot).to.equal(5);
            simpleFactory.create(1, true);
            expect(simpleFactory.nbFreeSlot).to.equal(4);
            simpleFactory.create(2, false);
            expect(simpleFactory.nbFreeSlot).to.equal(3);
            simpleFactory.free(1);
            expect(simpleFactory.nbFreeSlot).to.equal(4);
            simpleFactory.create(1, true, true);
            expect(simpleFactory.nbFreeSlot).to.equal(3);
        });
        it("resize the pool down", () => {
            const c1 = simpleFactory.create(1, true);
            c1.prop1 = "non zeroed comp";

            expect(simpleFactory.size).to.equal(5);
            simpleFactory.resizeTo(3);
            expect(simpleFactory.size).to.equal(3);

            expect(simpleFactory.values[0].entityId).to.equal(1);
            expect(simpleFactory.values[0].prop1).to.equal("non zeroed comp");

            for (let i = 1; i < simpleFactory.size; ++i) {
                expect(simpleFactory[i]).to.equal(undefined);
            }
        });
        it("resize the pool up", () => {
            const c1 = simpleFactory.create(1, true);
            const c2 = simpleFactory.create(2, true);
            c1.prop1 = "non zeroed comp";
            c2.prop1 = "non zeroed comp";

            expect(simpleFactory.size).to.equal(5);
            expect(simpleFactory.values.length).to.equal(5);
            simpleFactory.resizeTo(10);
            expect(simpleFactory.size).to.equal(10);
            expect(simpleFactory.values.length).to.equal(10);

            // should keep created components
            expect(simpleFactory.values[0].entityId).to.equal(1);
            expect(simpleFactory.values[0].prop1).to.equal("non zeroed comp");
            expect(simpleFactory.values[1].entityId).to.equal(2);
            expect(simpleFactory.values[1].prop1).to.equal("non zeroed comp");
            for (let i = 2; i < simpleFactory.size; ++i) {
                expect(simpleFactory.values[i].entityId).to.equal(0);
            }
            // make sure object in component are distinct copy and not a reference
            simpleFactory.values[simpleFactory.size - 1].prop3.x += 1;
            expect(simpleFactory.values[simpleFactory.size - 2].prop3.x).to.not.equal(simpleFactory.values[simpleFactory.size - 1].prop3.x);
        });
        it("expand pool by + x", () => {
            const prevSize = simpleFactory.size;
            const c1 = simpleFactory.create(1, true);
            simpleFactory.expand(10);
            expect(simpleFactory.size).to.equal(prevSize + 10);
        });
        it("expand pool by - x", () => {
            const prevSize = simpleFactory.size;
            const c1 = simpleFactory.create(1, true);
            simpleFactory.expand(-5);
            expect(simpleFactory.size).to.equal(prevSize - 5);
        });
        it("computeLastActiveIndex should set the lastActiveIndex to the index of the last created (non zeroed) component", () => {
            simpleFactory.create(1, true);
            simpleFactory.create(2, false);
            simpleFactory.create(3, true);
            simpleFactory.create(4, true);
            expect(simpleFactory.activeLength).to.equal(4);
            simpleFactory.free(3);
            simpleFactory.free(4);
            expect(simpleFactory.activeLength).to.equal(3);
            simpleFactory.computeActiveLength();
            expect(simpleFactory.activeLength).to.equal(2);
        });
    });
});
