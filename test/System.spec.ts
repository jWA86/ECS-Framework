import "mocha";
import { expect } from "chai";
import { IComponent, IComponentFactory } from "../src/interfaces";
import { ComponentFactory } from "../src/ComponentFactory";
import { System } from "../src/System";

describe("System ", () => {
    class positionComponent implements IComponent {
        constructor(public entityId: string, public active: boolean, public position = { "x": 0.0, "y": 0.0, "z":0.0 }) { }
    }
    class MoveSystem extends System<positionComponent> {
        constructor() {
            super();
        }
        execute(component:positionComponent) {
            component.position.x += 1.0;
            component.position.y += 1.0;
            component.position.z += 1.0;
        }
    }
    let positionFactory = new ComponentFactory<positionComponent>(10, positionComponent, { x: 0.0, y: 0.0, z: 0.0 });
    
    let nbActive = 3;
    let nbInactive = 2;
    let nbZeroed = positionFactory.size - nbActive - nbInactive;
    
    beforeEach(() => {
        positionFactory = new ComponentFactory<positionComponent>(10, positionComponent, { x: 0.0, y: 0.0, z: 0.0 });
        nbActive = 3;
        nbInactive = 2;
        nbZeroed = positionFactory.size - nbActive - nbInactive;
        for(let i = 0; i < nbActive; ++i) {
            positionFactory.create(positionComponent, "c"+i, true);
        }
        for(let i = nbActive; i < nbInactive+nbActive; ++i) {
            positionFactory.create(positionComponent, "c"+i, false);
        }
    
    });
    it("checking samples used by other tests", ()=>{
      
        expect(positionFactory.nbActive).to.equal(nbActive);
        expect(positionFactory.nbInactive).to.equal(nbInactive);
        expect(positionFactory.nbFreeSlot).to.equal(nbZeroed);

        for(let i = 0; i < positionFactory.size; ++i) {
            expect(positionFactory.values[i].position.x).to.equal(0.0);
            expect(positionFactory.values[i].position.y).to.equal(0.0);
            expect(positionFactory.values[i].position.z).to.equal(0.0);
            
        }
    });
    it("should update active components", () => {
        
        let s = new MoveSystem();
        s.process(positionFactory);

        for(let i = 0; i < positionFactory.nbActive; ++i) {
            expect(positionFactory.values[i].active).to.equal(true);
            expect(positionFactory.values[i].position.x).to.equal(1.0);
            expect(positionFactory.values[i].position.y).to.equal(1.0);
            expect(positionFactory.values[i].position.z).to.equal(1.0);
        }
    });
    it("should not update inactive components", () => {
        let s = new MoveSystem();
        s.process(positionFactory);
        for(let i = positionFactory.nbActive; i < positionFactory.nbActive+positionFactory.nbInactive; ++i) {
            expect(positionFactory.values[i].active).to.equal(false);
            expect(positionFactory.values[i].position.x).to.equal(0.0);
            expect(positionFactory.values[i].position.y).to.equal(0.0);
            expect(positionFactory.values[i].position.z).to.equal(0.0);
        }
    });
    it("should not update zeroed components", () => {
        for(let i = positionFactory.nbActive+positionFactory.nbInactive; i < positionFactory.size; ++i) {
            expect(positionFactory.values[i].entityId).to.equal('0');
            positionFactory.values[i].active = true;
        }
        let s = new MoveSystem();
        s.process(positionFactory);
        for(let i = positionFactory.nbActive+positionFactory.nbInactive; i < positionFactory.size; ++i) {
            expect(positionFactory.values[i].entityId).to.equal('0');
            expect(positionFactory.values[i].position.x).to.equal(0.0);
            expect(positionFactory.values[i].position.y).to.equal(0.0);
            expect(positionFactory.values[i].position.z).to.equal(0.0);
        }
    });
    
});