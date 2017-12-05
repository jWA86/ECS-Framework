import { expect } from "chai";
import "mocha";
import { ComponentFactory, EntityFactory } from "../src/ComponentFactory";
import { IComponent, IComponentFactory, ISystem } from "../src/interfaces";
import { MultiNonParallelSystem, MultiParallelSystem, MultiPoolSystem, System  } from "../src/System";

describe("System ", () => {
    class positionComponent implements IComponent {
        constructor(public entityId: number, public active: boolean, public position = { "x": 0.0, "y": 0.0, "z": 0.0 }) { }
    }
    class MoveByOneUnitSystem extends System {
        constructor() {
            super();
        }
        execute(component: positionComponent) {
            component.position.x += 1.0;
            component.position.y += 1.0;
            component.position.z += 1.0;
        }
    }

    let positionFactory = new ComponentFactory<positionComponent>(10, positionComponent, { "x": 0.0, "y": 0.0, "z": 0.0 });

    let nbActive = 3;
    let nbInactive = 2;
    let nbZeroed = positionFactory.size - nbActive - nbInactive;

    beforeEach(() => {
        positionFactory = new ComponentFactory<positionComponent>(10, positionComponent, { "x": 0.0, "y": 0.0, "z": 0.0 });
        nbActive = 3;
        nbInactive = 2;
        nbZeroed = positionFactory.size - nbActive - nbInactive;
        for (let i = 1; i < nbActive + 1; ++i) {
            positionFactory.create(i, true);
        }
        for (let i = nbActive + 1; i < nbInactive + nbActive + 1; ++i) {
            positionFactory.create(i, false);
        }
    });
    it("checking samples used by other tests", () => {

        expect(positionFactory.nbActive).to.equal(nbActive);
        expect(positionFactory.nbInactive).to.equal(nbInactive);
        expect(positionFactory.nbFreeSlot).to.equal(nbZeroed);

        for (let i = 0; i < positionFactory.size; ++i) {
            expect(positionFactory.values[i].position.x).to.equal(0.0);
            expect(positionFactory.values[i].position.y).to.equal(0.0);
            expect(positionFactory.values[i].position.z).to.equal(0.0);

        }
    });
    it("should update active components", () => {

        let s = new MoveByOneUnitSystem();
        s.process(positionFactory);

        for (let i = 0; i < positionFactory.nbActive; ++i) {
            expect(positionFactory.values[i].active).to.equal(true);
            expect(positionFactory.values[i].position.x).to.equal(1.0);
            expect(positionFactory.values[i].position.y).to.equal(1.0);
            expect(positionFactory.values[i].position.z).to.equal(1.0);
        }
    });
    it("should not update inactive components", () => {
        let s = new MoveByOneUnitSystem();
        s.process(positionFactory);
        for (let i = positionFactory.nbActive; i < positionFactory.nbActive + positionFactory.nbInactive; ++i) {
            expect(positionFactory.values[i].active).to.equal(false);
            expect(positionFactory.values[i].position.x).to.equal(0.0);
            expect(positionFactory.values[i].position.y).to.equal(0.0);
            expect(positionFactory.values[i].position.z).to.equal(0.0);
        }
    });
    it("should not update zeroed components", () => {
        for (let i = positionFactory.nbActive + positionFactory.nbInactive; i < positionFactory.size; ++i) {
            expect(positionFactory.values[i].entityId).to.equal(0);
            positionFactory.values[i].active = true;
        }
        let s = new MoveByOneUnitSystem();
        s.process(positionFactory);
        for (let i = positionFactory.nbActive + positionFactory.nbInactive; i < positionFactory.size; ++i) {
            expect(positionFactory.values[i].entityId).to.equal(0);
            expect(positionFactory.values[i].position.x).to.equal(0.0);
            expect(positionFactory.values[i].position.y).to.equal(0.0);
            expect(positionFactory.values[i].position.z).to.equal(0.0);
        }
    });

});
describe("System with multiple components types", () => {
    class positionComponent implements IComponent {
        constructor(public entityId: number, public active: boolean, public position = { "x": 0.0, "y": 0.0, "z": 0.0 }) { }
    }
    class velocityComponent implements IComponent {
        constructor(public entityId, public active, public vec = { "x": 0.0, "y": 0.0, "z": 0.0 }) { };
    }

    let positionFactory: ComponentFactory<positionComponent>;
    let velocityFactory: ComponentFactory<velocityComponent>;

    beforeEach(() => {
        positionFactory = new ComponentFactory<positionComponent>(5, positionComponent, { "x": 0.0, "y": 0.0, "z": 0.0 });
        velocityFactory = new ComponentFactory<velocityComponent>(5, velocityComponent, { "x": 0.0, "y": 0.0, "z": 0.0 });

        for (let i = 1; i < positionFactory.size + 1; ++i) {
            positionFactory.create(i, true);
            positionFactory.get(i).position = { "x": 1.0, "y": 1.0, "z": 1.0 };
        }

        for (let i = 1; i < velocityFactory.size + 1; ++i) {
            velocityFactory.create(i, true);
            velocityFactory.get(i).vec = { "x": 2.0, "y": 0.0, "z": 0.0 };
        }
    });

    describe("non parallel pool", () => {

        interface IPositionComponent extends IComponent {
            x: number;
            y: number;
            z: number;
        }

        interface IVelocityComponent extends IComponent {
            x: number;
            y: number;
            z: number;
        }


        class PositionComponent implements IPositionComponent {
            constructor(public entityId: number, public active: boolean, public x: number, public y: number, public z: number) { }
        }

        class VelocityComponent implements IVelocityComponent {
            constructor(public entityId: number, public active: boolean, public x: number, public y: number, public z: number) { }
        }

        class MoveSystem extends MultiPoolSystem {
            constructor() { super(); }

            execute(posC: IPositionComponent, veloC: IVelocityComponent) {
                posC.x *= veloC.x;
                posC.y *= veloC.y;
                posC.z *= veloC.z;
            }
        }
        let positionFactory: ComponentFactory<PositionComponent>;
        let velocityFactory: ComponentFactory<VelocityComponent>;

        beforeEach(() => {
            positionFactory = new ComponentFactory<PositionComponent>(5, PositionComponent, 0.0, 0.0, 0.0);
            velocityFactory = new ComponentFactory<VelocityComponent>(5, VelocityComponent, 0.0, 0.0, 0.0);

            for (let i = 1; i < positionFactory.size + 1; ++i) {
                positionFactory.create(i, true);
                let p = positionFactory.get(i);
                p.x = 1.0;
                p.y = 1.0;
                p.z = 1.0;
            }

            for (let i = 1; i < velocityFactory.size + 1; ++i) {
                velocityFactory.create(i, true);
                let v = velocityFactory.get(i);
                v.x = 2.0;
                v.y = 0.0;
                v.z = 0.0;
            }
            velocityFactory.delete(5);
            expect(velocityFactory.nbCreated).to.equal(positionFactory.nbCreated - 1);
        });

        it("should iterate on the first factory and update its components with components of the second factory", () => {
            let s = new MoveSystem();

            s.process(positionFactory, velocityFactory);

            for (let i = 0; i < positionFactory.size - 1; ++i) {
                expect(positionFactory.values[i].x).to.equal(2.0);
            }
        });
        it("should not update if there is no components with the same entityId", () => {
            expect(positionFactory.nbActive).to.equal(velocityFactory.nbActive + 1);

            let s = new MoveSystem();
            s.process(positionFactory, velocityFactory);

            // last one should not be updated since there is no velocity component associated with.
            expect(positionFactory.values[positionFactory.size - 1].x).to.equal(1.0);
        });
    });

    describe("parallel pool system", () => {
        class MoveSystem extends MultiParallelSystem {
            constructor() {
                super();
            }
            execute(pos: positionComponent, velo: velocityComponent) {
                pos.position.x *= velo.vec.x;
                pos.position.y *= velo.vec.y;
                pos.position.z *= velo.vec.z;
            }
        }
        beforeEach(() => {
            velocityFactory.create(4, true);
            velocityFactory.get(4).vec = { "x": 2.0, "y": 0.0, "z": 0.0 };
            expect(velocityFactory.nbCreated).to.equal(positionFactory.nbCreated);
        });
        it("should provide all the components to the execute fonction", () => {

            class argTestSystem extends MultiParallelSystem {
                constructor() {
                    super();
                }
                execute(pos: positionComponent, velo: velocityComponent) {
                    expect(pos).to.be.an.instanceof(positionComponent);
                    expect(velo).to.be.an.instanceof(velocityComponent);
                }
            }
            let ms = new argTestSystem();
            ms.process(positionFactory, velocityFactory);

        });
        it("should update the component in pools specified in the system constructor", () => {
            let ms = new MoveSystem();

            ms.process(positionFactory, velocityFactory);

            for (let i = 0; i < positionFactory.length; ++i) {
                expect(positionFactory.values[i].position.x).to.equal(2.0);
            }
        });
        it("use of with an EntityFactory pool", () => {
            let ms = new MoveSystem();
            let movingEntities = new EntityFactory(10);
            movingEntities.addFactory("position", positionFactory);
            movingEntities.addFactory("velocity", velocityFactory);

            ms.process(movingEntities.getFactory("position"), movingEntities.getFactory("velocity"));

            for (let i = 0; i < positionFactory.nbCreated; ++i) {
                expect(positionFactory.values[i].position.x).to.equal(2.0);
            }
            for (let i = movingEntities.nbCreated; i < movingEntities.size; ++i) {
                expect(positionFactory.values[i].position.x).to.equal(0.0);
            }
        });
    });
});

