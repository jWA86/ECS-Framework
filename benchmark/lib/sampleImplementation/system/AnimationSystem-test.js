"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var AnimationSystem_1 = require("../system/AnimationSystem");
var KeyFrameController_1 = require("../component/KeyFrameController");
var ComponentFactory_1 = require("../../../../src/ComponentFactory");
describe("AnimationClip playstate", function () {
    function incrementFrameEvent(e, delta) {
        if (delta === void 0) { delta = 1; }
        if (e.reverse) {
            e.time -= delta;
        }
        else {
            e.time += delta;
        }
        e.delta = delta;
        e.count += 1;
    }
    var system;
    var factory;
    var c;
    beforeEach(function () {
        system = new AnimationSystem_1.AnimationSystem();
        factory = new ComponentFactory_1.ComponentFactory();
        c = factory.createComponent(KeyFrameController_1.KeyFrameControllerComponent, "c1", true, 10, 10);
    });
    it("instanciated KeyFrameControllerComponent should have it state set to stopped", function () {
        chai_1.expect(c.from + c.duration).to.equal(20);
        chai_1.expect(factory.getComponent("c1").playState).to.equal(KeyFrameController_1.PlaybackState.stopped);
    });
    it("duration should be at least 1", function () {
        c = factory.createComponent(KeyFrameController_1.KeyFrameControllerComponent, "c1", true, 10, 0);
        chai_1.expect(c.duration).to.equal(1);
    });
    it("set playstate to started when timeRef >= from and <= from+duration", function () {
        chai_1.expect(c.from + c.duration).to.equal(20);
        var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
        incrementFrameEvent(e);
        chai_1.expect(e.time).to.equal(1);
        system.process(factory, e);
        chai_1.expect(factory.getComponent("c1").playState).to.equal(KeyFrameController_1.PlaybackState.stopped);
        incrementFrameEvent(e, 9);
        chai_1.expect(e.time).to.equal(10);
        system.process(factory, e);
        chai_1.expect(factory.getComponent("c1").playState).to.equal(KeyFrameController_1.PlaybackState.started);
    });
    it("set playstate to playing when timeRef >= from and <= from+duration and it was already set to started", function () {
        chai_1.expect(c.from + c.duration).to.equal(20);
        var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
        incrementFrameEvent(e, 11);
        chai_1.expect(e.time).to.equal(11);
        system.process(factory, e);
        chai_1.expect(factory.getComponent("c1").playState).to.equal(KeyFrameController_1.PlaybackState.started);
        incrementFrameEvent(e);
        chai_1.expect(e.time).to.equal(12);
        system.process(factory, e);
        chai_1.expect(factory.getComponent("c1").playState).to.equal(KeyFrameController_1.PlaybackState.playing);
    });
    it("set playstate to ended when timeRef >= from and > from+duration and it was set as playing", function () {
        chai_1.expect(c.from + c.duration).to.equal(20);
        var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
        // start
        incrementFrameEvent(e, 11);
        chai_1.expect(e.time).to.equal(11);
        system.process(factory, e);
        // playing
        incrementFrameEvent(e);
        chai_1.expect(e.time).to.equal(12);
        system.process(factory, e);
        incrementFrameEvent(e, 9);
        chai_1.expect(e.time).to.equal(21);
        system.process(factory, e);
        chai_1.expect(factory.getComponent("c1").playState).to.equal(KeyFrameController_1.PlaybackState.ended);
    });
    it("set playstate to stopped if state was set on ended", function () {
        chai_1.expect(c.from + c.duration).to.equal(20);
        var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
        // start
        incrementFrameEvent(e, 11);
        chai_1.expect(e.time).to.equal(11);
        system.process(factory, e);
        // playing
        incrementFrameEvent(e);
        chai_1.expect(e.time).to.equal(12);
        system.process(factory, e);
        // ended
        incrementFrameEvent(e, 9);
        chai_1.expect(e.time).to.equal(21);
        system.process(factory, e);
        incrementFrameEvent(e);
        chai_1.expect(e.time).to.equal(22);
        system.process(factory, e);
        chai_1.expect(factory.getComponent("c1").playState).to.equal(KeyFrameController_1.PlaybackState.stopped);
    });
    describe("timer ", function () {
        it("in paying state increment the timer by the delta of reference timer", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            chai_1.expect(c.timer.time).to.equal(0);
            // start
            incrementFrameEvent(e, 11);
            chai_1.expect(e.time).to.equal(11);
            system.process(factory, e);
            // playing
            incrementFrameEvent(e);
            chai_1.expect(e.time).to.equal(12);
            system.process(factory, e);
            chai_1.expect(e.delta).to.equal(1);
            chai_1.expect(c.timer.time).to.equal(1);
            incrementFrameEvent(e);
            chai_1.expect(e.time).to.equal(13);
            system.process(factory, e);
            chai_1.expect(e.delta).to.equal(1);
            chai_1.expect(c.timer.time).to.equal(2);
        });
        it("progress should be updated when playing so it indicate from 0 to 1 the progression of the animationClip being played", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            chai_1.expect(c.timer.time).to.equal(0);
            chai_1.expect(c.progress).to.equal(0);
            // start
            incrementFrameEvent(e, 10);
            chai_1.expect(e.time).to.equal(10);
            system.process(factory, e);
            // playing
            incrementFrameEvent(e, 5);
            chai_1.expect(e.time).to.equal(15);
            system.process(factory, e);
            chai_1.expect(e.delta).to.equal(5);
            chai_1.expect(c.timer.time).to.equal(5);
            chai_1.expect(c.progress).to.equal(0.5);
        });
    });
    describe("play in reverse", function () {
        it("start playing from the end when reverse param is set to true", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.timer.reverse = true;
            incrementFrameEvent(e);
            system.process(factory, e);
            chai_1.expect(c.timer.time).to.equal(0);
            incrementFrameEvent(e, 9);
            system.process(factory, e);
            chai_1.expect(c.timer.time).to.equal(c.duration);
        });
        it("decrement the animation timer when playing in reverse", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.timer.reverse = true;
            incrementFrameEvent(e);
            system.process(factory, e);
            chai_1.expect(c.timer.time).to.equal(0);
            incrementFrameEvent(e, 9);
            system.process(factory, e);
            chai_1.expect(c.timer.time).to.equal(c.duration);
            incrementFrameEvent(e);
            system.process(factory, e);
            chai_1.expect(c.timer.time).to.equal(c.duration - 1);
        });
    });
    describe("looping", function () {
        it("toPlayInReverse should set to false by default", function () {
            chai_1.expect(c.cycling).to.equal(false);
        });
        it("set to started when timer reach the end and toLoop is true", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.nbLoop = 2;
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            chai_1.expect(c.playState).to.equal(KeyFrameController_1.PlaybackState.started);
        });
        it("start from 0 when looping", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.nbLoop = 2;
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            chai_1.expect(c.playState).to.equal(KeyFrameController_1.PlaybackState.started);
            chai_1.expect(c.timer.time).to.equal(0);
        });
        it("increment loopCount at the end", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.nbLoop = 2;
            chai_1.expect(c.timer.loopCount).to.equal(0);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            chai_1.expect(c.timer.loopCount).to.equal(1);
        });
        it("loop the number of time specified by the param nbLoop", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.cycling = false;
            c.nbLoop = 2;
            chai_1.expect(c.timer.loopCount).to.equal(0);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            chai_1.expect(c.timer.loopCount).to.equal(1);
            incrementFrameEvent(e);
            system.process(factory, e);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            chai_1.expect(c.timer.loopCount).to.equal(2);
        });
        it("loop indefinitely when nbLoop is set to 0", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.nbLoop = 0;
            chai_1.expect(c.timer.loopCount).to.equal(0);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            chai_1.expect(c.timer.loopCount).to.equal(1);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            chai_1.expect(c.timer.loopCount).to.equal(2);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            chai_1.expect(c.timer.loopCount).to.equal(3);
            chai_1.expect(e.time).to.equal(41);
            chai_1.expect(c.timer.time).to.equal(0);
            chai_1.expect(c.playState).to.equal(KeyFrameController_1.PlaybackState.started);
        });
        it("not looping when nbLoop is set to 1", function () {
            chai_1.expect(c.from + c.duration).to.equal(20);
            var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
            c.nbLoop = 1;
            chai_1.expect(c.timer.loopCount).to.equal(0);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            incrementFrameEvent(e, 11);
            system.process(factory, e);
            chai_1.expect(c.timer.loopCount).to.equal(1);
            incrementFrameEvent(e, 10);
            system.process(factory, e);
            chai_1.expect(c.playState).to.equal(KeyFrameController_1.PlaybackState.stopped);
            chai_1.expect(c.timer.loopCount).to.equal(1);
            incrementFrameEvent(e, 5);
            system.process(factory, e);
            chai_1.expect(c.playState).to.equal(KeyFrameController_1.PlaybackState.stopped);
            chai_1.expect(c.timer.loopCount).to.equal(1);
        });
        describe("looping in reverse", function () {
            it("increment the loopCount when looping in reverse", function () {
                chai_1.expect(c.from + c.duration).to.equal(20);
                var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 2;
                chai_1.expect(c.timer.loopCount).to.equal(0);
                incrementFrameEvent(e, 10);
                system.process(factory, e);
                incrementFrameEvent(e, 11);
                system.process(factory, e);
                chai_1.expect(c.timer.loopCount).to.equal(1);
            });
            it("set to started when looping in reverse", function () {
                chai_1.expect(c.from + c.duration).to.equal(20);
                var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 2;
                incrementFrameEvent(e, 10);
                system.process(factory, e);
                incrementFrameEvent(e, 11);
                system.process(factory, e);
                chai_1.expect(c.playState).to.equal(KeyFrameController_1.PlaybackState.started);
            });
            it("start with timer set to duration instead of 0", function () {
                chai_1.expect(c.from + c.duration).to.equal(20);
                var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 2;
                incrementFrameEvent(e, 10);
                system.process(factory, e);
                incrementFrameEvent(e, 11);
                system.process(factory, e);
                chai_1.expect(c.playState).to.equal(KeyFrameController_1.PlaybackState.started);
                chai_1.expect(c.timer.time).to.equal(c.duration);
            });
            it("have the timer set to reverse when looping in reverse", function () {
                chai_1.expect(c.from + c.duration).to.equal(20);
                var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 2;
                incrementFrameEvent(e, 10);
                system.process(factory, e);
                chai_1.expect(c.timer.reverse).to.equal(false);
                incrementFrameEvent(e, 11);
                system.process(factory, e);
                chai_1.expect(c.playState).to.equal(KeyFrameController_1.PlaybackState.started);
                chai_1.expect(c.timer.time).to.equal(c.duration);
                chai_1.expect(c.timer.reverse).to.equal(true);
            });
            it("increment the loopCount when time reach 0 while it was playing in reverse", function () {
                chai_1.expect(c.from + c.duration).to.equal(20);
                var e = { delta: 0, time: 0, count: 0, loopCount: 0, reverse: false };
                c.cycling = true;
                c.nbLoop = 3;
                incrementFrameEvent(e, 10);
                system.process(factory, e);
                incrementFrameEvent(e, 11);
                system.process(factory, e);
                chai_1.expect(c.timer.loopCount).to.equal(1);
                incrementFrameEvent(e);
                system.process(factory, e);
                chai_1.expect(c.timer.time).to.equal(9);
                incrementFrameEvent(e, 11);
                system.process(factory, e);
                chai_1.expect(c.timer.time).to.equal(0);
                chai_1.expect(c.timer.loopCount).to.equal(2);
            });
            it("loop back in normal direction when looping from reverse", function () {
            });
        });
    });
});
