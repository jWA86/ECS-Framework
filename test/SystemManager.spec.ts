import { expect } from "chai";
import "mocha";
import { ComponentFactory, EntityFactory } from "../src/ComponentFactory";
import { FrameEvent, GameLoop } from "../src/GameLoop";
import { IComponent, IComponentFactory, IFrameEvent } from "../src/interfaces";
import { System } from "../src/System";
import { SystemManager } from "../src/SystemManager";

describe("SystemManager should be able to", () => {
    // dummy system that increment a interger
    class IntegerComponent implements IComponent {
        constructor(public entityId: number, public active: boolean, public integer: number) { }
    }
    class IncrementSystem extends System {
        constructor() { super(); }
        public execute(int: IntegerComponent) {
            int.integer += 1;
        }
    }

    class FeedBackSystem extends System {
        public static callBack: (timer: FrameEvent) => void;
        public execute(emptyComp: IComponent, timer: FrameEvent) {
            FeedBackSystem.callBack(timer);
        }
    }

    describe("add system", () => {
        it("set an unique id for each system instance it holds", () => {
            const sysManager = new SystemManager();
            const firstId = sysManager.pushSystem(new FeedBackSystem(), true);
            const secondId = sysManager.pushSystem(new IncrementSystem(), true);
            const thirdId = sysManager.pushSystem(new FeedBackSystem(), true);
            const fourthId = sysManager.pushSystem(new FeedBackSystem(), true);

            // should be different
            expect(secondId).to.not.equal(firstId);
            expect(thirdId).to.not.equal(firstId);
            expect(fourthId).to.not.equal(thirdId);
            // should be class name + number if more than one instance in the SystemManager
            expect(firstId).to.equal("FeedBackSystem");
            expect(secondId).to.equal("IncrementSystem");
            expect(thirdId).to.equal("FeedBackSystem_1");
            expect(fourthId).to.equal("FeedBackSystem_2");
        });
        it("add a system in separate collection based on wether it should be processed at fixed time step or not", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem();
            const nFSystem = new FeedBackSystem();
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);
            expect(sysManager.getFixedTSSystems().length).to.equal(1);
            expect(sysManager.getNonFixedTSSystems().length).to.equal(1);
            const fs = sysManager.getFixedTSSystems()[0];
            expect(fs).to.deep.equal(fSystem);
            const nfs = sysManager.getNonFixedTSSystems()[0];
            expect(nfs).to.deep.equal(nFSystem);
        });
        it("add the system in the order wished", () => {
            // const sysManager = new SystemManager();
            // const fourth = new FeedBackSystem();
            // const fourthId = sysManager.pushSystem(fourth, true);
            // const first = new FeedBackSystem();
            // const fId = sysManager.pushSystem(first, true);
            // const third = new FeedBackSystem();
            // const tId = sysManager.pushSystem(third, true);
            // const second = new FeedBackSystem();
            // const sId = sysManager.pushSystem(second, true);

            // expect(sysManager.getFixedTSSystems()[0]).to.deep.equal(first);
            // expect(sysManager.getFixedTSSystems()[1]).to.deep.equal(second);
            // expect(sysManager.getFixedTSSystems()[2]).to.deep.equal(third);
            // expect(sysManager.getFixedTSSystems()[3]).to.deep.equal(fourth);
        });
    });
    describe("get", () => {
        it("get a system by its id", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem();
            const nFSystem = new FeedBackSystem();
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);

            const firstSys = sysManager.get(firstId);
            const secondSys = sysManager.get(secondId);
            expect(firstSys).to.deep.equal(fSystem);
            expect(secondSys).to.deep.equal(nFSystem);
            expect(sysManager.get("nonExistingId")).to.equal(undefined);
        });
    });
});
