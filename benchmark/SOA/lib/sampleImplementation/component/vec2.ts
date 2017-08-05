import {IComponent } from "../../../../../src/SOA/interfaces";
interface IVec2Component extends IComponent {
    x: number;
    y: number;
}

class Vec2Component implements IVec2Component {
    constructor(public id: string, public x = 0, public y = 0) {
    }
}

export {Vec2Component, IVec2Component}