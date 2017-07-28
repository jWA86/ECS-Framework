"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var easingMethod;
(function (easingMethod) {
    easingMethod[easingMethod["linear"] = 0] = "linear";
    easingMethod[easingMethod["easeInQuad"] = 1] = "easeInQuad";
    easingMethod[easingMethod["easeOutQuad"] = 2] = "easeOutQuad";
    easingMethod[easingMethod["easeInOutQuad"] = 3] = "easeInOutQuad";
    easingMethod[easingMethod["easeInCubic"] = 4] = "easeInCubic";
    easingMethod[easingMethod["easeOutCubic"] = 5] = "easeOutCubic";
    easingMethod[easingMethod["easeInOutCubic"] = 6] = "easeInOutCubic";
    easingMethod[easingMethod["easeInQuart"] = 7] = "easeInQuart";
    easingMethod[easingMethod["easeOutQuart"] = 8] = "easeOutQuart";
    easingMethod[easingMethod["easeInOutQuart"] = 9] = "easeInOutQuart";
    easingMethod[easingMethod["easeInQuint"] = 10] = "easeInQuint";
    easingMethod[easingMethod["easeOutQuint"] = 11] = "easeOutQuint";
    easingMethod[easingMethod["easeInOutQuint"] = 12] = "easeInOutQuint";
})(easingMethod || (easingMethod = {}));
exports.easingMethod = easingMethod;
var InterpolableComponent = (function () {
    function InterpolableComponent(id, easing, startValue, endValue) {
        if (easing === void 0) { easing = easingMethod.linear; }
        if (startValue === void 0) { startValue = 0; }
        if (endValue === void 0) { endValue = 1; }
        this.id = id;
        this.easing = easing;
        this.startValue = startValue;
        this.endValue = endValue;
        this.currentValue = this.startValue;
    }
    return InterpolableComponent;
}());
exports.InterpolableComponent = InterpolableComponent;
var InterpolateSystem = (function () {
    function InterpolateSystem() {
        this.easingFunctions = {
            // no easing, no acceleration
            linear: function (t) { return t; },
            // accelerating from zero velocity
            easeInQuad: function (t) { return t * t; },
            // decelerating to zero velocity
            easeOutQuad: function (t) { return t * (2 - t); },
            // acceleration until halfway, then deceleration
            easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
            // accelerating from zero velocity 
            easeInCubic: function (t) { return t * t * t; },
            // decelerating to zero velocity 
            easeOutCubic: function (t) { return (--t) * t * t + 1; },
            // acceleration until halfway, then deceleration 
            easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
            // accelerating from zero velocity 
            easeInQuart: function (t) { return t * t * t * t; },
            // decelerating to zero velocity 
            easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
            // acceleration until halfway, then deceleration
            easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
            // accelerating from zero velocity
            easeInQuint: function (t) { return t * t * t * t * t; },
            // decelerating to zero velocity
            easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
            // acceleration until halfway, then deceleration 
            easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
        };
    }
    InterpolateSystem.prototype.process = function (components, progress) {
        var l = components.length;
        for (var i = 0; i < l; ++i) {
            var c = components[i];
            var length_1 = components[i].endValue - components[i].startValue;
            var normProgress = progress / length_1;
            components[i].currentValue = this.easingFunctions[easingMethod[components[i].easing]](normProgress);
        }
        ;
    };
    return InterpolateSystem;
}());
exports.InterpolateSystem = InterpolateSystem;
