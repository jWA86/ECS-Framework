import { expect } from "chai";
import "mocha";
import { ComponentFactory } from "../src/ComponentFactory";
import { EntityFactory, IEntityFactory } from "../src/EntityFactory";
import { IComponent } from "../src/interfaces";

describe("EntityFactory", () => {

    class PositionComponent implements IComponent {
        constructor(public entityId: number, public active: boolean, public position = { x: 0.0, y: 0.0, z: 0.0 }) { }
    }

    class VelocityComponent implements IComponent {
        constructor(public entityId, public active, public vec = { x: 0.0, y: 0.0, z: 0.0 }) { }
    }

    let positionFactory;
    let velocityFactory;
    let movingObjectFactory;

    beforeEach(() => {
        positionFactory = new ComponentFactory<PositionComponent>(5, PositionComponent, { x: 0.0, y: 0.0, z: 0.0 });
        velocityFactory = new ComponentFactory<VelocityComponent>(5, VelocityComponent, { x: 0.0, y: 0.0, z: 0.0 });
        movingObjectFactory = new EntityFactory(10);

        movingObjectFactory.addFactory("position", positionFactory);
        movingObjectFactory.addFactory("velocity", velocityFactory);
    });

    it("addFactory() should set the same size as specified in the entityFactory constructor", () => {
        expect(movingObjectFactory.size).to.equal(10);
        expect(positionFactory.size).to.equal(10);
        expect(velocityFactory.size).to.equal(10);
    });
    it("getFactory() should return the factory corresponding to the name", () => {
        // check the first component to be an instance of what the factory is supposed to hold
        expect(movingObjectFactory.getFactory("position").values[0]).to.be.an.instanceOf(PositionComponent);
    });
    it("create() should create a component in each child pool with the same entityId", () => {
        movingObjectFactory.create(1, true);
        expect(movingObjectFactory.getFactory("position").get(1).entityId).to.equal(1);
        expect(movingObjectFactory.getFactory("velocity").get(1).entityId).to.equal(1);
    });
    it("free() should remove the components in every child pool", () => {
        movingObjectFactory.create(1, true);

        expect(movingObjectFactory.free(1)).to.equal(true);
        expect(positionFactory.has(1)).to.equal(false);
        expect(velocityFactory.has(1)).to.equal(false);
    });
    it("free() unexisting component should return false", () => {
        expect(movingObjectFactory.free(1)).to.equal(false);
        expect(positionFactory.has(1)).to.equal(false);
        expect(velocityFactory.has(1)).to.equal(false);
    });
    it("resize() should resize all child pool", () => {
        movingObjectFactory.resize(10);
        expect(positionFactory.size).to.equal(10);
        expect(velocityFactory.size).to.equal(10);
        expect(movingObjectFactory.size).to.equal(10);

        movingObjectFactory.resize(3);
        expect(positionFactory.size).to.equal(3);
        expect(velocityFactory.size).to.equal(3);
        expect(movingObjectFactory.size).to.equal(3);
    });
    it("iterationLength should be the same for all pool", () => {
        expect(movingObjectFactory.iterationLength).to.equal(0);
        expect(positionFactory.iterationLength).to.equal(0);
        expect(velocityFactory.iterationLength).to.equal(0);

        movingObjectFactory.create(1, true);
        movingObjectFactory.create(2, true);

        expect(movingObjectFactory.iterationLength).to.equal(2);
        expect(positionFactory.iterationLength).to.equal(2);
        expect(velocityFactory.iterationLength).to.equal(2);
    });
    it("has() should return true or false", () => {
        expect(movingObjectFactory.has(1)).to.equal(false);

        movingObjectFactory.create(1, true);
        movingObjectFactory.create(2, true);

        expect(movingObjectFactory.has(2)).to.equal(true);
    });
    it("getComponent() should return the component", () => {
        // non existing entityId
        expect(movingObjectFactory.getComponent(2, "position")).to.equal(undefined);

        movingObjectFactory.create(1, true);
        expect(movingObjectFactory.getComponent(1, "position")).to.have.property("position");
        expect(movingObjectFactory.getComponent(1, "velocity")).to.have.property("vec");
        // non existing factory name
        expect(movingObjectFactory.getComponent(1, "nonExistingName")).to.equal(undefined);
    });
    it("get() return the entity's components", () => {
        movingObjectFactory.create(1, true);
        const myC1 = movingObjectFactory.get(1);
        expect(myC1.length).to.equal(2);
        expect(myC1[0]).to.have.property("position");
        expect(myC1[1]).to.have.property("vec");
    });
    it("nbCreated", () => {
        expect(movingObjectFactory.nbCreated).to.equal(0);
        movingObjectFactory.create(1, false);
        expect(movingObjectFactory.nbCreated).to.equal(1);
        movingObjectFactory.free(1);
        expect(movingObjectFactory.nbCreated).to.equal(0);
    });
    it("nbFreeSlot", () => {
        expect(movingObjectFactory.nbFreeSlot).to.equal(movingObjectFactory.size);
        movingObjectFactory.create(1, false);
        expect(movingObjectFactory.nbFreeSlot).to.equal(movingObjectFactory.size - 1);
    });
    it("nbActive", () => {
        expect(movingObjectFactory.nbActive).to.equal(0);
        movingObjectFactory.create(1, true);
        expect(movingObjectFactory.nbActive).to.equal(1);
        movingObjectFactory.create(2, false);
        expect(movingObjectFactory.nbActive).to.equal(1);
    });
    it("nbInactive", () => {
        expect(movingObjectFactory.nbInactive).to.equal(0);
        movingObjectFactory.create(1, true);
        expect(movingObjectFactory.nbInactive).to.equal(0);
        movingObjectFactory.create(1, false);
        expect(movingObjectFactory.nbInactive).to.equal(1);
    });
    it("activate all components", () => {
        movingObjectFactory.create(1, true);
        movingObjectFactory.create(2, true);
        movingObjectFactory.create(3, false);

        movingObjectFactory.activateAll(false);
        for (let i = 1; i < movingObjectFactory.nbCreated + 1; ++i) {
            movingObjectFactory.get(i).forEach((c) => {
                expect(c.active).to.equal(false);
            });
        }

        movingObjectFactory.activateAll(true);
        for (let i = 1; i < movingObjectFactory.nbCreated + 1; ++i) {
            movingObjectFactory.get(i).forEach((c) => {
                expect(c.active).to.equal(true);
            });
        }
    });
    it("activate should mopdify the activate proprety of all the components of the entity", () => {
        movingObjectFactory.create(1, true);
        movingObjectFactory.create(2, false);

        movingObjectFactory.activate(1, false);
        movingObjectFactory.get(1).forEach((c) => {
            expect(c.active).to.equal(false);
        });

        movingObjectFactory.activate(2, true);
        movingObjectFactory.get(2).forEach((c) => {
            expect(c.active).to.equal(true);
        });

    });
    it("activate with factories name should modify activate proprety of the corresponding components only", () => {
        movingObjectFactory.create(1, true);
        movingObjectFactory.create(2, false);

        movingObjectFactory.activate(1, false, ["position"]);

        expect(movingObjectFactory.getComponent(1, "position").active).to.equal(false);
        expect(movingObjectFactory.getComponent(1, "velocity").active).to.equal(true);

        movingObjectFactory.activate(2, true, ["position", "velocity"]);
        expect(movingObjectFactory.getComponent(2, "position").active).to.equal(true);
        expect(movingObjectFactory.getComponent(2, "velocity").active).to.equal(true);

    });
});
