import "mocha";
import { expect } from "chai";
import { AnimationSystem } from "../system/AnimationSystem"
import { PlaybackState, IFrameEvent, IKeyFrame, IKeyFrameController, KeyFrameControllerComponent } from "../component/KeyFrameController";

import { IComponent, IComponentFactory } from "../../../../src/interfaces";
import { ComponentFactory } from "../../../../src/ComponentFactory";

describe("AnimationClip playstate", () => {

    function incrementFrameEvent(e, delta = 1) {
        if (e.reverse) {
            e.time -= delta;
        } else {
            e.time += delta;
        }
        e.delta = delta;
        e.count += 1;
    }

    let system: AnimationSystem;
    let factory: ComponentFactory<KeyFrameControllerComponent>;
    let c: KeyFrameControllerComponent;

    beforeEach(() => {
        system = new AnimationSystem();
        factory = new ComponentFactory<KeyFrameControllerComponent>();
        c = factory.createComponent(KeyFrameControllerComponent, "c1", true, 10, 10);
    });

    it("instanciated KeyFrameControllerComponent should have it state set to stopped", () => {
        expect(c.from + c.duration).to.equal(20);
        expect(factory.getComponent("c1").playState).to.equal(PlaybackState.stopped);
    });
    it("duration should be at least 1", () => {
        c = factory.createComponent(KeyFrameControllerComponent, "c1", true, 10, 0);
        expect(c.duration).to.equal(1);
    })
    it("set playstate to started when timeRef >= from and <= from+duration", () => {
        expect(c.from + c.duration).to.equal(20);
        let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };

        incrementFrameEvent(e);
        expect(e.time).to.equal(1);
        system.process(factory, e);
        expect(factory.getComponent("c1").playState).to.equal(PlaybackState.stopped);

        incrementFrameEvent(e, 9);
        expect(e.time).to.equal(10);
        system.process(factory, e);
        expect(factory.getComponent("c1").playState).to.equal(PlaybackState.started);
    });
    it("set playstate to playing when timeRef >= from and <= from+duration and it was already set to started", () => {
        expect(c.from + c.duration).to.equal(20);
        let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };

        incrementFrameEvent(e, 11);
        expect(e.time).to.equal(11);
        system.process(factory, e);
        expect(factory.getComponent("c1").playState).to.equal(PlaybackState.started);

        incrementFrameEvent(e);
        expect(e.time).to.equal(12);
        system.process(factory, e);
        expect(factory.getComponent("c1").playState).to.equal(PlaybackState.playing);
    });
    it("set playstate to ended when timeRef >= from and > from+duration and it was set as playing", () => {
        expect(c.from + c.duration).to.equal(20);
        let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };

        // start
        incrementFrameEvent(e, 11);
        expect(e.time).to.equal(11);
        system.process(factory, e);

        // playing
        incrementFrameEvent(e);
        expect(e.time).to.equal(12);
        system.process(factory, e);

        incrementFrameEvent(e, 9);
        expect(e.time).to.equal(21);
        system.process(factory, e);
        expect(factory.getComponent("c1").playState).to.equal(PlaybackState.ended);
    });
    it("set playstate to stopped if state was set on ended", () => {
        expect(c.from + c.duration).to.equal(20);
        let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };

        // start
        incrementFrameEvent(e, 11);
        expect(e.time).to.equal(11);
        system.process(factory, e);

        // playing
        incrementFrameEvent(e);
        expect(e.time).to.equal(12);
        system.process(factory, e);

        // ended
        incrementFrameEvent(e, 9);
        expect(e.time).to.equal(21);
        system.process(factory, e);

        incrementFrameEvent(e);
        expect(e.time).to.equal(22);
        system.process(factory, e);
        expect(factory.getComponent("c1").playState).to.equal(PlaybackState.stopped);
    });

    describe("timer ", () => {
        it("in paying state increment the timer by the delta of reference timer", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            expect(c.timer.time).to.equal(0);

            // start
            incrementFrameEvent(e, 11);
            expect(e.time).to.equal(11);
            system.process(factory, e);

            // playing
            incrementFrameEvent(e);
            expect(e.time).to.equal(12);
            system.process(factory, e);
            expect(e.delta).to.equal(1);
            expect(c.timer.time).to.equal(1);

            incrementFrameEvent(e);
            expect(e.time).to.equal(13);
            system.process(factory, e);
            expect(e.delta).to.equal(1);
            expect(c.timer.time).to.equal(2);
        });
        it("progress should be updated when playing so it indicate from 0 to 1 the progression of the animationClip being played", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            expect(c.timer.time).to.equal(0);

            expect(c.progress).to.equal(0);

            // start
            incrementFrameEvent(e, 10);
            expect(e.time).to.equal(10);
            system.process(factory, e);

            // playing
            incrementFrameEvent(e, 5);
            expect(e.time).to.equal(15);
            system.process(factory, e);
            expect(e.delta).to.equal(5);
            expect(c.timer.time).to.equal(5);

            expect(c.progress).to.equal(0.5);
        });
    });
    describe("play in reverse", () => {
        it("start playing from the end when reverse param is set to true", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.timer.reverse = true;
            incrementFrameEvent(e);
            system.process(factory, e);
            expect(c.timer.time).to.equal(0);

            incrementFrameEvent(e, 9);
            system.process(factory, e);
            expect(c.timer.time).to.equal(c.duration);

        });
        it("decrement the animation timer when playing in reverse", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.timer.reverse = true;
            incrementFrameEvent(e);
            system.process(factory, e);
            expect(c.timer.time).to.equal(0);

            incrementFrameEvent(e, 9);
            system.process(factory, e);
            expect(c.timer.time).to.equal(c.duration);

            incrementFrameEvent(e);
            system.process(factory, e);
            expect(c.timer.time).to.equal(c.duration - 1);
        });
    });
    describe("looping", () => {
        it("toPlayInReverse should set to false by default", () => {
            expect(c.cycling).to.equal(false);
        });
        it("set to started when timer reach the end and toLoop is true", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };

            c.nbLoop = 2;
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            expect(c.playState).to.equal(PlaybackState.started);

        });
        it("start from 0 when looping", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };

            c.nbLoop = 2;
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            expect(c.playState).to.equal(PlaybackState.started);
            expect(c.timer.time).to.equal(0);

        });
        it("increment loopCount at the end", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };

            c.nbLoop = 2;
            expect(c.timer.loopCount).to.equal(0);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            expect(c.timer.loopCount).to.equal(1);
        });
        it("loop the number of time specified by the param nbLoop", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.cycling = false;
            c.nbLoop = 2;
            expect(c.timer.loopCount).to.equal(0);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            expect(c.timer.loopCount).to.equal(1);

            incrementFrameEvent(e);
            system.process(factory, e);

            incrementFrameEvent(e, 10);
            system.process(factory, e);
            expect(c.timer.loopCount).to.equal(2);

        });
        it("loop indefinitely when nbLoop is set to 0", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.nbLoop = 0;
            expect(c.timer.loopCount).to.equal(0);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            expect(c.timer.loopCount).to.equal(1);

            incrementFrameEvent(e, 10);
            system.process(factory, e);
            expect(c.timer.loopCount).to.equal(2);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            expect(c.timer.loopCount).to.equal(3);

            expect(e.time).to.equal(41);
            expect(c.timer.time).to.equal(0);
            expect(c.playState).to.equal(PlaybackState.started);
        });
        it("not looping when nbLoop is set to 1", () => {
            expect(c.from + c.duration).to.equal(20);
            let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };

            c.nbLoop = 1;
            expect(c.timer.loopCount).to.equal(0);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            expect(c.timer.loopCount).to.equal(1);

            incrementFrameEvent(e, 10);
            system.process(factory, e);
            expect(c.playState).to.equal(PlaybackState.stopped);
            expect(c.timer.loopCount).to.equal(1);

            incrementFrameEvent(e, 5);
            system.process(factory, e);
            expect(c.playState).to.equal(PlaybackState.stopped);
            expect(c.timer.loopCount).to.equal(1);
        });
        describe("looping in reverse", () => {
            it("increment the loopCount when looping in reverse", () => {
                expect(c.from + c.duration).to.equal(20);
                let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 2;
                expect(c.timer.loopCount).to.equal(0);
                incrementFrameEvent(e, 10);
                system.process(factory, e);
                incrementFrameEvent(e, 11);
                system.process(factory, e);
                expect(c.timer.loopCount).to.equal(1);
            });
            it("set to started when looping in reverse", () => {
                expect(c.from + c.duration).to.equal(20);
                let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 2;

                incrementFrameEvent(e, 10);
                system.process(factory, e);
                incrementFrameEvent(e, 11);
                system.process(factory, e);

                expect(c.playState).to.equal(PlaybackState.started);

            });
            it("start with timer set to duration instead of 0", () => {
                expect(c.from + c.duration).to.equal(20);
                let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 2;

                incrementFrameEvent(e, 10);
                system.process(factory, e);
                incrementFrameEvent(e, 11);
                system.process(factory, e);

                expect(c.playState).to.equal(PlaybackState.started);
                expect(c.timer.time).to.equal(c.duration);

            });
            it("have the timer set to reverse when looping in reverse", () => {
                expect(c.from + c.duration).to.equal(20);
                let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 2;

                incrementFrameEvent(e, 10);
                system.process(factory, e);

                expect(c.timer.reverse).to.equal(false);

                incrementFrameEvent(e, 11);
                system.process(factory, e);

                expect(c.playState).to.equal(PlaybackState.started);
                expect(c.timer.time).to.equal(c.duration);
                expect(c.timer.reverse).to.equal(true);

            });
            it("increment the loopCount when time reach 0 while it was playing in reverse", () => {
                expect(c.from + c.duration).to.equal(20);
                let e: IFrameEvent = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 3;

                incrementFrameEvent(e, 10);
                system.process(factory, e);

                incrementFrameEvent(e, 11);
                system.process(factory, e);
                expect(c.timer.loopCount).to.equal(1);

                incrementFrameEvent(e);
                system.process(factory, e);
                expect(c.timer.time).to.equal(9);

                incrementFrameEvent(e, 11);
                system.process(factory, e);
                expect(c.timer.time).to.equal(0);
                expect(c.timer.loopCount).to.equal(2);


            });
            it("loop back in normal direction when looping from reverse", () => {

            });
        });

    });
});
