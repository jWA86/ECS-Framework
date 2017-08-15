import {IComponent } from "../../../../src/interfaces";

export {Vec2Component, IVec2Component}

interface IVec2Component extends IComponent {
    x: number;
    y: number;
}

class Vec2Component implements IVec2Component {
    public active:boolean = true;
    constructor(public entityId: string, public x = 0, public y = 0) {
    }
}

