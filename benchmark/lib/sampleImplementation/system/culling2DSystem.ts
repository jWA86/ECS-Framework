import { IComponent, IComponentFactory, ITogglableComponent, ITogglableComponentFactory } from "../../../../src/interfaces"
import { ISystem } from "../../../../src/System";
import { IShape2D, IActivator, Rectangle, BoundingCircleComponent } from "../component/boundingVolume";

export { CullingSystem, Camera2DCullingSystem }
// System that take a view frustrum in entry and a collection of boundingVolume + a collection of factory
// test collision between the view frustrum and the bounding volumes.
// after collision checking :
// call every factory with the entityID and the flag for activation of the comp. 
// simple system without any scene graph or any world partitionning  


// process ICullingShape factory, test if intersect with the reference IShape passed in the constructor
// set the ICUllingShape toActive proprety according to the result of the intersection test
// then use the result to activate or desactivate siblnigs components in the factories liste passed in the system constructor
abstract class CullingSystem<T extends IShape2D & IActivator & IComponent> implements ISystem {
    constructor(public refShape: IShape2D) {
    }
    process(factory: IComponentFactory<T>, siblingsFactories: ITogglableComponentFactory<ITogglableComponent>[]): any {
        let l = factory.size;
        for (let i = 0; i < l; ++i) {
            factory.values[i].toActive = this.execute(factory.values[i]);
        }
        this.activateSiblings(factory, siblingsFactories);
    }

    // process(factory: IComponentFactory<T>, siblingsFactories: ITogglableComponentFactory<ITogglableComponent>[]): any {
    //     let l = factory.size;
    //     for (let i = 0; i < l; ++i) {
    //         factory.values[i].toActive = this.collide(factory.values[i]);

    //         for(let j = 0; j <siblingsFactories.length; ++j){
    //             siblingsFactories[j].activate(factory.values[i].entityId, factory.pool.values[i].toActive);
    //         }
    //     }
    //     // this.activateSiblings(factory, siblingsFactories);
    // }

    activateSiblings(factory: IComponentFactory<T>, siblingsFactories: ITogglableComponentFactory<ITogglableComponent>[]) {
        // how to change siblings ?
        // at every collision detection activate siblings ?
        // process all collision detection, save result in boundingVolume (btw it should be renamed )
        // then iterate again the boundingVolumes with factories one by one to activate siblings

        this.activateFactByFact(factory, siblingsFactories);
    }

    // boundVolumes.forEach -> factories.forEach -> f.activate(bv.Id, value) 
    activateByiterationOfBV(f: IComponentFactory<T>, siblingsFactories: ITogglableComponentFactory<ITogglableComponent>[]) {
        let l = f.size;
        let nbF = siblingsFactories.length;
        for (let i = 0; i < l; ++i) {
            let eId = f.values[i].entityId;
            let val = f.values[i].toActive;

            for (let j = 0; j < nbF; ++j) {
                siblingsFactories[j].activate(eId, val);
            }
        }
    }

    // factories.forEach -> boundingVolume.forEach -> f.activate(bv.Id, value)
    activateFactByFact(f: IComponentFactory<T>, siblingsFactories: ITogglableComponentFactory<ITogglableComponent>[]) {
        let l = siblingsFactories.length;
        let bvL = f.size;
        for (let i = 0; i < l; ++i) {
            for (let j = 0; j < bvL; ++j) {
                let val = f.values[j].toActive;
                let eId = f.values[j].entityId;
                siblingsFactories[i].activate(eId, val);
            }
        }
    }
    abstract execute(shape: T): boolean;
}

class Camera2DCullingSystem<R extends Rectangle, T extends BoundingCircleComponent> extends CullingSystem<BoundingCircleComponent> {
    constructor(public camera: R) {
        super(camera);
    }
    execute(shape: T): boolean {
        let cXLeft: number = shape.topLeft[0]
        let cYTop: number = shape.topLeft[1];
        let cXRight: number = shape.topLeft[0] + shape.radius * 2;
        let cYBottom: number = shape.topLeft[1] + shape.radius * 2;

        if (cXLeft < this.camera.bottomRight[0]
            && cYTop < this.camera.bottomRight[1]
            && cXRight > this.camera.topLeft[0]
            && cYBottom > this.camera.topLeft[1]) {
            return true;
        }
        else {
            return false;
        }

    }
}

