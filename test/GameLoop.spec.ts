import { expect } from "chai";
import "mocha";
import { clearInterval, setInterval } from "timers";
import { ComponentFactory } from "../src/ComponentFactory";
import { FrameEvent, GameLoop } from "../src/GameLoop";
import { IComponent, IComponentFactory, IFrameEvent } from "../src/interfaces";
import { System } from "../src/System";
import { SystemManager } from "../src/SystemManager";

// problem with requestionAnimationFrame is randomly fired
// so sometimes test passed sometimes not ...
describe("GameLoop", () => {
    let rafWorking = false;

    before("requestAnimationFrame should work", (done) => {
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
                done(Error("requestAnimatioNFrame not working"));
            }
        }, 1000);
    });

    if (rafWorking) {
        describe("should be able to", test);
    } else {
        describe.skip("should be able to", test);
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

    interface IFeedBackParams {
        e: { emptyComp: IComponent };
    }

    const feedbackParams = {
        e: { emptyComp: {entityId: 0, active: true} },
    };

    class FeedBackSystem extends System<IFeedBackParams> {
        public static callBack: (timer: FrameEvent, ...args: any[]) => void;
        public execute(params: IFeedBackParams, timer: FrameEvent, ...args: any[]) {
            FeedBackSystem.callBack(timer, ...args);
        }
    }

    const zeroVec3 = { x: 0.0, y: 0.0, z: 0.0 };

    interface IVec3 {
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
        constructor( public position: IVec3) { }
    }

    class VelocityComponent implements IComponent {
        public entityId;
        public active;
        constructor( public velocity: IVec3) { }
    }

    interface IMoveParams {
        p: { position: IVec3 };
        v: { velocity: IVec3 };
    }

    const moveParams: IMoveParams = {
        p: { position: zeroVec3 },
        v: { velocity: zeroVec3 },
    };

    class MoveSystem extends System<IMoveParams> {
        constructor(params: IMoveParams) { super(params); }

        public execute(params: IMoveParams) {
            params.p.position.x *= params.v.velocity.x;
            params.p.position.y *= params.v.velocity.y;
            params.p.position.z *= params.v.velocity.z;
        }
    }

    // dummy system that increment a interger
    class IntegerComponent implements IComponent {
        public entityId: number;
        public active: boolean;
        constructor(public integer: number) { }
    }

    interface IIntergerParams {
        i: { integer: number };
    }

    const incrementParams =  {
        i: { integer: 0 },
    };

    class IncrementSystem extends System<IIntergerParams> {
        constructor(params: IIntergerParams) { super(params); }
        public execute(params: IIntergerParams) {
            params.i.integer += 1;
        }
    }

    // Dummy system that multiply an integer by itself
    class SquareSystem extends System<IIntergerParams> {
        constructor(params) { super(params); }
        public execute(params: IIntergerParams) {
            params.i.integer = params.i.integer * params.i.integer;
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

        integerFactory = new ComponentFactory<IntegerComponent>(5, new IntegerComponent(1));

    });
    it("accept a list of System to iterate on", () => {
        const sM = new SystemManager();
        sM.pushSystem(new IncrementSystem(incrementParams), true);
        sM.pushSystem(new SquareSystem(incrementParams), true);
        const gl = new GameLoop(sM);
        const res = gl.systemManager;
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
        // s.setParamsSource(positionFactory, velocityFactory);
        const sM = new SystemManager();
        const runFor = 1000;
        const gl = new GameLoop(sM);
        gl.setFrequency(1000 / 30);
        setTimeout(() => {
            gl.stop();
            const t = gl.currentTimer;
            expect(t.time).to.approximately(runFor, 30);
            done();
        }, 20);
        gl.start();
    });
    it("provid the time ellaspsed since the last frame call", (done) => {
        // checking that delta does not vary much
        const sM = new SystemManager();
        const fbckSys = new FeedBackSystem(feedbackParams);
        fbckSys.setParamsSource(feedBackFactory);
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
            const t = gl.currentTimer;
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
            const t1 = gl.currentTimer.time;
            gl.resume();
            setTimeout(() => {
                gl.stop();
                const t2 = gl.currentTimer.time;
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
        const s = new FeedBackSystem(feedbackParams);
        s.setParamsSource(feedBackFactory);
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
            const t = gl.currentTimer;
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
        const fixedTS = new IncrementSystem(incrementParams);
        const nFixedTS = new IncrementSystem(incrementParams);
        fixedTS.setParamsSource(fixedIntFactory);
        nFixedTS.setParamsSource(nFixedIntFactory);

        const sM = new SystemManager();
        sM.pushSystem(fixedTS, true);
        sM.pushSystem(nFixedTS, false);

        const gl = new GameLoop(sM);
        gl.setFrequency(frequency);
        const runFor = 500;
        gl.start();
        setTimeout(() => {
            gl.stop();
            const t = gl.currentTimer;
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
        const incS1 = new IncrementSystem(incrementParams);
        const incS2 = new IncrementSystem(incrementParams);
        const incS3 = new IncrementSystem(incrementParams);
        const incS4 = new IncrementSystem(incrementParams);

        incS1.setParamsSource(fact1);
        incS2.setParamsSource(fact2);
        incS3.setParamsSource(fact3);
        incS4.setParamsSource(fact4);

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
            const t = gl.currentTimer;
            if (t.time >= pauseAt && !paused) {
                // pause some system
                gl.systemManager.get(pausedFSysId).active = false;
                gl.systemManager.get(pausedNFSysId).active = false;
                paused = true;
            }
            if (t.time >= runFor && paused) {
                gl.stop();
                const pausedComp = fact1.get(1);
                const nonPausedComp = fact2.get(1);
                const pausedNComp = fact3.get(1);
                const nonPausedNComp = fact4.get(1);
                expect(gl.systemManager.get(pausedFSysId).active).to.equal(false);
                expect(gl.systemManager.get(pausedNFSysId).active).to.equal(false);
                expect(gl.systemManager.get(sys2Id).active).to.equal(true);
                expect(gl.systemManager.get(sys4Id).active).to.equal(true);
                expect(pausedComp.integer).to.gt(0);
                expect(pausedNComp.integer).to.gt(0);
                expect(pausedComp.integer).to.lt(nonPausedComp.integer);
                expect(pausedNComp.integer).to.lt(nonPausedNComp.integer);
                clearInterval(interval);
                done();
            }
        }, 20);

    });

    it("pass optional parameter from start to each system", (done) => {
        feedBackFactory.create(1, true);
        const s = new FeedBackSystem(feedbackParams);
        s.setParamsSource(feedBackFactory);
        FeedBackSystem["timerArr"] = [];
        FeedBackSystem.callBack = (timer: FrameEvent, a1, a2) => {
            FeedBackSystem["arg1"] = a1;
            FeedBackSystem["arg2"] = a2;
        };
        const sM = new SystemManager();
        sM.pushSystem(s, false);
        const gl = new GameLoop(sM);

        const arg1 = "an argument";
        const arg2 = { n: 10 };

        gl.start(arg1, arg2);
        setTimeout(() => {
            gl.stop();
            expect(FeedBackSystem["arg1"]).to.be.equal(arg1);
            expect(FeedBackSystem["arg2"]).to.be.equal(arg2);
            done();
        }, 600);
    });
    it("pass the currentTimer to each System as optional parameter", (done) => {
        feedBackFactory.create(1, true);
        const s = new FeedBackSystem(feedbackParams);
        s.setParamsSource(feedBackFactory);
        FeedBackSystem["timerArr"] = [];
        FeedBackSystem.callBack = (timer: FrameEvent) => {
            FeedBackSystem["timerArr"].push(timer.time);
        };
        const sM = new SystemManager();
        sM.pushSystem(s, false);
        const gl = new GameLoop(sM);

        gl.start();
        setTimeout(() => {
            gl.stop();
            expect(FeedBackSystem["timerArr"].length).to.be.greaterThan(0);
            FeedBackSystem["timerArr"].forEach((v, i) => {
                // first might be equal 0
                if (i > 0) {
                    expect(v).to.not.equal(0);
                }
            });
            done();
        }, 600);
    });
}
