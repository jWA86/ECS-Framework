import * as m from "./utils/perfTestUtils";
import { writeRes } from "./utils/nodeUtils";
import { IComponent, IComponentFactory, ITogglableComponent, ITogglableComponentFactory } from "../src/interfaces";
import { IShape2D, IActivator, Rectangle, BoundingCircleComponent } from "./lib/sampleImplementation/component/boundingVolume";
import { Camera2DCullingSystem } from "./lib/sampleImplementation/system/culling2DSystem";
import { ComponentFactory, TogglableComponentFactory } from "../src/ComponentFactory";
import * as GLM from 'gl-matrix';

function createVec2(x: number, y: number) {
    let v = GLM.vec2.create();
    return GLM.vec2.set(v, x, y);
}

class ConcreteComponent implements ITogglableComponent {
    public active: boolean = true;
    constructor(public entityId: string) { }
}

class benchToggleSystem implements m.IPerfTest {
    system: Camera2DCullingSystem<Rectangle, BoundingCircleComponent>;
    boundingVFactory: ComponentFactory<BoundingCircleComponent>;
    camera: Rectangle;
    circleInside: BoundingCircleComponent;
    circleOutside: BoundingCircleComponent;
    constructor(nbCompInsideFrustrum: number, nbCompOutsideFrustrum: number) {
        let cameraPos = createVec2(5.0, 5.0);
        let cameraSize = createVec2(10.0, 10.0);
        this.camera = new Rectangle(cameraPos, cameraSize);
        let circleIn = createVec2(6.0, 6.0);
        let circleOut = createVec2(1.0, 1.0);
        this.circleInside = new BoundingCircleComponent("c1", circleIn, 2.0);
        this.circleOutside = new BoundingCircleComponent("c2", circleOut, 1.0);
        this.system = this.createSystem();
        this.boundingVFactory = this.createFactories();
        this.createComponents(this.circleInside.topLeft, this.circleOutside.topLeft, nbCompInsideFrustrum, nbCompOutsideFrustrum);
    }

    createSystem() {
        return new Camera2DCullingSystem<Rectangle, BoundingCircleComponent>(this.camera);
    }

    createFactories() {
        return new ComponentFactory<BoundingCircleComponent>();
    }

    createComponents(vecInFrustrum: GLM.vec2, vecOutFrustrum: GLM.vec2, nbInFrustrum: number, nbOutFrustrum: number) {
        for (let i = 0; i < nbInFrustrum; ++i) {
            this.boundingVFactory.createComponent(BoundingCircleComponent, "c" + i, vecInFrustrum, 0);
        }
        let l = nbInFrustrum + nbOutFrustrum;
        for (let i = nbInFrustrum; i < l; ++i) {
            this.boundingVFactory.createComponent(BoundingCircleComponent, "c" + i, vecOutFrustrum, 0);
        }
    }

    process(siblingsFactories: TogglableComponentFactory<ConcreteComponent>[]) {
        this.system.process(this.boundingVFactory, siblingsFactories);
    }

    activateSiblingByBVIteration(f: ComponentFactory<BoundingCircleComponent>, siblingsFactories: TogglableComponentFactory<ConcreteComponent>[]) {
        this.system.activateByiterationOfBV(f, siblingsFactories);
    }
    activateSiblingByFactIteration(f: ComponentFactory<BoundingCircleComponent>, siblingsFactories: TogglableComponentFactory<ConcreteComponent>[]) {
        this.system.activateFactByFact(f, siblingsFactories);
    }
    clear() {
        this.boundingVFactory.removeAll();
    }
}

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


test(2, 1);
for (let i = 0; i < 100; ++i) {
    test(2, 1);
    test(2, 2);
    test(2, 5);
    test(2, 10);
    test(2, 20);
    test(2, 30);
    test(2, 30);

    test(10, 1);
    test(10, 2);
    test(10, 5);
    test(10, 10);
    test(10, 20);
    test(10, 20);

    test(20, 1);
    test(20, 2);
    test(20, 5);
    test(20, 10);
    test(20, 20);
    test(20, 30);

    test(30, 1);
    test(30, 2);
    test(30, 5);
    test(30, 10);
    test(30, 20);
    test(30, 30);

    test(50, 1);
    test(50, 2);
    test(50, 5);
    test(50, 10);
    test(50, 20);
    test(50, 30);

    test(100, 1);
    test(100, 2);
    test(100, 5);
    test(100, 10);
    test(100, 20);
    test(100, 30);

    test(200, 1);
    test(200, 2);
    test(200, 5);
    test(200, 10);
    test(200, 20);
    test(200, 30);

    test(500, 1);
    test(500, 2);
    test(500, 5);
    test(500, 10);
    test(500, 20);
    test(500, 30);

    test(1000, 1);
    test(1000, 2);
    test(1000, 5);
    test(1000, 10);
    test(1000, 20);
    test(1000, 30);
}

// culling
// activate try both strategy
// process sibling system 
//     with prop activate
//     sorted pool
//     2 pools (1 active 1 inactive) / compare iteration with moing small number each iteration vs a pool that don't move
//  compare with a simple system with only active component (same number)

function test(nbComp: number, nbFactories: number) {
    let t = new benchToggleSystem(nbComp / 2, nbComp / 2);
    let siblings = createConcreteFactoryWithComp(nbFactories, nbComp);
    let label = nbComp + " components culled + activation of " + nbFactories + " siblings factories ";
    console.time(label);
    t.process(siblings);
    console.timeEnd(label);
    siblings.forEach((c) => {
        for (let i = 0; i < t.boundingVFactory.size; ++i) {
            let currentbV = t.boundingVFactory.values[i];
            let r = t.system.execute(currentbV);
            if (c.get(currentbV.entityId).active !== r) {
                console.log("false");
            };
        }
    });
    let lb2 = nbComp + " components activated per factories " + nbFactories + " BVIteration";
    console.time(lb2);
    t.activateSiblingByBVIteration(t.boundingVFactory, siblings);
    console.timeEnd(lb2);

    let lb3 = nbComp + " components activated per factories " + nbFactories + " BVIteration";
    console.time(lb3);
    t.activateSiblingByFactIteration(t.boundingVFactory, siblings);
    console.timeEnd(lb3);

    t.clear();
    siblings = [];
}

