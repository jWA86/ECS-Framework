import { expect } from "chai";
import "mocha";
import { ComponentFactory, EntityFactory } from "../src/ComponentFactory";
import { FrameEvent, GameLoop } from "../src/GameLoop";
import { IComponent, IComponentFactory, IFrameEvent } from "../src/interfaces";
import { System } from "../src/System";

describe("GameLoop should be able to", () => {
    const perf = window.performance && window.performance.now ? window.performance : Date;
    class EmptyComponent implements IComponent {
        constructor(public entityId: number, public active: boolean) { }
    }
    // Stop the Game loop after a certain amount of time have passed
    class FeedBackSystem extends System {
        public static callBack: (timer: FrameEvent) => void;
        public execute(emptyComp: IComponent, timer: FrameEvent) {
            FeedBackSystem.callBack(timer);
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
        constructor(public entityId: number, public active: boolean, public position: Ivec3) { }
    }

    class VelocityComponent implements IComponent {
        constructor(public entityId, public active, public velocity: Ivec3) { }
    }

    class MoveSystem extends System {
        constructor() { super(); }

        public execute(posC: IPositionComponent, veloC: IVelocityComponent) {
            posC.position.x *= veloC.velocity.x;
            posC.position.y *= veloC.velocity.y;
            posC.position.z *= veloC.velocity.z;
        }
    }

    let positionFactory = new ComponentFactory<PositionComponent>(10, PositionComponent, zeroVec3);
    let velocityFactory = new ComponentFactory<VelocityComponent>(10, VelocityComponent, zeroVec3);
    let feedBackFactory = new ComponentFactory<EmptyComponent>(5, EmptyComponent);

    beforeEach(() => {
        // performance.clearMarks();
        // performance.clearMeasures();
        positionFactory = new ComponentFactory<PositionComponent>(10, PositionComponent, zeroVec3);

        for (let i = 1; i < 6; ++i) {
            positionFactory.create(i, true);
        }

        velocityFactory = new ComponentFactory<VelocityComponent>(10, VelocityComponent, zeroVec3);

        for (let i = 1; i < 6; ++i) {
            velocityFactory.create(i, true);
        }

        feedBackFactory = new ComponentFactory<EmptyComponent>(5, EmptyComponent);

    });
    it("start and stop execution of the loop ", (done) => {
        const gl = new GameLoop([]);
        gl.start();
        expect(gl.isRunning()).to.equal(true);
        gl.stop();
        expect(gl.isRunning()).to.equal(false);
        done();
    });
    it("update the time ellapsed since the game loop start", (done) => {
        const s = new MoveSystem();
        s.setFactories(positionFactory, velocityFactory);
        const runFor = 250;
        const gl = new GameLoop([s]);
        setTimeout(() => {
            const res = perf.now() - t1;
            gl.stop();
            expect(gl.isRunning()).to.equal(false);
            const t = gl.getCurrentTimer();
            expect(t.time).to.gte(res);
            done();
        }, runFor);
        const t1 = perf.now();
        gl.start();
    });
    it("pause and resume execution of the loop", (done) => {
        // start
        // stop after 250ms
        // get the time
        // resume
        // stop after 250ms
        // get time and check it's greater than the previous time recorded
        const gl = new GameLoop([]);
        const runFor = 250;
        setTimeout(() => {
            gl.stop();
            const t1 = gl.getCurrentTimer().time;
            expect(t1).to.gt(runFor);
            setTimeout(() => {
                gl.stop();
                const t2 = gl.getCurrentTimer().time;
                // should run from where it has left
                expect(t2).to.gt(t1);
                // console.log(gl.arr);
                done();
            }, runFor);
            gl.resume();
        }, runFor);
        gl.start();
        done();
    });
    it("process system at a consistent frequency", (done) => {
        const frequency = 1000 / 60;
        feedBackFactory.create(1, true);
        const s = new FeedBackSystem();
        // each time a component is execute check that timer delta is approximately equal the frequency of update
        FeedBackSystem.callBack = (timer: FrameEvent) => {
            expect(timer.delta).to.approximately(frequency, 5);
        };
        const gl = new GameLoop([]);
        const runFor = 200;
        setTimeout(() => {
            gl.stop();
            const t = gl.getCurrentTimer();
            expect(t.time).to.gte(runFor);
            done();
        }, runFor);
        gl.start();
    });
    it("change the frequency of execution at runtime", (done) => {
        let frequency = 1000 / 60;
        feedBackFactory.create(1, true);
        const s = new FeedBackSystem();
        FeedBackSystem.callBack = (timer: FrameEvent) => {
            expect(timer.delta).to.approximately(frequency, 5);
        };
        const gl = new GameLoop([]);
        const runFor = 200;

        setTimeout(() => {
            frequency = 1000 / 30;
            gl.setFrequency(frequency);
            setTimeout(() => {
                gl.stop();
                done();
            }, runFor);
        }, runFor);
        gl.start();
    });

    describe("use of Systems", () => {
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

        // Dummy system that multiply an integer by itself
        class SquareSystem extends System {
            constructor() { super(); }
            public execute(int: IntegerComponent) {
                int.integer = int.integer * int.integer;
            }
        }

        let integerFactory: ComponentFactory<IntegerComponent>;

        beforeEach(() => {
            integerFactory = new ComponentFactory<IntegerComponent>(5, IntegerComponent, 1);
        });
        it("accept a list of System to iterate on", () => {
            const gl = new GameLoop([]);
            const inputArr = [];

            inputArr.push(new IncrementSystem());
            inputArr.push(new SquareSystem());
            gl.setSystems(inputArr);

            const outputArr = gl.getSystems();

            expect(outputArr.length).to.equal(inputArr.length);
            for (let i = 0; i < outputArr.length; ++i) {
                expect(outputArr[i]).to.equal(inputArr[i]);
            }
        });
        it("process systems in the order they are provided", (done) => {
            const c1 = integerFactory.create(1, true);
            expect(c1.integer).to.equal(1);

            const s1 = new IncrementSystem();
            s1.setFactories(integerFactory);
            const s2 = new SquareSystem();
            s2.setFactories(integerFactory);

            const gl = new GameLoop([]);
            gl.setSystems([s1, s2]);

            const inc = c1.integer + 1;
            const res = inc * inc;
            const f = new FrameEvent(1000 / 30);
            f.lastFrame = gl.timestamp.now() - 40;
            gl.setCurretnTimer(f);
            gl.loop();
            expect(integerFactory.get(1).integer).to.equal(res);
            done();
        });
        it("re-order sytems", () => {
            const c1 = integerFactory.create(1, true);
            expect(c1.integer).to.equal(1);

            const s1 = new IncrementSystem();
            s1.setFactories(integerFactory);
            const s2 = new SquareSystem();
            s2.setFactories(integerFactory);

            const gl = new GameLoop([]);
            gl.setSystems([s1, s2]);

            const inc = c1.integer + 1;
            const res = inc * inc;
            const f = new FrameEvent(1000 / 30);
            f.lastFrame = gl.timestamp.now() - 40;
            gl.setCurretnTimer(f);
            gl.loop();
            expect(integerFactory.get(1).integer).to.equal(res);

            // changing the order of operations
            gl.setSystems([s2, s1]);

            const sq = res * res;
            const res2 = sq + 1;
            f.lastFrame = gl.timestamp.now() - 40;
            gl.setCurretnTimer(f);
            gl.loop();
            expect(integerFactory.get(1).integer).to.equal(res2);
        });
        it("pause each system individually", () => {
            // just remove a system from the list

        });
        it("set a frequency of execution for each system", () => {

        });
    });
});
