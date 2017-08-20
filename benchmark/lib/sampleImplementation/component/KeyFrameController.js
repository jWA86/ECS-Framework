"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlaybackState;
(function (PlaybackState) {
    //first update flag to start
    PlaybackState[PlaybackState["started"] = 0] = "started";
    //next will be in playing flag for the whole duration
    PlaybackState[PlaybackState["playing"] = 1] = "playing";
    // ended once it reach the end of a timeline
    PlaybackState[PlaybackState["ended"] = 2] = "ended";
    // next will be in stopped until it's start again
    PlaybackState[PlaybackState["stopped"] = 3] = "stopped";
    PlaybackState[PlaybackState["paused"] = 4] = "paused";
})(PlaybackState || (PlaybackState = {}));
exports.PlaybackState = PlaybackState;
var KeyFrameControllerComponent = (function () {
    function KeyFrameControllerComponent(entityId, active, from, duration) {
        this.entityId = entityId;
        this.active = active;
        this.from = from;
        this.duration = duration;
        this.nbLoop = 1;
        this.progress = 0;
        this.playState = PlaybackState.stopped;
        this.timer = { 'count': 0, 'delta': 0, 'loopCount': 0, 'reverse': false, 'time': 0 };
        this.cycling = false;
        this.fadeLoop = false;
        duration < 1 ? this.duration = 1 : this.duration = duration;
    }
    return KeyFrameControllerComponent;
}());
exports.KeyFrameControllerComponent = KeyFrameControllerComponent;
