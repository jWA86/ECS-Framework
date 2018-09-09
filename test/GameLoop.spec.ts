import { expect } from "chai";
import "mocha";
import { clearInterval, setInterval } from "timers";
import { ComponentFactory } from "../src/ComponentFactory";
import { FrameEvent, GameLoop } from "../src/GameLoop";
import { IComponent } from "../src/interfaces";
import { System } from "../src/System";
import { SystemManager } from "../src/SystemManager";

// RequestAnimationFrame doesn't work if the page/tab is in background, so these tests have to be run in the browsers, Karma won't make it works.

const isRequestAnimationFrameWorking = () => {
    let rafWorking = false;
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
        if (firedCount > 10) {
            rafWorking = true;
        } else {
            rafWorking = false;
        }
        expect(rafWorking, "WARNING ! RequestAnimationFrame not working, run tests in foreground").to.equal(true);
    }, 800);

};

const isPerformanceWorking = () => {
    expect(performance).to.not.equal(undefined);
    expect(performance.now()).to.be.greaterThan(0);
    expect(performance.mark, "window.performance.mark is not defined").to.not.equal(undefined);
};

describe("GameLoop", () => {
    const perf = window.performance && window.performance.now ? window.performance : Date;
    class EmptyComponent implements IComponent {
        public entityId: number;
        public active: boolean;
        constructor() { }
    }

    interface IFeedBackParams extends IComponent {
        pos: {x: number, y: number};
    }

    const feedbackParams = {
        active: true,
        entityId: 0,
        pos: { x: 0, y: 0 },
    };

    class FeedBackSystem extends System<IFeedBackParams> {
        public static callBack: (timer: FrameEvent, ...args: any[]) => void;
        protected _defaultParameter: IFeedBackParams = feedbackParams;
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

    interface IMoveParams extends IComponent {
        position: IVec3;
        velocity: IVec3;
    }

    const moveParams: IMoveParams = {
        active: true,
        entityId: 0,
        position: zeroVec3,
        velocity: zeroVec3,
    };

    class MoveSystem extends System<IMoveParams> {
        protected _defaultParameter: IMoveParams = moveParams;
        constructor() { super(); }

        public execute(params: IMoveParams) {
            params.position[this._k.position].x *= params.velocity[this._k.velocity].x;
            params.position[this._k.position].y *= params.velocity[this._k.velocity].y;
            params.position[this._k.position].z *= params.velocity[this._k.velocity].z;
        }
    }

    // dummy system that increment a interger
    class IntegerComponent implements IComponent {
        public entityId: number;
        public active: boolean;
        constructor(public integer: number) { }
    }

    interface IIntergerParams extends IComponent {
        i: { integer: number };
    }

    const incrementParams =  {
        active: true,
        entityId: 0,
        i: { integer: 0 },
    };

    class IncrementSystem extends System<IIntergerParams> {
        protected _defaultParameter: IIntergerParams = incrementParams;
        constructor() { super(); }
        public execute(params: IIntergerParams) {
            params.i.integer += 1;
        }
    }

    // Dummy system that multiply an integer by itself
    class SquareSystem extends System<IIntergerParams> {
        protected _defaultParameter: IIntergerParams = incrementParams;
        constructor() { super(); }
        public execute(params: IIntergerParams) {
            params.i.integer = params.i.integer * params.i.integer;
        }
    }

    let integerFactory: ComponentFactory<IntegerComponent>;
    let positionFactory = new ComponentFactory<PositionComponent>(10, new PositionComponent(zeroVec3));
    let velocityFactory = new ComponentFactory<VelocityComponent>(10, new VelocityComponent(zeroVec3));
    let feedBackFactory = new ComponentFactory<EmptyComponent>(5, new EmptyComponent());

    beforeEach(() => {
        isRequestAnimationFrameWorking();
        isPerformanceWorking();
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
        sM.pushSystem(new IncrementSystem(), true);
        sM.pushSystem(new SquareSystem(), true);
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
            gl.pause();
            const t = gl.currentTimer;
            expect(t.time).to.approximately(runFor, 30);
            done();
        }, runFor);
        gl.start();
    });
    it("provide the time ellaspsed since the last frame call", (done) => {
        // checking that delta does not vary much
        const sM = new SystemManager();
        const fbckSys = new FeedBackSystem();
        fbckSys.setParamSource("pos", feedBackFactory);
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
            gl.pause();
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
        // pause after 250ms
        // get the time
        // resume
        // stop after 250ms
        // get time and check it's greater than the previous time recorded
        const gl = new GameLoop(new SystemManager());
        gl.setFrequency(1000 / 60);
        const runFor = 500;
        gl.start();
        setTimeout(() => {
            gl.pause();
            const t1 = gl.currentTimer.time;
            gl.start();
            setTimeout(() => {
                gl.pause();
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
        const s = new FeedBackSystem();
        s.setParamSource("pos", feedBackFactory);
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
            gl.pause();
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
        const fixedTS = new IncrementSystem();
        const nFixedTS = new IncrementSystem();
        fixedTS.setParamSource("i", fixedIntFactory);
        nFixedTS.setParamSource("i",  nFixedIntFactory);

        const sM = new SystemManager();
        sM.pushSystem(fixedTS, true);
        sM.pushSystem(nFixedTS, false);

        const gl = new GameLoop(sM);
        gl.setFrequency(frequency);
        const runFor = 500;
        gl.start();
        setTimeout(() => {
            gl.pause();
            const t = gl.currentTimer;
            const fi = fixedIntFactory.get(1).integer;
            const nfi = nFixedIntFactory.get(1).integer;
            expect(fi).to.gt(nfi);
            done();

        }, runFor);
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

        incS1.setParamSource("i", fact1);
        incS2.setParamSource("i", fact2);
        incS3.setParamSource("i", fact3);
        incS4.setParamSource("i", fact4);

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
        const s = new FeedBackSystem();
        s.setParamSource("pos", feedBackFactory);
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
        const s = new FeedBackSystem();
        s.setParamSource("pos", feedBackFactory);
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
});
