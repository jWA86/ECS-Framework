import { expect } from "chai";
import "mocha";
// import { replaceRaf } from "raf-stub";
import { clearInterval, setInterval } from "timers";
import { ComponentFactory } from "../src/ComponentFactory";
import { FrameEvent, GameLoop } from "../src/GameLoop";
import { IComponent, IComponentFactory, IFrameEvent } from "../src/interfaces";
import { System } from "../src/System";
import { SystemManager } from "../src/SystemManager";

// problem with requestionAnimationFrame is randomly fired
// so sometimes test passed sometimes not ...
let rafWorking = false;
describe("pre-requirement", () => {
    it("requestionAnimationFrame should work", (done) => {
        expect(requestAnimationFrame).to.not.be.equal(undefined);
        // pause after 500ms
        // then check that loop has been called more than once
        let frameId = 0;
        let firedCount = 0;

        function loop() {
            firedCount += 1;
            frameId = requestAnimationFrame(loop);
        }

        loop();

        setTimeout(() => {
            cancelAnimationFrame(frameId);
            if (firedCount > 1) {
                rafWorking = true;
                done();
            } else {
                rafWorking = false;
                done(Error("WARNING ! RequestAnimationFrame not working) "));
            }
        }, 1000);

    });
    if (rafWorking) {
        describe("GameLoop should be able to", test);
    } else {
        describe.skip("GameLoop should be able to", test);
    }
});

