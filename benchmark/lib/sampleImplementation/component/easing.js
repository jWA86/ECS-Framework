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
    function InterpolableComponent(entityId, active, startValue, endValue) {
        if (active === void 0) { active = true; }
        if (startValue === void 0) { startValue = 0; }
        if (endValue === void 0) { endValue = 1; }
        this.entityId = entityId;
        this.active = active;
        this.startValue = startValue;
        this.endValue = endValue;
        this.currentValue = this.startValue;
    }
    return InterpolableComponent;
}());
exports.InterpolableComponent = InterpolableComponent;
