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
var easing_1 = require("../component/easing");
exports.InterpolableComponent = easing_1.InterpolableComponent;
exports.easingMethod = easing_1.easingMethod;
var EasingSystem = (function () {
    function EasingSystem() {
    }
    EasingSystem.prototype.process = function (factory, progress) {
        var _this = this;
        var l = factory.size;
        factory.pool.forEach(function (v) {
            var length = v.endValue - v.startValue;
            if (progress <= length) {
                var nt = progress / length;
                v.currentValue = _this.execute(nt);
            }
        });
    };
    return EasingSystem;
}());
exports.EasingSystem = EasingSystem;
var LinearSystemSys = (function (_super) {
    __extends(LinearSystemSys, _super);
    function LinearSystemSys() {
        return _super.call(this) || this;
    }
    LinearSystemSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    LinearSystemSys.prototype.execute = function (t) {
        return t;
    };
    return LinearSystemSys;
}(EasingSystem));
var easeInQuadSys = (function (_super) {
    __extends(easeInQuadSys, _super);
    function easeInQuadSys() {
        return _super.call(this) || this;
    }
    easeInQuadSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeInQuadSys.prototype.execute = function (t) {
        return t * t;
    };
    return easeInQuadSys;
}(EasingSystem));
var easeOutQuadSys = (function (_super) {
    __extends(easeOutQuadSys, _super);
    function easeOutQuadSys() {
        return _super.call(this) || this;
    }
    easeOutQuadSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeOutQuadSys.prototype.execute = function (t) {
        return t * (2 - t);
    };
    return easeOutQuadSys;
}(EasingSystem));
var easeInOutQuadSys = (function (_super) {
    __extends(easeInOutQuadSys, _super);
    function easeInOutQuadSys() {
        return _super.call(this) || this;
    }
    easeInOutQuadSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeInOutQuadSys.prototype.execute = function (t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };
    return easeInOutQuadSys;
}(EasingSystem));
var easeInCubicSys = (function (_super) {
    __extends(easeInCubicSys, _super);
    function easeInCubicSys() {
        return _super.call(this) || this;
    }
    easeInCubicSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeInCubicSys.prototype.execute = function (t) {
        return t * t * t;
    };
    return easeInCubicSys;
}(EasingSystem));
var easeOutCubicSys = (function (_super) {
    __extends(easeOutCubicSys, _super);
    function easeOutCubicSys() {
        return _super.call(this) || this;
    }
    easeOutCubicSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeOutCubicSys.prototype.execute = function (t) {
        return (--t) * t * t + 1;
        ;
    };
    return easeOutCubicSys;
}(EasingSystem));
var easeInOutCubicSys = (function (_super) {
    __extends(easeInOutCubicSys, _super);
    function easeInOutCubicSys() {
        return _super.call(this) || this;
    }
    easeInOutCubicSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeInOutCubicSys.prototype.execute = function (t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    return easeInOutCubicSys;
}(EasingSystem));
var easeInQuartSys = (function (_super) {
    __extends(easeInQuartSys, _super);
    function easeInQuartSys() {
        return _super.call(this) || this;
    }
    easeInQuartSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeInQuartSys.prototype.execute = function (t) {
        return t * t * t * t;
    };
    return easeInQuartSys;
}(EasingSystem));
var easeInOutQuartSys = (function (_super) {
    __extends(easeInOutQuartSys, _super);
    function easeInOutQuartSys() {
        return _super.call(this) || this;
    }
    easeInOutQuartSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeInOutQuartSys.prototype.execute = function (t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    };
    return easeInOutQuartSys;
}(EasingSystem));
var easeOutQuartSys = (function (_super) {
    __extends(easeOutQuartSys, _super);
    function easeOutQuartSys() {
        return _super.call(this) || this;
    }
    easeOutQuartSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeOutQuartSys.prototype.execute = function (t) {
        return 1 - (--t) * t * t * t;
    };
    return easeOutQuartSys;
}(EasingSystem));
var easeInQuintSys = (function (_super) {
    __extends(easeInQuintSys, _super);
    function easeInQuintSys() {
        return _super.call(this) || this;
    }
    easeInQuintSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeInQuintSys.prototype.execute = function (t) {
        return t * t * t * t * t;
    };
    return easeInQuintSys;
}(EasingSystem));
var easeOutQuintSys = (function (_super) {
    __extends(easeOutQuintSys, _super);
    function easeOutQuintSys() {
        return _super.call(this) || this;
    }
    easeOutQuintSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeOutQuintSys.prototype.execute = function (t) {
        return 1 + (--t) * t * t * t * t;
    };
    return easeOutQuintSys;
}(EasingSystem));
var easeInOutQuintSys = (function (_super) {
    __extends(easeInOutQuintSys, _super);
    function easeInOutQuintSys() {
        return _super.call(this) || this;
    }
    easeInOutQuintSys.prototype.process = function (factory, progress) {
        _super.prototype.process.call(this, factory, progress);
    };
    easeInOutQuintSys.prototype.execute = function (t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    };
    return easeInOutQuintSys;
}(EasingSystem));
//System that warp all easing systems
//should use branching instead in real use case ?
var InterpolationSystem = (function () {
    function InterpolationSystem() {
        this.systems = [
            new LinearSystemSys(),
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
        ];
    }
    InterpolationSystem.prototype.process = function (factories, progress) {
        var l = factories.length;
        //iterate over all factories, supposed its in the same order as instanciated in the easingSystem
        var called = 0;
        for (var i = 0; i < l; ++i) {
            this.systems[i].process(factories[i], progress);
        }
    };
    return InterpolationSystem;
}());
exports.InterpolationSystem = InterpolationSystem;
