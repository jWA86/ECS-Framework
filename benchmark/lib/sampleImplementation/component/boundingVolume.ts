import { IComponent, IComponentFactory, ITogglableComponent, ITogglableComponentFactory } from "../../../../src/interfaces"
import { ISystem } from "../../../../src/System";
import { ComponentFactory } from "../../../../src/ComponentFactory";
import * as GLM from 'gl-matrix';

export { IActivator, IShape2D, CircleComponent, Rectangle, BoundingCircleComponent };

interface IShape2D {
    //world position
    topLeft: GLM.vec2;
}

interface IActivator {
    //proprety use for activating siblings
    toActive: boolean;
}

// interface ICullingShape extends IShape2DComponent, IActivatorComponent{}


class CircleComponent implements IShape2D, IComponent {
    constructor(public entityId: string,
        public topLeft: GLM.vec2,
        public radius: number) { }
}

class BoundingCircleComponent extends CircleComponent implements IShape2D, IActivator, IComponent {
    constructor(public entityId: string,
        public topLeft: GLM.vec2,
        public radius: number,
     public toActive: boolean = false) {
         super(entityId, topLeft, radius);
      }
}


class Rectangle implements IShape2D {
    topLeft: GLM.vec2;
    bottomRight: GLM.vec2;
    constructor(topLeft: GLM.vec2, size: GLM.vec2) {
        this.topLeft = topLeft;
        this.bottomRight = GLM.vec2.create();
        GLM.vec2.add(this.bottomRight, this.topLeft, size);
    }
}
