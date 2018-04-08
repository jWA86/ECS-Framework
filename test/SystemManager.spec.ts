import { expect } from "chai";
import "mocha";
import { ComponentFactory} from "../src/ComponentFactory";
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
            const fifthId = sysManager.pushSystem(new FeedBackSystem(), false);
            const sixId = sysManager.pushSystem(new FeedBackSystem(), false);
            // should be different
            expect(secondId).to.not.equal(firstId);
            expect(thirdId).to.not.equal(firstId);
            expect(fourthId).to.not.equal(thirdId);
            expect(fifthId).to.not.equal(fourthId);
            expect(sixId).to.not.equal(fifthId);
            // should be class name + number if more than one instance in the SystemManager
            expect(firstId).to.equal("FeedBackSystem");
            expect(secondId).to.equal("IncrementSystem");
            expect(thirdId).to.equal("FeedBackSystem_1");
            expect(fourthId).to.equal("FeedBackSystem_2");
            expect(fifthId).to.equal("FeedBackSystem_3");
            expect(sixId).to.equal("FeedBackSystem_4");
        });
        it("in separate collection based on wether it should be processed at fixed time step or not", () => {
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
        it("insert a system before an other system ", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem();
            const nFSystem = new FeedBackSystem();
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);

            sysManager.insertBefore(firstId,  new IncrementSystem());
            sysManager.insertBefore(secondId,  new IncrementSystem());
            expect(sysManager.getFixedTSSystems()[0]).to.be.instanceof(IncrementSystem);
            expect(sysManager.getNonFixedTSSystems()[0]).to.be.instanceof(IncrementSystem);
        });
        it("insert a system after an other system ", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem();
            const nFSystem = new FeedBackSystem();
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);

            sysManager.insertAfter(firstId,  new IncrementSystem());
            sysManager.insertAfter(secondId,  new IncrementSystem());
            expect(sysManager.getFixedTSSystems()[1]).to.be.instanceof(IncrementSystem);
            expect(sysManager.getNonFixedTSSystems()[1]).to.be.instanceof(IncrementSystem);
        });
        it("insert a system around an other system ", () => {
            const sysManager = new SystemManager();
            const fFSystem = new FeedBackSystem();
            const nFSystem = new FeedBackSystem();
            const firstId = sysManager.pushSystem(fFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);

            sysManager.insertAround(firstId, new IncrementSystem(), new IncrementSystem());
            sysManager.insertAround(secondId,  new IncrementSystem(), new IncrementSystem());
            console.log(sysManager.getFixedTSSystems());
            console.log(sysManager.getNonFixedTSSystems());

            expect(sysManager.getFixedTSSystems()[0]).to.be.instanceof(IncrementSystem);
            expect(sysManager.getFixedTSSystems()[1]).to.be.instanceof(FeedBackSystem);
            console.log("here");
            expect(sysManager.getFixedTSSystems()[2]).to.be.instanceof(IncrementSystem);

            expect(sysManager.getNonFixedTSSystems()[0]).to.be.instanceof(IncrementSystem);
            expect(sysManager.getNonFixedTSSystems()[1]).to.be.instanceof(FeedBackSystem);
            expect(sysManager.getNonFixedTSSystems()[2]).to.be.instanceof(IncrementSystem);
        });
    });
    describe("remove", () => {
        it("should remove the system from the SystemManager by providing the system id", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem();
            const nFSystem = new FeedBackSystem();
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);
            expect(sysManager.getFixedTSSystems().length).to.equal(1);
            expect(sysManager.getNonFixedTSSystems().length).to.equal(1);
            sysManager.remove(firstId);
            sysManager.remove(secondId);
            expect(sysManager.getFixedTSSystems().length).to.equal(0);
            expect(sysManager.getNonFixedTSSystems().length).to.equal(0);
        });
    });
    describe("get", () => {
        it("a system by its id", () => {
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
    describe("set systems states :", () => {
        it("active by default", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem();
            const nFSystem = new FeedBackSystem();
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);
            expect(sysManager.getNonFixedTSSystems()[0].active).to.equal(true);
            expect(sysManager.getFixedTSSystems()[0].active).to.equal(true);
        });
    });
});