describe("changing poolFactories of system at runtime without having to rewrite the system", () => {

    interface IPositionComponent extends IComponent {
        position: { x: number, y: number, z: number }
    }

    interface IVelocityComponent extends IComponent {
        velocity: { x: number, y: number; z: number }
    }

    //regroup components in one component
    class MovingComponent implements IPositionComponent, IVelocityComponent {
        constructor(public entityId: number, public active: boolean, public position: { x: number, y: number, z: number }, public velocity: { x: number, y: number, z: number }) { }
    }

    // separate proprieties in to 2 components
    class PositionComponent implements IPositionComponent {
        constructor(public entityId: number, public active: boolean, public position: { x: number, y: number, z: number }) { }
    }

    class VelocityComponent implements IVelocityComponent {
        constructor(public entityId: number, public active: boolean, public velocity: { x: number, y: number, z: number }) { }
    }

    class MoveSystem extends MultiPoolSystem {
        constructor() { super(); }

        execute(posC: IPositionComponent, veloC: IVelocityComponent) {
            // console.log(posC);
            // console.log("---");
            // console.log(veloC);
            posC.position.x *= veloC.velocity.x;
            posC.position.y *= veloC.velocity.y;
            posC.position.z *= veloC.velocity.z;
            // console.log(posC);
        }
    }
    let positionFactory: ComponentFactory<PositionComponent>;
    let velocityFactory: ComponentFactory<VelocityComponent>;
    let movingFactory: ComponentFactory<MovingComponent>;

    beforeEach(() => {
        positionFactory = new ComponentFactory<PositionComponent>(5, PositionComponent, { x: 0.0, y: 0.0, z: 0.0 });
        velocityFactory = new ComponentFactory<VelocityComponent>(5, VelocityComponent, { x: 0.0, y: 0.0, z: 0.0 });
        movingFactory = new ComponentFactory<MovingComponent>(5, MovingComponent, { x: 0.0, y: 0.0, z: 0.0 }, { x: 0.0, y: 0.0, z: 0.0 });


        for (let i = 1; i < positionFactory.size + 1; ++i) {
            positionFactory.create(i, true);
            let p = positionFactory.get(i);
            p.position.x = 1.0;
            p.position.y = 1.0;
            p.position.z = 1.0;
        }

        for (let i = 1; i < velocityFactory.size + 1; ++i) {
            velocityFactory.create(i, true);
            let v = velocityFactory.get(i);
            v.velocity.x = 2.0;
            v.velocity.y = 0.0;
            v.velocity.z = 0.0;
        }

        for (let i = 1; i < movingFactory.size + 1; ++i) {
            movingFactory.create(i, true);
            let m = movingFactory.get(i);
            m.position.x = 1.0;
            m.position.y = 1.0;
            m.position.z = 1.0;

            m.velocity.x = 2.0;
            m.velocity.y = 0.0;
            m.velocity.z = 0.0;

        }
    });
    it("should be able to get all param from one components", () => {
        let s = new MoveSystem();

        s.process(movingFactory, movingFactory);

        for (let i = 0; i < movingFactory.size - 1; ++i) {
            expect(movingFactory.values[i].position.x).to.equal(2.0);
        }
    });
    it("should be able to get all params from multiples components", () => {
        let s = new MoveSystem();

        s.process(positionFactory, velocityFactory);

        for (let i = 0; i < positionFactory.size - 1; ++i) {
            expect(positionFactory.values[i].position.x).to.equal(2.0);
        }
    });
});
