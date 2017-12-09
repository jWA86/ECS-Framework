import { expect } from "chai";
import "mocha";
import { ComponentFactory, EntityFactory } from "../src/ComponentFactory";
import { FrameEvent, GameLoop } from "../src/GameLoop";
import { IComponent, IComponentFactory, IFrameEvent } from "../src/interfaces";
import { System } from "../src/System";

describe("GameLoop should be able to", () => {

    class EmptyComponent implements IComponent {
        constructor(public entityId: number, public active: boolean) { }
    }
    // Stop the Game loop after a certain amount of time have passed
    class FeedBackSystem extends System {
        public static gl: GameLoop;
        public static runFor = 500;
        public static callBack = (timer: IFrameEvent) => {
            // expect(timer.delta).to.approximately(frequency, 2);
            if (timer.time >= FeedBackSystem.runFor) {
                FeedBackSystem.gl.stop();
            }
        }
        public execute(emptyComp: IComponent, timer: IFrameEvent) {
            FeedBackSystem.callBack(timer);
        }
    }

    let feedBackFactory: ComponentFactory<EmptyComponent>;

    beforeEach(() => {
        feedBackFactory = new ComponentFactory<EmptyComponent>(2, EmptyComponent, (timer: IFrameEvent) => { });

    });

    // it("start execution of the loop ", () => {
    //     const gl = new GameLoop();
    //     gl.start();
    //     expect(gl.isRunning()).to.equal(true);
    // });
    it("stop the execution of the loop", (done) => {
        const gl = new GameLoop([]);
        FeedBackSystem.gl = gl;
        FeedBackSystem.runFor = 500;
        const s = new FeedBackSystem();

        s.setFactories(feedBackFactory);
        feedBackFactory.create(1, true);

        gl.setSystems([s]);
        gl.start();

        setTimeout(() => {
            if (gl.isRunning()) {
                gl.stop();
                done(new Error("the loop didn't stop"));
            } else {
                done();
            }
        }, 600);

        // will be called if the feedback component end the game loop
        // expect(gl.isRunning()).to.equal(false);
        // done();
    });
    // it("update the timer provided while looping", () => {
    //     feedBackFactory.create(1, true);

    //     const s = new FeedBackSystem();
    //     s.setFactories(feedBackFactory);

    //     const runFor = 500;
    //     const gl = new GameLoop([s]);

    //     FeedBackSystem.gl = gl;
    //     FeedBackSystem.runFor = runFor;

    //     gl.start();

    //     const t = gl.getCurrentTimer();
    //     expect(t.time).to.approximately(runFor, 50);
    // });
    // it("update the time ellapsed since the game loop start", () => {
    //     feedBackFactory.create(1, true);
    //     const s = new FeedBackSystem();
    //     s.setFactories(feedBackFactory);

    //     const gl = new GameLoop([s]);
    //     const runFor = 500;

    //     FeedBackSystem.gl = gl;
    //     FeedBackSystem.runFor = runFor;
    //     const t1 = Date.now();
    //     gl.start();
    //     const delta = Date.now() - t1;
    //     const currentTimer = gl.getCurrentTimer();
    //     expect(currentTimer.time).to.approximately(delta, 20);
    // });
    // it("update the time of the last iteration", () => {
    //     feedBackFactory.create(1, true);
    //     const s = new FeedBackSystem();
    //     s.setFactories(feedBackFactory);

    //     const gl = new GameLoop([s]);
    //     const runFor = 500;

    //     FeedBackSystem.gl = gl;
    //     FeedBackSystem.runFor = runFor;

    //     gl.start();
    //     const t1 = Date.now();
    //     // last frame time should correspond to the time the gl stop since it's called from a component execution
    //     expect(gl.getCurrentTimer().lastFrame).to.approximately(t1, 20);
    // });
    // it("update at fixed frequency", () => {
    //     feedBackFactory.create(1, true);
    //     const s = new FeedBackSystem();
    //     s.setFactories(feedBackFactory);

    //     const gl = new GameLoop([s]);
    //     gl.setFrequency(25);
    //     const runFor = 500;

    //     FeedBackSystem.gl = gl;
    //     FeedBackSystem.runFor = runFor;

    //     gl.start();
    //     // just checkign that delta of the last called correspond to the frequency setted
    //     expect(gl.getCurrentTimer().delta).to.approximately(25, 1);
    // });
    // // it("change the frequency of execution at runtime", () => {
    //     // need an event system in the game loop
    //     // observer ?
    //     // event queue ?
    // // });

    // describe("use of Systems ", () => {
    //     // dummy system that increment a interger
    //     class IntegerComponent implements IComponent {
    //         constructor(public entityId: number, public active: boolean, public integer: number) { }
    //     }
    //     class IncrementSystem extends System {
    //         constructor() { super(); }
    //         public execute(int: IntegerComponent) {
    //             int.integer += 1;
    //         }
    //     }

    //     // Dummy system that multiply an integer by itself
    //     class SquareSystem extends System {
    //         constructor() { super(); }
    //         public execute(int: IntegerComponent) {
    //             int.integer = int.integer * int.integer;
    //         }
    //     }

    //     let integerFactory: ComponentFactory<IntegerComponent>;

    //     beforeEach(() => {
    //         integerFactory = new ComponentFactory<IntegerComponent>(5, IntegerComponent, 1);

    //         it("accept a list of System to iterate on", () => {
    //             const gl = new GameLoop([]);
    //             const inputArr = [];

    //             inputArr.push(new IncrementSystem());
    //             inputArr.push(new SquareSystem());
    //             gl.setSystems(inputArr);

    //             const outputArr = gl.getSystems();

    //             expect(outputArr.length).to.equal(inputArr.length);
    //             for (let i = 0; i < outputArr.length; ++i) {
    //                 expect(outputArr[i]).to.equal(inputArr[i]);
    //             }
    //         });
    //         it("process systems in the order they are provided", () => {
    //             const c1 = integerFactory.create(1, true);
    //             expect(c1.integer).to.equal(1);

    //             const s1 = new IncrementSystem();
    //             s1.setFactories(integerFactory);
    //             const s2 = new SquareSystem();
    //             s2.setFactories(integerFactory);

    //             const gl = new GameLoop([]);
    //             gl.setSystems([s1, s2]);

    //             const inc = c1.integer + 1;
    //             const res = inc * inc;
    //             gl.loop(new FrameEvent());
    //             expect(integerFactory.get(1).integer).to.equal(res);

    //         });
    //         it("re-order sytems", () => {
    //             const c1 = integerFactory.create(1, true);
    //             expect(c1.integer).to.equal(1);

    //             const s1 = new IncrementSystem();
    //             s1.setFactories(integerFactory);
    //             const s2 = new SquareSystem();
    //             s2.setFactories(integerFactory);

    //             const gl = new GameLoop([]);
    //             gl.setSystems([s1, s2]);

    //             const inc = c1.integer + 1;
    //             const res = inc * inc;
    //             gl.loop(new FrameEvent());
    //             expect(integerFactory.get(1).integer).to.equal(res);

    //             // changing the order of operations
    //             gl.setSystems([s2, s1]);

    //             const sq = res * res;
    //             const res2 = sq + 1;
    //             gl.loop(new FrameEvent());
    //             expect(integerFactory.get(1).integer).to.equal(res2);
    //         });
            //             it("process systems at a fixed frequency", (done) => {
            //                 const c1 = integerFactory.create(1, true);
            //                 expect(c1.integer).to.equal(1);

            //                 const timerRef = new FrameEvent();
            //                 const runFor = 1000; // run for 1s
            //                 const frequency = 30 / 1000;
            //                 const s = new FeedBackSystem();
            //                 s.setFactories(feedBackFactory);
            //                 feedBackFactory.create(1, true, (timer: IFrameEvent) => {
            //                     expect(timer.delta).to.approximately(frequency, 2);
            //                     if (timer.time >= runFor) {
            //                         gl.stop();
            //                         done();
            //                     }

            //                 });
            //                 const gl = new GameLoop();
            //                 gl.setSystems([s]);
            //                 gl.start();
            //                 gl.setFrequency(frequency);
            //                 gl.update(timerRef);
            //             });
            //             it("pause each system individually", () => {

            //             });
            //             it("set a frequency of execution for each system", () => {

            //             });
            //             it("", () => {

            //             });
            //         });
            //     });
        });
//     });
// });
