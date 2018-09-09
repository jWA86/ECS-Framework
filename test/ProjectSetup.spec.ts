import { expect } from "chai";
import { FastIterationMap } from "FastIterationMap";
import "mocha";
import { ComponentFactory } from "../src/ComponentFactory";
import { EntityFactory } from "../src/EntityFactory";
import { GameLoop } from "../src/GameLoop";
import { IComponent } from "../src/interfaces";
import { GLOBAL } from "../src/pollyFill";
import { Project } from "../src/Project";
import { System } from "../src/System";
import { SystemManager } from "../src/SystemManager";

describe("Project Setup", () => {

    before(() => {
        expect(GLOBAL).to.not.equal(undefined);
    });

    it("should expose the project through the global object", () => {
        expect(GLOBAL).to.not.equal(undefined);
        const name = "project1";
        const p = new Project("project1");
        expect(GLOBAL[name]).to.equal(p);
    });
    it("should instantiate a GameLoop", () => {
        expect(GLOBAL).to.not.equal(undefined);
        const p = new Project("project2");
        expect(p.gameLoop).to.be.an.instanceof(GameLoop);
    });
    it("should instantiate a PoolManager", () => {
        expect(GLOBAL).to.not.equal(undefined);
        const p = new Project("project3");
        expect(p.poolManager).to.be.an.instanceof(FastIterationMap);
    });
    it("should instantiate a SystemManager", () => {
        expect(GLOBAL).to.not.equal(undefined);
        const p = new Project("project4");
        expect(p.systemManager).to.be.an.instanceof(SystemManager);
    });
    it("expose keyboard shortcut", () => {

    });
    describe("exposing core features of the framework so we can easily instantiate them at runtime", () => {
        class DummyComponent {
            public entityId = 0;
            public active = true;
            constructor(public prop1: number) { }
        }
        it("ComponentFactory", () => {
            const p = new Project("project5");
            expect(GLOBAL["ComponentFactory"]).to.not.equal(undefined);

            const pool: ComponentFactory<DummyComponent> = new GLOBAL["ComponentFactory"](10, DummyComponent);
            expect(pool.size).to.equal(10);
            expect(pool).to.be.an.instanceof(ComponentFactory);
        });
        it("System", () => {
            const p = new Project("project6");
            expect(GLOBAL["System"]).to.not.equal(undefined);
            const sys: System<IComponent> = new GLOBAL["System"]({});
            expect(sys).to.be.an.instanceof(System);
        });
        it("EntityFactory", () => {
            const p = new Project("project7");
            expect(GLOBAL["EntityFactory"]).to.not.equal(undefined);
            const ePool: EntityFactory = new GLOBAL["EntityFactory"](10);
            expect(ePool).to.be.an.instanceof(EntityFactory);
        });
        it("other dependencies provided at construction", () => {
            const p = new Project("project8", [{name: "DummyComponent", object: DummyComponent}]);
            expect(GLOBAL["DummyComponent"]).to.not.equal(undefined);
            const d: DummyComponent = new GLOBAL["DummyComponent"](10);
            expect(d.prop1).to.equal(10);
        });

    });
});
