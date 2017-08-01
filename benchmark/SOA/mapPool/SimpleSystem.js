"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    }
    InterpolateSystem.prototype.process = function (components, progress) {
        var _this = this;
        var l = components.size;
        components.forEach(function (v, k) {
            var length = v.endValue - v.startValue;
            var nt = progress / length;
            v.currentValue = _this.interpolate(nt);
        });
    };
    return InterpolateSystem;
}());
exports.InterpolateSystem = InterpolateSystem;
var LinearSystemSys = (function (_super) {
    __extends(LinearSystemSys, _super);
    function LinearSystemSys() {
        return _super.call(this) || this;
    }
    LinearSystemSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    LinearSystemSys.prototype.interpolate = function (t) {
        return t;
    };
    return LinearSystemSys;
}(InterpolateSystem));
var easeInQuadSys = (function (_super) {
    __extends(easeInQuadSys, _super);
    function easeInQuadSys() {
        return _super.call(this) || this;
    }
    easeInQuadSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeInQuadSys.prototype.interpolate = function (t) {
        return t * t;
    };
    return easeInQuadSys;
}(InterpolateSystem));
var easeOutQuadSys = (function (_super) {
    __extends(easeOutQuadSys, _super);
    function easeOutQuadSys() {
        return _super.call(this) || this;
    }
    easeOutQuadSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeOutQuadSys.prototype.interpolate = function (t) {
        return t * (2 - t);
    };
    return easeOutQuadSys;
}(InterpolateSystem));
var easeInOutQuadSys = (function (_super) {
    __extends(easeInOutQuadSys, _super);
    function easeInOutQuadSys() {
        return _super.call(this) || this;
    }
    easeInOutQuadSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeInOutQuadSys.prototype.interpolate = function (t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };
    return easeInOutQuadSys;
}(InterpolateSystem));
var easeInCubicSys = (function (_super) {
    __extends(easeInCubicSys, _super);
    function easeInCubicSys() {
        return _super.call(this) || this;
    }
    easeInCubicSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeInCubicSys.prototype.interpolate = function (t) {
        return t * t * t;
    };
    return easeInCubicSys;
}(InterpolateSystem));
var easeOutCubicSys = (function (_super) {
    __extends(easeOutCubicSys, _super);
    function easeOutCubicSys() {
        return _super.call(this) || this;
    }
    easeOutCubicSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeOutCubicSys.prototype.interpolate = function (t) {
        return (--t) * t * t + 1;
        ;
    };
    return easeOutCubicSys;
}(InterpolateSystem));
var easeInOutCubicSys = (function (_super) {
    __extends(easeInOutCubicSys, _super);
    function easeInOutCubicSys() {
        return _super.call(this) || this;
    }
    easeInOutCubicSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeInOutCubicSys.prototype.interpolate = function (t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    return easeInOutCubicSys;
}(InterpolateSystem));
var easeInQuartSys = (function (_super) {
    __extends(easeInQuartSys, _super);
    function easeInQuartSys() {
        return _super.call(this) || this;
    }
    easeInQuartSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeInQuartSys.prototype.interpolate = function (t) {
        return t * t * t * t;
    };
    return easeInQuartSys;
}(InterpolateSystem));
var easeInOutQuartSys = (function (_super) {
    __extends(easeInOutQuartSys, _super);
    function easeInOutQuartSys() {
        return _super.call(this) || this;
    }
    easeInOutQuartSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeInOutQuartSys.prototype.interpolate = function (t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    };
    return easeInOutQuartSys;
}(InterpolateSystem));
var easeOutQuartSys = (function (_super) {
    __extends(easeOutQuartSys, _super);
    function easeOutQuartSys() {
        return _super.call(this) || this;
    }
    easeOutQuartSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeOutQuartSys.prototype.interpolate = function (t) {
        return 1 - (--t) * t * t * t;
    };
    return easeOutQuartSys;
}(InterpolateSystem));
var easeInQuintSys = (function (_super) {
    __extends(easeInQuintSys, _super);
    function easeInQuintSys() {
        return _super.call(this) || this;
    }
    easeInQuintSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeInQuintSys.prototype.interpolate = function (t) {
        return t * t * t * t * t;
    };
    return easeInQuintSys;
}(InterpolateSystem));
var easeOutQuintSys = (function (_super) {
    __extends(easeOutQuintSys, _super);
    function easeOutQuintSys() {
        return _super.call(this) || this;
    }
    easeOutQuintSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeOutQuintSys.prototype.interpolate = function (t) {
        return 1 + (--t) * t * t * t * t;
    };
    return easeOutQuintSys;
}(InterpolateSystem));
var easeInOutQuintSys = (function (_super) {
    __extends(easeInOutQuintSys, _super);
    function easeInOutQuintSys() {
        return _super.call(this) || this;
    }
    easeInOutQuintSys.prototype.process = function (components, progress) {
        _super.prototype.process.call(this, components, progress);
    };
    easeInOutQuintSys.prototype.interpolate = function (t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    };
    return easeInOutQuintSys;
}(InterpolateSystem));
var easingSystem = {
    systems: [new LinearSystemSys(),
        new easeInQuadSys(),
        new easeOutQuadSys(),
        new easeInOutQuadSys(),
        new easeInCubicSys(),
        new easeOutCubicSys(),
        new easeInOutCubicSys(),
        new easeInQuartSys(),
        new easeOutQuartSys(),
        new easeInOutQuartSys(),
        new easeInQuintSys(),
        new easeOutQuintSys(),
        new easeInOutQuintSys()
    ],
    process: function (factories, progress) {
        var l = factories.length;
        //iterate over all factories, supposed its in the same order as instanciated in the easingSystem
        for (var i = 0; i < l; ++i) {
            var pool = factories[i].pool;
            this.systems[i].process(pool, progress);
        }
    }
};
exports.easingSystem = easingSystem;