function test() {
    this.timeout(3000);
    const perf = window.performance && window.performance.now ? window.performance : Date;
    class EmptyComponent implements IComponent {
        public entityId: number;
        public active: boolean;
        constructor() { }
    }

    class FeedBackSystem extends System {
        public static callBack: (timer: FrameEvent, args: any[]) => void;
        public execute(emptyComp: IComponent, timer: FrameEvent, ...args: any[]) {
            FeedBackSystem.callBack(timer, args);
        }
    }

    const zeroVec3 = { x: 0.0, y: 0.0, z: 0.0 };

    interface Ivec3 {
        x: number;
        y: number;
        z: number;
    }

    interface IPositionComponent extends IComponent {
        position: { x: number, y: number, z: number };
    }

    interface IVelocityComponent extends IComponent {
        velocity: { x: number, y: number; z: number };
    }

    class PositionComponent implements IComponent {
        public entityId: number;
        public active: boolean;
        constructor( public position: Ivec3) { }
    }

    class VelocityComponent implements IComponent {
        public entityId;
        public active;
        constructor( public velocity: Ivec3) { }
    }

    class MoveSystem extends System {
        constructor() { super(); }

        public execute(posC: IPositionComponent, veloC: IVelocityComponent) {
            posC.position.x *= veloC.velocity.x;
            posC.position.y *= veloC.velocity.y;
            posC.position.z *= veloC.velocity.z;
        }
    }

    // dummy system that increment a interger
    class IntegerComponent implements IComponent {
        public entityId: number;
        public active: boolean;
        constructor(public integer: number) { }
    }
    class IncrementSystem extends System {
        constructor() { super(); }
        public execute(int: IntegerComponent) {
            int.integer += 1;
        }
    }

    // Dummy system that multiply an integer by itself
    class SquareSystem extends System {
        constructor() { super(); }
        public execute(int: IntegerComponent) {
            int.integer = int.integer * int.integer;
        }
    }

    let integerFactory: ComponentFactory<IntegerComponent>;
    let positionFactory = new ComponentFactory<PositionComponent>(10, new PositionComponent(zeroVec3));
    let velocityFactory = new ComponentFactory<VelocityComponent>(10, new VelocityComponent(zeroVec3));
    let feedBackFactory = new ComponentFactory<EmptyComponent>(5, new EmptyComponent());

    beforeEach(() => {
        positionFactory = new ComponentFactory<PositionComponent>(10, new PositionComponent(zeroVec3));

        for (let i = 1; i < 6; ++i) {
            positionFactory.create(i, true);
        }

        velocityFactory = new ComponentFactory<VelocityComponent>(10, new VelocityComponent(zeroVec3));

        for (let i = 1; i < 6; ++i) {
            velocityFactory.create(i, true);
        }

        feedBackFactory = new ComponentFactory<EmptyComponent>(5, new EmptyComponent());

        integerFactory = new ComponentFactory<IntegerComponent>(5,new IntegerComponent(1));

    });
    it("accept a list of System to iterate on", () => {
        const sM = new SystemManager();
        sM.pushSystem(new IncrementSystem(), true);
        sM.pushSystem(new SquareSystem(), true);
        const gl = new GameLoop(sM);
        const res = gl.getSystemManager();
        expect(res).to.deep.equal(sM);
    });
    it("start and stop execution of the loop ", (done) => {
        const sM = new SystemManager();
        const gl = new GameLoop(sM);

        gl.start();
        expect(gl.isRunning()).to.equal(true);
        gl.stop();
        expect(gl.isRunning()).to.equal(false);
        done();
    });
    it("update the time ellapsed since the game loop start", (done) => {
        // const s = new MoveSystem();
        // s.setFactories(positionFactory, velocityFactory);
        const sM = new SystemManager();
        const runFor = 1000;
        const gl = new GameLoop(sM);
        gl.setFrequency(1000 / 30);
        setTimeout(() => {
            gl.stop();
            const t = gl.getCurrentTimer();
            expect(t.time).to.approximately(runFor, 30);
            done();
        }, 20);
        gl.start();
    });
    it("provid the time ellaspsed since the last frame call", (done) => {
        // checking that delta does not vary much
        const sM = new SystemManager();
        const fbckSys = new FeedBackSystem();
        fbckSys.setFactories(feedBackFactory);
        feedBackFactory.create(1, true);
        expect(feedBackFactory.nbActive).to.gt(0);

        const deltas = [];
        FeedBackSystem.callBack = (timer) => {
            deltas.push(timer.delta);
        };
        sM.pushSystem(fbckSys, false);
        const runFor = 1000;
        const gl = new GameLoop(sM);
        setTimeout(() => {
            gl.stop();
            const t = gl.getCurrentTimer();
            const mean = deltas.reduce((prev, current, index) => {
                return prev + current;
            });
            let sd = deltas.reduce((prev, current, index) => {
                return prev + Math.pow(current - mean, 2);
            });
            sd /= (deltas.length - 1);
            const s = Math.sqrt(sd);
            expect(s).to.approximately(mean, 20);
            done();
        }, 20);
        gl.start();
    });
    it("pause and resume execution of the loop", (done) => {
        // start
        // stop after 250ms
        // get the time
        // resume
        // stop after 250ms
        // get time and check it's greater than the previous time recorded
        const gl = new GameLoop(new SystemManager());
        gl.setFrequency(1000 / 60);
        const runFor = 500;
        gl.start();
        setTimeout(() => {
            gl.stop();
            const t1 = gl.getCurrentTimer().time;
            gl.resume();
            setTimeout(() => {
                gl.stop();
                const t2 = gl.getCurrentTimer().time;
                expect(t2).to.gte(t1);
                done();
            }, 20);
        }, 20);
    });
    it("process systems at a fixed time step", (done) => {
        // component record time of execution
        // then we compare value to make sure it's executed at a fixed time step
        const frequency = (1000 / 60);
        feedBackFactory.create(1, true);
        const s = new FeedBackSystem();
        s.setFactories(feedBackFactory);
        FeedBackSystem["timerArr"] = [];
        FeedBackSystem.callBack = (timer: FrameEvent) => {
            FeedBackSystem["timerArr"].push(timer.time);
        };
        const sM = new SystemManager();
        sM.pushSystem(s, false);
        const gl = new GameLoop(sM);
        gl.setFrequency(frequency);
        const runFor = 500;
        gl.start();
        setTimeout(() => {
            gl.stop();
            const t = gl.getCurrentTimer();
            const arr = FeedBackSystem["timerArr"];
            for (let i = 1; i < arr.length - 1; ++i) {
                const diff = arr[i + 1] - arr[i];
                expect(diff).to.approximately(frequency, 5);
            }
            done();
        }, 20);
        // done();
    });
    it("update some systems on a fixedTimeStep and other at the requestionAnimationFrame frequency", (done) => {
        // increment an integer in both systems
        // then make sure the fixedTimeStep run more time
        // fixeTimeStep run twice as fast as the requestAnimationFrame
        const frequency = 1000 / 120;

        const fixedIntFactory = new ComponentFactory<IntegerComponent>(2, new IntegerComponent(0));
        const nFixedIntFactory = new ComponentFactory<IntegerComponent>(2, new IntegerComponent(0));
        fixedIntFactory.create(1, true);
        nFixedIntFactory.create(1, true);
        const fixedTS = new IncrementSystem();
        const nFixedTS = new IncrementSystem();
        fixedTS.setFactories(fixedIntFactory);
        nFixedTS.setFactories(nFixedIntFactory);

        const sM = new SystemManager();
        sM.pushSystem(fixedTS, true);
        sM.pushSystem(nFixedTS, false);

        const gl = new GameLoop(sM);
        gl.setFrequency(frequency);
        const runFor = 500;
        gl.start();
        setTimeout(() => {
            gl.stop();
            const t = gl.getCurrentTimer();
            const fi = fixedIntFactory.get(1).integer;
            const nfi = nFixedIntFactory.get(1).integer;
            expect(fi).to.gt(nfi);
            done();

        }, 10);
    });
    it("pause each system individually", (done) => {
        // 2 increments systems
        // one is paused after a moment of execution
        // run a bit more
        // stop and compare value of the incremented component
        // the one in the paused system should be less than the other that continued running

        const fact1 = new ComponentFactory<IntegerComponent>(2, new IntegerComponent(0));
        const fact2 = new ComponentFactory<IntegerComponent>(2, new IntegerComponent(0));
        const fact3 = new ComponentFactory<IntegerComponent>(2, new IntegerComponent(0));
        const fact4 = new ComponentFactory<IntegerComponent>(2, new IntegerComponent(0));
        fact1.create(1, true);
        fact2.create(1, true);
        fact3.create(1, true);
        fact4.create(1, true);
        const incS1 = new IncrementSystem();
        const incS2 = new IncrementSystem();
        const incS3 = new IncrementSystem();
        const incS4 = new IncrementSystem();

        incS1.setFactories(fact1);
        incS2.setFactories(fact2);
        incS3.setFactories(fact3);
        incS4.setFactories(fact4);

        const sM = new SystemManager();
        const pausedFSysId = sM.pushSystem(incS1, true);
        const sys2Id = sM.pushSystem(incS2, true);
        const pausedNFSysId = sM.pushSystem(incS3, false);
        const sys4Id = sM.pushSystem(incS4, false);

        const gl = new GameLoop(sM);
        const pauseAt = 250;
        const runFor = 1000;

        gl.start();
        let paused = false;
        const interval = setInterval(() => {
            const t = gl.getCurrentTimer();
            if (t.time >= pauseAt && !paused) {
                // pause some system
                gl.getSystemManager().get(pausedFSysId).active = false;
                gl.getSystemManager().get(pausedNFSysId).active = false;
                paused = true;
            }
            if (t.time >= runFor && paused) {
                gl.stop();
                const pausedComp = fact1.get(1);
                const nonPausedComp = fact2.get(1);
                const pausedNComp = fact3.get(1);
                const nonPausedNComp = fact4.get(1);
                expect(gl.getSystemManager().get(pausedFSysId).active).to.equal(false);
                expect(gl.getSystemManager().get(pausedNFSysId).active).to.equal(false);
                expect(gl.getSystemManager().get(sys2Id).active).to.equal(true);
                expect(gl.getSystemManager().get(sys4Id).active).to.equal(true);
                expect(pausedComp.integer).to.gt(0);
                expect(pausedNComp.integer).to.gt(0);
                expect(pausedComp.integer).to.lt(nonPausedComp.integer);
                expect(pausedNComp.integer).to.lt(nonPausedNComp.integer);
                clearInterval(interval);
                done();
            }
        }, 20);

    });
}
