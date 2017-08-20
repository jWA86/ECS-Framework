"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationClipComponent_1 = require("../component/AnimationClipComponent");
var AnimationSystem = (function () {
    function AnimationSystem() {
    }
    AnimationSystem.prototype.process = function (factory, timeRef) {
        var l = factory.size;
        var f = factory.pool.values;
        for (var i = 0; i < l; ++i) {
            if (f[i].active) {
                this.execute(f[i], timeRef);
            }
        }
    };
    AnimationSystem.prototype.execute = function (c, timeRef) {
        // if paused don't update
        if (c.playState === AnimationClipComponent_1.PlaybackState.paused) {
            return;
        }
        var loopEnded = c.timer.loopCount >= c.nbLoop && c.nbLoop !== 0;
        // if loopCount reached but not yet set to stopped 
        if (loopEnded && c.playState === AnimationClipComponent_1.PlaybackState.ended) {
            c.playState = AnimationClipComponent_1.PlaybackState.stopped;
            c.timer.count += 1;
            return;
        }
        //relative time
        var rFrom = c.from * (c.timer.loopCount + 1);
        var rEnd = c.from + c.duration * (c.timer.loopCount + 1);
        // start
        if ((c.playState === AnimationClipComponent_1.PlaybackState.stopped)
            && timeRef.time >= rFrom && timeRef.time <= rEnd && !loopEnded) {
            c.playState = AnimationClipComponent_1.PlaybackState.started;
            c.timer.count += 1;
            // when we start directly in reverse
            if (c.timer.reverse) {
                c.timer.time = c.duration;
            }
            return;
        }
        else if ((c.playState === AnimationClipComponent_1.PlaybackState.started || c.playState === AnimationClipComponent_1.PlaybackState.playing)
            && timeRef.time >= rFrom && timeRef.time <= rEnd && !loopEnded) {
            c.playState = AnimationClipComponent_1.PlaybackState.playing;
            if (!c.timer.reverse) {
                c.timer.time += timeRef.delta;
            }
            else {
                c.timer.time -= timeRef.delta;
            }
            c.timer.delta = timeRef.delta;
            c.timer.count += 1;
            c.progress += c.timer.time / c.duration;
            return;
        }
        else if ((c.playState === AnimationClipComponent_1.PlaybackState.started || c.playState === AnimationClipComponent_1.PlaybackState.playing)
            && timeRef.time >= rFrom && timeRef.time > rEnd && !loopEnded) {
            c.playState = AnimationClipComponent_1.PlaybackState.ended;
            c.timer.loopCount += 1;
            c.timer.count += 1;
            this.changeDirection(c, timeRef);
            return;
        }
    };
    AnimationSystem.prototype.changeDirection = function (c, timeRef) {
        if (c.timer.loopCount >= c.nbLoop && c.nbLoop !== 0) {
            return;
        }
        // looping back from start
        if (!c.cycling) {
            if (c.fadeLoop) {
                var delta = c.duration - c.timer.time;
                var toStartDelta = timeRef.delta - delta;
                c.timer.time = toStartDelta;
            }
            else {
                c.timer.time = 0;
            }
        }
        else {
            c.timer.reverse = !c.timer.reverse;
            if (c.fadeLoop) {
            }
            else {
                if (c.timer.reverse) {
                    c.timer.time = c.duration;
                }
                else {
                    c.timer.time = 0;
                }
            }
        }
        c.progress += c.timer.time / c.duration;
        c.playState = AnimationClipComponent_1.PlaybackState.started;
    };
    return AnimationSystem;
}());
exports.AnimationSystem = AnimationSystem;
