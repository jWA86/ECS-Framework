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
var ComponentFactory_1 = require("./ComponentFactory");
var HierarchicalComponentFactory = (function (_super) {
    __extends(HierarchicalComponentFactory, _super);
    function HierarchicalComponentFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HierarchicalComponentFactory.prototype.createChildComponent = function (type, parentId) {
        var index = this.getComponentIndex(parentId);
        var id = this.generateUniqueId();
        var t = new type(id);
        if (index > -1) {
            var nbChild = this.pool[index].children.length;
            this.pool[index].children.push(id);
            //insert as last child
            this.insertComponent(t, index + nbChild + 1);
        }
        else {
            this.insertComponent(t, index + 1);
        }
        return t;
    };
    HierarchicalComponentFactory.prototype.removeComponent = function (id, removeChildren) {
        if (removeChildren === void 0) { removeChildren = false; }
        var parentC = this.getComponent(id);
        if (parentC) {
            //remove children first
            if (removeChildren) {
                for (var i = 0; i < parentC.children.length; ++i) {
                    this.removeComponent(parentC.children[i], true);
                }
            }
            _super.prototype.removeComponent.call(this, parentC.id);
            return true;
        }
        return false;
    };
    return HierarchicalComponentFactory;
}(ComponentFactory_1.ComponentFactory));
exports.HierarchicalComponentFactory = HierarchicalComponentFactory;
