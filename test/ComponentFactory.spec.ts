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
        constructor(public entityId: number, public active: boolean, public prop1: string, public lObj: IlitteralObj, public instantiatedObj: InstantiatedObj, public nestedObj: NestedObj, public date: Date, public array1, public arrayOfObject: NestedObj[]) { }
    }

    interface IlitteralObj {
        x: number;
        y: number;
        f: () => number;
    }
    class InstantiatedObj {
        constructor(public x: number, public y: number) { }
        public f = () => {
            return this.x + this.y;
        }
    }
    class NestedObj {
        constructor(public obj1: InstantiatedObj) {
        }
        public f = () => {
            return this.obj1.x + this.obj1.y;
        }
    }

    const defaultX = 1;
    const defaultY = 2;

    let simpleFactory: ComponentFactory<MultiPropComponent>;

    let objectFactory: ComponentFactory<ComponentWithObjects>;

    beforeEach(() => {
        simpleFactory = new ComponentFactory<MultiPropComponent>(5, MultiPropComponent, "default string", "default string", { x: 0.0, y: 0.0 });

        const defaultLO1 = {x: defaultX, y: defaultY, f: () => this.x + this.y };
        const defaultNO1 = new NestedObj(new InstantiatedObj(defaultX, defaultY));
        const defaultProp1 = "stringProp1";
        const defaultArr = [defaultX, defaultY];
        const defaultNOArr = [defaultLO1, defaultLO1];

        objectFactory = new ComponentFactory<ComponentWithObjects>(10,  ComponentWithObjects, defaultProp1, defaultLO1, defaultNO1, defaultArr, defaultNOArr);
    });
    it("should be able to retrieve a component by entity id", () => {
        const c = simpleFactory.create(1, true);
        const c2 = simpleFactory.create(2, true);
        const fetchedC = simpleFactory.get(c2.entityId);
        expect(fetchedC.entityId).to.equal(c2.entityId);
        // undefined if id not found
        const fetchedC2 = simpleFactory.get(123456);
        expect(fetchedC2).to.equal(undefined);
    });
    it("should be able to recycle zeroed components to create new one", () => {
        const mc = simpleFactory.create(1, true);
        expect(mc.entityId).to.equal(1);
        expect(mc.prop1).to.equal("default string");
        expect(mc.prop2).to.equal("default string");
        expect(mc.prop3.x).to.equal(0.0);
        expect(mc.prop3.y).to.equal(0.0);

        mc.prop3.x = 1.0;
        for (let i = 1; i < simpleFactory.length; ++i) {
            expect(simpleFactory.values[i].prop3.x).to.equal(0.0);
        }
    });
    it("zeroed component should not share references", () => {
        simpleFactory.values[0].prop3.x += 1.0;
        expect(simpleFactory.values[1].prop3.x).to.not.equal(simpleFactory.values[0].prop3.x);
    });
    it("should be able to create a number of zeroed components at instanciation ", () => {
        const factory = new ComponentFactory<IComponent>(5, ConcreteComponent );
        expect(factory.values.length).to.equal(5);
    });
    it("zeored component should have a key starting by 0", () => {
        const factory = new ComponentFactory<IComponent>(5, ConcreteComponent);
        for (let i = 0; i < 5; ++i) {
            expect(factory.values[i].entityId).to.equal(0);
        }
    });
    it("should be able to provid zeroed value for component proreties ", () => {

        for (let i = 0; i < 5; ++i) {
            expect(simpleFactory.values[i].prop1).to.equal("default string");
            expect(simpleFactory.values[i].prop2).to.equal("default string");
            expect(simpleFactory.values[i].prop3.x).to.equal(0.0);
            expect(simpleFactory.values[i].prop3.y).to.equal(0.0);
        }
    });
    it("zeroed component should be inactive ", () => {
        for (let i = 0; i < 5; ++i) {
            expect(simpleFactory.values[i].active).to.equal(false);
        }
    });
    it("zeroed component should not be referenced in the key map", () => {
        const factory = new ComponentFactory<IComponent>(5, ConcreteComponent);
        expect(factory.values.length).to.equal(5);
        expect(factory.keys.size).to.equal(0);

    });
    it("created components should be created at the first spot available ", () => {
        simpleFactory.create(1, false, "p1", 2, { x: 1, y: 3 });
        expect(simpleFactory.size).to.equal(5);
        expect(simpleFactory.values[0].entityId).to.equal(1);
    });
    it("creating 2 components with the same entity Id should create only one component ", () => {
        const initialSize = simpleFactory.size;
        const c = simpleFactory.create(1, false, "p1", 2, { x: 0.0, y: 0.0 });
        const noUsedVariable = expect(c.entityId).to.not.be.null;
        expect(simpleFactory.values[0].entityId).to.equal(c.entityId);
        const c2 = simpleFactory.create(1, false, "p2", 3, { x: 1.0, y: 1.0 });
        expect(c2.entityId).to.equal(c.entityId);
        expect(simpleFactory.values[0].entityId).to.equal(c.entityId);
        expect(simpleFactory.size).to.equal(initialSize);
        expect(simpleFactory.get(1).prop1).to.equal(c2.prop1);
    });
    it("should increment the createdLength only if the components is created at an index greater than createdLength", () => {
        expect(simpleFactory.iterationLength).to.equal(0);
        simpleFactory.create(1, false, "p1", 2, { x: 0.0, y: 0.0 });
        expect(simpleFactory.iterationLength).to.equal(1);
        simpleFactory.create(2, false, "p1", 2, { x: 0.0, y: 0.0 });
        expect(simpleFactory.iterationLength).to.equal(2);
        simpleFactory.create(1, false, "p1", 3, { x: 0.0, y: 0.0 });
        expect(simpleFactory.iterationLength).to.equal(2);
    });
    it("should zeroed the component when we 'remove' ", () => {
        const initialSize = simpleFactory.size;
        simpleFactory.create(1, false, "p1", 2, { x: 0.0, y: 0.0 });
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
    it("removed components should decrement the createdLength only if it is the last one ", () => {
        const initialSize = simpleFactory.size;
        simpleFactory.create(1, false, "p1", 2, { x: 0.0, y: 0.0 });
        expect(simpleFactory.iterationLength).to.equal(1);
        expect(simpleFactory.free(1)).to.equal(true);
        expect(simpleFactory.iterationLength).to.equal(0);

        simpleFactory.create(1, false, "p1", 2, { x: 0.0, y: 0.0 });
        simpleFactory.create(2, false, "p1", 2, { x: 0.0, y: 0.0 });
        expect(simpleFactory.iterationLength).to.equal(2);
        expect(simpleFactory.free(1)).to.equal(true);
        // still equal 2 since the one we removed is not the last one
        expect(simpleFactory.iterationLength).to.equal(2);
    });
    it("reused component should have default parameters value", () => {

    });
    it("should be able to create components with an active proprety and other proreties", () => {
        const mcFactory = new ComponentFactory<MultiPropComponent>(2, MultiPropComponent, "default string", "default string", { x: 0.0, y: 0.0 });
        const mc = mcFactory.create(1, true);
        expect(mc.active).to.equal(true);
        expect(mc.entityId).to.equal(1);
        expect(mc.prop1).to.equal("default string");
        expect(mc.prop2).to.equal("default string");
        expect(mc.prop3.x).to.equal(0.0);
        expect(mc.prop3.y).to.equal(0.0);
        const mc2 = mcFactory.create(1, false);
        expect(mc2.active).to.equal(false);
    });
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
        simpleFactory.create(2, true);
        expect(simpleFactory.nbCreated).to.equal(2);

        simpleFactory.free(2);
        expect(simpleFactory.nbCreated).to.equal(1);
        simpleFactory.free(1);
        expect(simpleFactory.nbCreated).to.equal(0);
    });
    it("should keep track of the number of active components", () => {
        expect(simpleFactory.nbActive).to.equal(0);
        simpleFactory.create(1, true);
        expect(simpleFactory.nbActive).to.equal(1);
        simpleFactory.create(2, true);
        expect(simpleFactory.nbActive).to.equal(2);
        simpleFactory.create(2, true);
        expect(simpleFactory.nbActive).to.equal(2);
        simpleFactory.create(2, false);
        expect(simpleFactory.nbActive).to.equal(1);
        simpleFactory.create( 3, false);
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
        simpleFactory.create(2, false);
        expect(simpleFactory.nbInactive).to.equal(1);
        simpleFactory.create(2, true);
        expect(simpleFactory.nbInactive).to.equal(0);
        simpleFactory.create(3, false);
        expect(simpleFactory.nbInactive).to.equal(1);

        simpleFactory.create(4, false);
        expect(simpleFactory.nbInactive).to.equal(2);

        simpleFactory.free(2);
        expect(simpleFactory.nbInactive).to.equal(2);
        simpleFactory.free(3);
        expect(simpleFactory.nbInactive).to.equal(1);

        simpleFactory.activate(4, true);
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
        simpleFactory.create( 2, true);
        expect(simpleFactory.nbFreeSlot).to.equal(3);
    });
    it("resize the pool down", () => {
        expect(simpleFactory.size).to.equal(5);
        simpleFactory.resize(3);
        expect(simpleFactory.size).to.equal(3);
        for (let i = 0; i < simpleFactory.size; ++i) {
            expect(simpleFactory[i]).to.equal(undefined);
        }
    });
    it("resize the pool up", () => {
        expect(simpleFactory.size).to.equal(5);
        simpleFactory.resize(10);
        expect(simpleFactory.size).to.equal(10);
        for (let i = 0; i < simpleFactory.size; ++i) {
            expect(simpleFactory.values[i].entityId).to.equal(0);
        }
        // make sure object in component are distinct copy and not a reference
        simpleFactory.values[simpleFactory.size - 1].prop3.x += 1;
        expect(simpleFactory.values[simpleFactory.size - 2].prop3.x).to.not.equal(simpleFactory.values[simpleFactory.size - 1].prop3.x);
    });
    it("clear should remove everyting from the pool", () => {
        simpleFactory.create(1, true);
        simpleFactory.create(2, false);
        expect(simpleFactory.size).to.equal(5);
        simpleFactory.clear();
        expect(simpleFactory.size).to.equal(0);
    });
    it("updateIterationLength should set the iterationLength to the index of the last created (non zeroed) component", () => {
        simpleFactory.create(1, true);
        simpleFactory.create(2, false);
        simpleFactory.create(3, true);
        simpleFactory.create(4, true);
        expect(simpleFactory.iterationLength).to.equal(4);
        simpleFactory.free(3);
        simpleFactory.free(4);
        expect(simpleFactory.iterationLength).to.equal(3);
        simpleFactory.updateIterationLength();
        expect(simpleFactory.iterationLength).to.equal(2);
    });
    it("free range of components should avoid having to call updateIterationLength if the range reach the end", () => {
        simpleFactory.create(1, true);
        simpleFactory.create(2, false);
        simpleFactory.create(3, true);
        simpleFactory.create(4, true);
        simpleFactory.freeRangeComponents(2, 4);
        expect(simpleFactory.iterationLength).to.equal(1);
    });
    it("createFrom(entityId) should create and return a deep copy of the component (recursive copy)", () => {
        const x = 3;
        const y = 4;
        expect(defaultX).to.not.equal(x);
        expect(defaultY).to.not.equal(y);

        const comp1 = objectFactory.create(1, true);
        comp1.prop1 = "comp1 string";
        comp1.array1 = [x, y];
        comp1.date = new Date();
        comp1.lObj = { "x": x, "y": y, f: function() { return this.x + this.y; }};
        comp1.instantiatedObj = new InstantiatedObj(x, y);
        comp1.nestedObj = new NestedObj(new InstantiatedObj(x, y));
        comp1.arrayOfObject = [ new NestedObj(new InstantiatedObj(x, y)), new NestedObj(new InstantiatedObj(x, y)) ];

        const newCompId = 2;
        const c2 = objectFactory.createFromComponent(newCompId, comp1);
        expect(c2.entityId).to.equal(newCompId);
        const comp2 = objectFactory.get(newCompId);
        expect(comp2).to.not.equal(undefined);

        expect(objectFactory.get(1)).to.not.equal(comp2);

        expect(comp2.prop1).to.equal(comp1.prop1);

        expect(comp2.array1.length).to.equal(2);
        expect(comp2.array1[0]).to.equal(x);
        expect(comp2.array1[1]).to.equal(y);

        expect(comp2.date).to.equal(comp1.date);

        expect(comp2.lObj.x).to.equal(x);
        expect(comp2.lObj.y).to.equal(y);
        expect(comp2.lObj.f()).to.equal(x + y);

        expect(comp2.instantiatedObj.x).to.equal(x);
        expect(comp2.instantiatedObj.y).to.equal(y);
        expect(comp2.instantiatedObj.f()).to.equal(x + y);

        expect(comp2.nestedObj.obj1.x).to.equal(x);
        expect(comp2.nestedObj.obj1.y).to.equal(y);
        expect(comp2.nestedObj.obj1.f()).to.equal(x + y);
        expect(comp2.nestedObj.f()).to.equal(x + y);

        expect(comp2.arrayOfObject.length).to.equal(2);
        expect(comp2.arrayOfObject[1].f()).to.equal(x + y);
        expect(comp2.arrayOfObject[1].obj1.x).to.equal(x);
        expect(comp2.arrayOfObject[1].obj1.y).to.equal(y);
        expect(comp2.arrayOfObject[1].obj1.f()).to.equal(x + y);

    });
});
