import "mocha";
import { expect } from "chai";
import { IComponent, IComponentFactory  } from "../src/interfaces";
import { ComponentFactory} from "../src/ComponentFactory";

describe("Togglable Component Factory", () => {
    class concreteComponent implements IComponent {
        constructor(public entityId: string, public active: boolean) { }
    }
    class multiPropComponent implements IComponent {
        constructor(public entityId: string, public active:boolean, public prop1: string, public prop2: number, public prop3: { "x": 0, "y": 2 }) { }
    }
        let simpleFactory = new ComponentFactory<IComponent>(5, multiPropComponent);
        let multiPropFactory = new ComponentFactory<multiPropComponent>(5, multiPropComponent, "default string", "default string", {x: 0.0, y: 0.0});
    beforeEach(() => {
        multiPropFactory = new ComponentFactory<multiPropComponent>(5, multiPropComponent, "default string", "default string", {x: 0.0, y: 0.0});        
        simpleFactory = new ComponentFactory<IComponent>(5, multiPropComponent);
    });
    it("should be able to retrieve a component by entity id", () => {
        let c = simpleFactory.create(multiPropComponent, "1", true);
        let c2 = simpleFactory.create(multiPropComponent, "2", true);
        let fetchedC = simpleFactory.get(c2.entityId);
        expect(fetchedC.entityId).to.equal(c2.entityId);
        //undefined if id not found
        let fetchedC2 = simpleFactory.get("123456-abc");
        expect(fetchedC2).to.equal(undefined);
    });
    it("should be able to create components with various number of arguments", () => {
       
        let mc = multiPropFactory.create(multiPropComponent, "c1", true, "p1", 2, { "x": 1, "y": 3 });
        expect(mc.entityId).to.equal("c1");
        expect(mc.prop1).to.equal("p1");
        expect(mc.prop2).to.equal(2);
        expect(mc.prop3.x).to.equal(1);
        expect(mc.prop3.y).to.equal(3);
    });
    it("should be able to create a number of zeroed components at instanciation ", () => {
        let simpleFactory = new ComponentFactory<IComponent>(5, multiPropComponent);
        expect(simpleFactory.values.length).to.equal(5);
        
    });
    it("zeored component should have a key starting by 0", () => {
        let simpleFactory = new ComponentFactory<IComponent>(5, multiPropComponent);
        for(let i = 0; i < 5 ; ++i) {
            expect(simpleFactory.values[i].entityId).to.equal('0');
        }
    });
    it("should be able to provid zeroed value for component proreties ", () => {
        
        for(let i = 0; i < 5 ; ++i) {
            expect(multiPropFactory.values[i].prop1).to.equal("default string");
            expect(multiPropFactory.values[i].prop2).to.equal("default string");
            expect(multiPropFactory.values[i].prop3.x).to.equal(0.0);
            expect(multiPropFactory.values[i].prop3.y).to.equal(0.0);
        }
    });
    it("zeroed component should be inactive ", () => {
        for(let i = 0; i < 5 ; ++i) {
            expect(multiPropFactory.values[i].active).to.equal(false);
        }
    });
    it("zeroed component should not be referenced in the key map", () => {
        let simpleFactory = new ComponentFactory<IComponent>(5, multiPropComponent);
        expect(simpleFactory.values.length).to.equal(5);
        expect(simpleFactory.keys.size).to.equal(0);
        
    });
    it("created components should be created at the first spot available ", () => {
        multiPropFactory.create(multiPropComponent, "c1", false, "p1", 2, { "x": 1, "y": 3 });
        expect(multiPropFactory.size).to.equal(5);
        expect(multiPropFactory.values[0].entityId).to.equal("c1");        
    });
    it("creating 2 components with the same entity Id should create only one component ", () => {
        let initialSize = multiPropFactory.size;
        let c = multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, {"x":0.0, "y":0.0});
        expect(c.entityId).to.not.be.null;
        expect(multiPropFactory.values[0].entityId).to.equal(c.entityId);
        let c2 = multiPropFactory.create(multiPropComponent, "1", false, "p2", 3, {"x":1.0, "y":1.0});
        expect(c2.entityId).to.equal(c.entityId);
        expect(multiPropFactory.values[0].entityId).to.equal(c.entityId);
        expect(multiPropFactory.size).to.equal(initialSize);
        expect(multiPropFactory.get("1").prop1).to.equal(c2.prop1);
    });
    it("should increment the createdLength only if the components is created at an index greater than createdLength", () => {
        expect(multiPropFactory.iterationLength).to.equal(0);
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, {"x":0.0, "y":0.0});
        expect(multiPropFactory.iterationLength).to.equal(1);
        multiPropFactory.create(multiPropComponent, "2", false, "p1", 2, {"x":0.0, "y":0.0});
        expect(multiPropFactory.iterationLength).to.equal(2);
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 3, {"x":0.0, "y":0.0});
        expect(multiPropFactory.iterationLength).to.equal(2);
    });
    it("should zeroed the component when we 'remove' ", () => {
        let initialSize = multiPropFactory.size;
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, {"x":0.0, "y":0.0});
        expect(multiPropFactory.has('1')).to.equal(true);
        // id should be found in order to delete it first
        expect(multiPropFactory.delete('1')).to.equal(true);
        // size of the pool should not be changed since we zeroed the component instead of removing it from the pool
        expect(multiPropFactory.size).to.equal(initialSize);
        // we created only one component so it was at the first index of the values array, it is now zeroed
        expect(multiPropFactory.values[0].entityId).to.equal('0');
        // the component should not be referenced anymore
        expect(multiPropFactory.has('1')).to.equal(false);
    });
    it("removed components should decrement the createdLength only if it is the last one ", () => {
        let initialSize = multiPropFactory.size;
        multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, {"x":0.0, "y":0.0});
        expect(multiPropFactory.iterationLength).to.equal(1);
        expect(multiPropFactory.delete('1')).to.equal(true);
        expect(multiPropFactory.iterationLength).to.equal(0);

        multiPropFactory.create(multiPropComponent, "1", false, "p1", 2, {"x":0.0, "y":0.0});
        multiPropFactory.create(multiPropComponent, "2", false, "p1", 2, {"x":0.0, "y":0.0});
        expect(multiPropFactory.iterationLength).to.equal(2);
        expect(multiPropFactory.delete('1')).to.equal(true);
        // still equal 2 since the one we removed is not the last one
        expect(multiPropFactory.iterationLength).to.equal(2);
    });
    it("should be able to create components with an active proprety and other proreties", () => {
        let mcFactory = new ComponentFactory<multiPropComponent>(2, multiPropComponent, "default string", "default string", {x: 0.0, y: 0.0});
        let mc = mcFactory.create(multiPropComponent, "c1", true, "p1", 2, { "x": 1.0, "y": 3.0 });
        expect(mc.active).to.equal(true);
        expect(mc.entityId).to.equal("c1");
        expect(mc.prop1).to.equal("p1");
        expect(mc.prop2).to.equal(2);
        expect(mc.prop3.x).to.equal(1);
        expect(mc.prop3.y).to.equal(3);
        let mc2 = mcFactory.create(multiPropComponent, "c1", false, "p1", 2, { "x": 1.0, "y": 3.0 });
        expect(mc2.active).to.equal(false);
    });
    it("should be able to active all created components", () => {
        
        simpleFactory.create(multiPropComponent, "1", false);
        simpleFactory.create(multiPropComponent, "2", false);
        simpleFactory.activateAll(true);
        expect(simpleFactory.values[0].active).to.equal(true);
        expect(simpleFactory.values[1].active).to.equal(true);
    });
    it("should be able to desactivate all created components", () => {
        
        simpleFactory.create(multiPropComponent, "1", true);
        simpleFactory.create(multiPropComponent, "2", true);
        simpleFactory.activateAll(false);
        expect(simpleFactory.values[0].active).to.equal(false);
        expect(simpleFactory.values[1].active).to.equal(false);
    });
    it("should keep track of the nb of created components", () => {
        
        expect(simpleFactory.nbCreated).to.equal(0);
        simpleFactory.create(multiPropComponent, "1", false);
        expect(simpleFactory.nbCreated).to.equal(1);   
        simpleFactory.create(multiPropComponent, "2", true);
        expect(simpleFactory.nbCreated).to.equal(2);  
        simpleFactory.create(multiPropComponent, "2", true);
        expect(simpleFactory.nbCreated).to.equal(2);      

        simpleFactory.delete("2");
        expect(simpleFactory.nbCreated).to.equal(1); 
        simpleFactory.delete("1");
        expect(simpleFactory.nbCreated).to.equal(0); 
    });
    it("should keep track of the number of active components", () => {
        
        expect(simpleFactory.nbActive).to.equal(0);
        simpleFactory.create(multiPropComponent, "1", true);
        expect(simpleFactory.nbActive).to.equal(1);   
        simpleFactory.create(multiPropComponent, "2", true);
        expect(simpleFactory.nbActive).to.equal(2);  
        simpleFactory.create(multiPropComponent, "2", true);
        expect(simpleFactory.nbActive).to.equal(2);
        simpleFactory.create(multiPropComponent, "2", false);
        expect(simpleFactory.nbActive).to.equal(1);          
        simpleFactory.create(multiPropComponent, "3", false);
        expect(simpleFactory.nbActive).to.equal(1);

        simpleFactory.create(multiPropComponent, "4", true);
        expect(simpleFactory.nbActive).to.equal(2);
           

        simpleFactory.delete("2");
        expect(simpleFactory.nbActive).to.equal(2); 
        simpleFactory.delete("1");
        expect(simpleFactory.nbActive).to.equal(1); 

        simpleFactory.activate("4", false);
        expect(simpleFactory.nbActive).to.equal(0);

        simpleFactory.activateAll(true);
        expect(simpleFactory.nbActive).to.equal(simpleFactory.nbCreated);
    });
    it("should keep track of the number of inactive components", () => {
        
        expect(simpleFactory.nbInactive).to.equal(0);
        simpleFactory.create(multiPropComponent, "1", true);
        expect(simpleFactory.nbInactive).to.equal(0);   
        simpleFactory.create(multiPropComponent, "2", false);
        expect(simpleFactory.nbInactive).to.equal(1);  
        simpleFactory.create(multiPropComponent, "2", false);
        expect(simpleFactory.nbInactive).to.equal(1);
        simpleFactory.create(multiPropComponent, "2", true);
        expect(simpleFactory.nbInactive).to.equal(0);          
        simpleFactory.create(multiPropComponent, "3", false);
        expect(simpleFactory.nbInactive).to.equal(1);

        simpleFactory.create(multiPropComponent, "4", false);
        expect(simpleFactory.nbInactive).to.equal(2);

        simpleFactory.delete("2");
        expect(simpleFactory.nbInactive).to.equal(2); 
        simpleFactory.delete("3");
        expect(simpleFactory.nbInactive).to.equal(1); 

        simpleFactory.activate("4", true);
        expect(simpleFactory.nbInactive).to.equal(0);

        simpleFactory.activateAll(false);
        expect(simpleFactory.nbInactive).to.equal(simpleFactory.nbCreated);
    });
    it("should keep track of the number of free slot", () => {
        
        expect(simpleFactory.nbFreeSlot).to.equal(5);
        simpleFactory.create(multiPropComponent, "1", true);
        expect(simpleFactory.nbFreeSlot).to.equal(4);
        simpleFactory.create(multiPropComponent, "2", false);
        expect(simpleFactory.nbFreeSlot).to.equal(3);
        simpleFactory.create(multiPropComponent, "2", true);
        expect(simpleFactory.nbFreeSlot).to.equal(3);
    });
    it("resize the pool down", () => {
        expect(multiPropFactory.size).to.equal(5);
        multiPropFactory.resize(3);
        expect(multiPropFactory.size).to.equal(3);
        for (let i = 0; i < multiPropFactory.size; ++i) {
            expect(multiPropFactory[i]).to.equal(undefined);
        }
    });
    it("resize the pool up", () => {
        expect(multiPropFactory.size).to.equal(5);
        multiPropFactory.resize(10);
        expect(multiPropFactory.size).to.equal(10);
        for (let i = 0; i < multiPropFactory.size; ++i) {
            expect(multiPropFactory.values[i].entityId).to.equal('0');
        }
        
        // make sure object in component are distinct copy and not a reference
        multiPropFactory.values[multiPropFactory.size-1].prop3.x += 1;
        expect(multiPropFactory.values[multiPropFactory.size -2].prop3.x).to.not.equal(multiPropFactory.values[multiPropFactory.size-1].prop3.x);
        
    });

});