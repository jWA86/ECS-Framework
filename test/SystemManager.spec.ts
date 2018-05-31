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
        public entityId: number;
        public active: boolean;
        constructor(public integer: number) { }
    }

    interface IIntegerParams {
        i: { integer: number };
    }

    const incrementParams =  {
        i: { integer: 0 },
    };

    class IncrementSystem extends System<IIntegerParams> {
        constructor(params: IIntegerParams) { super(params); }
        public execute(params: IIntegerParams) {
            params.i.integer += 1;
        }
    }

    interface IFeedBackParams {
        e: { emptyComp: IComponent };
    }

    const feedbackParams = {
        e: { emptyComp: {entityId: 0, active: true} },
    };

    class FeedBackSystem extends System<IFeedBackParams> {
        public static callBack: (timer: FrameEvent) => void;
        constructor(params: IFeedBackParams) {
            super(params);
        }
        public execute(params: IFeedBackParams, timer: FrameEvent) {
            FeedBackSystem.callBack(timer);
        }
    }

    describe("add system", () => {
        it("set an unique id for each system instance it holds", () => {
            const sysManager = new SystemManager();
            const firstId = sysManager.pushSystem(new FeedBackSystem(feedbackParams), true);
            const secondId = sysManager.pushSystem(new IncrementSystem(incrementParams), true);
            const thirdId = sysManager.pushSystem(new FeedBackSystem(feedbackParams), true);
            const fourthId = sysManager.pushSystem(new FeedBackSystem(feedbackParams), true);
            const fifthId = sysManager.pushSystem(new FeedBackSystem(feedbackParams), false);
            const sixId = sysManager.pushSystem(new FeedBackSystem(feedbackParams), false);
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
            const fSystem = new FeedBackSystem(feedbackParams);
            const nFSystem = new FeedBackSystem(feedbackParams);
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);
            expect(sysManager.getFixedTSSystemsArray().length).to.equal(1);
            expect(sysManager.getNonFixedTSSystemsArray().length).to.equal(1);
            const fs = sysManager.getFixedTSSystemsArray()[0];
            expect(fs).to.deep.equal(fSystem);
            const nfs = sysManager.getNonFixedTSSystemsArray()[0];
            expect(nfs).to.deep.equal(nFSystem);
        });
        it("insert a system before an other system ", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem(feedbackParams);
            const nFSystem = new FeedBackSystem(feedbackParams);
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);

            sysManager.insertBefore(firstId,  new IncrementSystem(incrementParams));
            sysManager.insertBefore(secondId,  new IncrementSystem(incrementParams));
            expect(sysManager.getFixedTSSystemsArray()[0]).to.be.instanceof(IncrementSystem);
            expect(sysManager.getNonFixedTSSystemsArray()[0]).to.be.instanceof(IncrementSystem);
        });
        it("insert a system after an other system ", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem(feedbackParams);
            const nFSystem = new FeedBackSystem(feedbackParams);
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);

            sysManager.insertAfter(firstId,  new IncrementSystem(incrementParams));
            sysManager.insertAfter(secondId,  new IncrementSystem(incrementParams));
            expect(sysManager.getFixedTSSystemsArray()[1]).to.be.instanceof(IncrementSystem);
            expect(sysManager.getNonFixedTSSystemsArray()[1]).to.be.instanceof(IncrementSystem);
        });
        it("insert a system around an other system ", () => {
            const sysManager = new SystemManager();
            const fFSystem = new FeedBackSystem(feedbackParams);
            const nFSystem = new FeedBackSystem(feedbackParams);
            const firstId = sysManager.pushSystem(fFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);

            sysManager.insertAround(firstId, new IncrementSystem(incrementParams), new IncrementSystem(incrementParams));
            sysManager.insertAround(secondId,  new IncrementSystem(incrementParams), new IncrementSystem(incrementParams));

            expect(sysManager.getFixedTSSystemsArray()[0]).to.be.instanceof(IncrementSystem);
            expect(sysManager.getFixedTSSystemsArray()[1]).to.be.instanceof(FeedBackSystem);
            expect(sysManager.getFixedTSSystemsArray()[2]).to.be.instanceof(IncrementSystem);

            expect(sysManager.getNonFixedTSSystemsArray()[0]).to.be.instanceof(IncrementSystem);
            expect(sysManager.getNonFixedTSSystemsArray()[1]).to.be.instanceof(FeedBackSystem);
            expect(sysManager.getNonFixedTSSystemsArray()[2]).to.be.instanceof(IncrementSystem);
        });
    });
    describe("remove", () => {
        it("should remove the system from the SystemManager by providing the system id", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem(feedbackParams);
            const nFSystem = new FeedBackSystem(feedbackParams);
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);
            expect(sysManager.getFixedTSSystemsArray().length).to.equal(1);
            expect(sysManager.getNonFixedTSSystemsArray().length).to.equal(1);
            sysManager.remove(firstId);
            sysManager.remove(secondId);
            expect(sysManager.getFixedTSSystemsArray().length).to.equal(0);
            expect(sysManager.getNonFixedTSSystemsArray().length).to.equal(0);
        });
    });
    describe("get", () => {
        it("a system by its id", () => {
            const sysManager = new SystemManager();
            const fSystem = new FeedBackSystem(feedbackParams);
            const nFSystem = new FeedBackSystem(feedbackParams);
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
            const fSystem = new FeedBackSystem(feedbackParams);
            const nFSystem = new FeedBackSystem(feedbackParams);
            const firstId = sysManager.pushSystem(nFSystem, true);
            const secondId = sysManager.pushSystem(nFSystem, false);
            expect(sysManager.getNonFixedTSSystemsArray()[0].active).to.equal(true);
            expect(sysManager.getFixedTSSystemsArray()[0].active).to.equal(true);
        });
    });
});
