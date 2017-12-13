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

    describe("add a system", () => {
        it("set an unique id for each system instance it holds", () => {
            const sysManager = new SystemManager();
            const firstId = sysManager.addSystem(new FeedBackSystem(), true);
            const secondId = sysManager.addSystem(new IncrementSystem(), true);
            const thirdId = sysManager.addSystem(new FeedBackSystem(), true);
            const fourthId = sysManager.addSystem(new FeedBackSystem(), true);

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
            // array or only one and separation by index (i.e fixedAtTheEnd)
            // challenge : having only one map for 2 arrays
            // use of 2 fastIterations ? + encapsulate accessor that check both collections
        });
        it("add the system in the order wished", () => {

        });
    });

    it("get a system by its id", () => {

    });
});
