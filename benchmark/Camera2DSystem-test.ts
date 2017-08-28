import "mocha";
import { expect } from "chai";
import { IComponent, IComponentFactory, ITogglableComponent, ITogglableComponentFactory } from "./../src/interfaces"
import { IActivator, IShape2D, BoundingCircleComponent, CircleComponent, Rectangle} from "./lib/sampleImplementation/component/boundingVolume";
import { ComponentFactory, TogglableComponentFactory } from "./../src/ComponentFactory";
import { Camera2DCullingSystem } from "./lib/sampleImplementation/system/culling2DSystem";
import * as GLM from 'gl-matrix';

describe("Camera2DCulling Sytem", () => {
    class ConcreteComponent implements ITogglableComponent {
        public active: boolean = true;
        constructor(public entityId: string) { }
    }

    function createVec2(x: number, y: number) {
        let v = GLM.vec2.create();
        return GLM.vec2.set(v, x, y);
    }

    let circleInside: BoundingCircleComponent;
    let circleOutside: BoundingCircleComponent;
    let camera: Rectangle;

    //create x factories with y concreteComponent with same entityId in each factory
    function createConcreteFactoryWithComp(nbFactories: number, nbComp: number): TogglableComponentFactory<ConcreteComponent>[] {
        let factories: TogglableComponentFactory<ConcreteComponent>[] = [];
        for (let i = 0; i < nbFactories; ++i) {
            factories.push(new TogglableComponentFactory<ConcreteComponent>());
        }
        for (let i = 0; i < nbComp; ++i) {
            factories.forEach((f) => {
                f.createComponent(ConcreteComponent, "c" + i);
            });
        }
        return factories;
    }
    beforeEach(() => {
        // position is top left of the element
        let circleIn = createVec2(6.0, 6.0);
        let circleOut = createVec2(1.0, 1.0);
        let cameraPos = createVec2(5.0, 5.0);
        let cameraSize = createVec2(10.0, 10.0);
        circleInside = new BoundingCircleComponent("c1", circleIn, 2.0);
        circleOutside = new BoundingCircleComponent("c2", circleOut, 1.0);
        camera = new Rectangle(cameraPos, cameraSize);
    });
    describe("collision detection", () => {
        it("collide should return true if the boundingVolume intersect with the Camera2D ", () => {
            let sys = new Camera2DCullingSystem(camera);
            expect(sys.execute(circleInside)).to.equal(true);
        });
        it("collide should return false if the boundingVolume doesn't intersect with the Camera2D", () => {
            let sys = new Camera2DCullingSystem(camera);
            expect(sys.execute(circleOutside)).to.equal(false);
        });
    });
    describe("process", () => {
        //in frustrum first, out after
        function createFactoryWithCircleComp(vecInFrustrum: GLM.vec2, vecOutFrustrum: GLM.vec2, nbInFrustrum: number, nbOutFrustrum: number): ComponentFactory<BoundingCircleComponent> {
            let f = new ComponentFactory<BoundingCircleComponent>();
            for (let i = 0; i < nbInFrustrum; ++i) {
                f.createComponent(BoundingCircleComponent, "c" + i, vecInFrustrum, 0);
            }
            let l = nbInFrustrum + nbOutFrustrum;
            for (let i = nbInFrustrum; i < l; ++i) {
                f.createComponent(BoundingCircleComponent, "c" + i, vecOutFrustrum, 0);
            }
            return f;
        }

        beforeEach(() => {

        });

        it("should change 'active' proprierty of concreteComp with same entityID as the boundingVolume processed", () => {
            let cc = createConcreteFactoryWithComp(2, 4);
            let bV = createFactoryWithCircleComp(circleInside.topLeft, circleOutside.topLeft, 2, 2);

            // checking that the boundingVolume factory hold components with the same entityId as in the concreteFactories.
            cc.forEach((c) => {
                for (let i = 0; i < bV.size; ++i) {
                    expect(bV.has(c.values[i].entityId));
                    //checking that concreteComponents are actived
                    expect(c.values[i].active).to.equal(true);
                }
            });

            let sys = new Camera2DCullingSystem<Rectangle, BoundingCircleComponent>(camera);
            sys.process(bV, cc);
            cc.forEach((c) => {
                for (let i = 0; i < bV.size; ++i) {
                    let currentbV = bV.values[i];
                    let r = sys.execute(currentbV);
                    expect(c.get(currentbV.entityId).active).to.equal(r);
                }
            });
        });
        it("if entity id not found in a factory", () => {

        });
    });

});
