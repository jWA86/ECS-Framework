import { expect } from "chai";
import "mocha";
import { ComponentFactory } from "../src/ComponentFactory";
import { EntityFactory } from "../src/EntityFactory";
import { IComponent, IComponentFactory } from "../src/interfaces";
import { System } from "../src/System";

describe("System ", () => {
    const zeroVec3 = { x: 0.0, y: 0.0, z: 0.0 };

    interface IVec3 {
        x: number;
        y: number;
        z: number;
    }

    interface IPositionComponent extends IComponent {
        position: { x: number, y: number, z: number };
    }

    interface IVelocityComponent extends IComponent {
        velocity: { x: number, y: number; z: number };
    }

    class PositionComponent implements IComponent {
        public entityId: number = 0;
        public active: boolean = false;
        constructor(public position: IVec3) { }
    }

    class VelocityComponent implements IComponent {
        public entityId = 0;
        public active = false;
        constructor(public velocity: IVec3) { }
    }

    interface IMoveByOneUnitParams {
        position: IVec3;
    }

    const moveByOneUnitParams: IMoveByOneUnitParams = {
        position: { x: 0, y: 0, z: 0 },
    };

    class MoveByOneUnitSystem extends System<IMoveByOneUnitParams> {
        protected _defaultParameter: IMoveByOneUnitParams = moveByOneUnitParams;
        constructor() {
            super();
        }

        public execute(params: IMoveByOneUnitParams) {
            // params.position[this._parametersSource.get("position").keyInSource].x += 1.0;
            // shorter version
            params.position[this._k.position].x += 1.0;
            params.position[this._k.position].y += 1.0;
            params.position[this._k.position].z += 1.0;
        }
    }

    interface IMoveParams {
        position: IVec3;
        velocity: IVec3;
    }

    const moveParams: IMoveParams = {
        position: zeroVec3,
        velocity: zeroVec3,
    };

    let velocityFactory: ComponentFactory<VelocityComponent>;

    let positionFactory;
    const positionFactorySize = 10;
    let nbActive = 3;
    let nbInactive = 2;
    let nbZeroed = positionFactorySize - nbActive - nbInactive;

    beforeEach(() => {
        positionFactory = new ComponentFactory<PositionComponent>(positionFactorySize, new PositionComponent(zeroVec3));
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
    it("(javascript only) setParamSource should throw an error if the key is not a parameter of the system", () => {
        // Uncomment in VSCode, the compiler should hightlight the parameter as wrong
        // const s = new MoveByOneUnitSystem();
        // try {
        //     expect(s.setParamSource("$", positionFactory));
        // } catch (err) {
        //     expect(err).to.be.an("Error");
        // }
    });
    it("setParamSource with param name in source should update components even if their param name are different than the one used in the execute method of the system", () => {
        class CompDiffName implements IComponent {
            public active = true;
            public entityId = 0;
            constructor(public pos = { x: 0.0, y: 0.0, z: 0.0 }) { }
        }

        const positionFactory2 = new ComponentFactory<CompDiffName>(2, new CompDiffName());
        positionFactory2.create(1, true);

        expect(positionFactory2.get(1).pos.x).to.equal(0.0);
        expect(positionFactory2.get(1).pos.y).to.equal(0.0);
        expect(positionFactory2.get(1).pos.z).to.equal(0.0);

        const s = new MoveByOneUnitSystem();
        s.setParamSource("position", positionFactory2, "pos");

        s.process();

        expect(positionFactory2.get(1).pos.x, "pos.x was not modified in the execute method").to.equal(1.0);
        expect(positionFactory2.get(1).pos.y, "pos.y was not modified in the execute method").to.equal(1.0);
        expect(positionFactory2.get(1).pos.z, "pos.z was not modified in the execute method").to.equal(1.0);

    });
    it("setParamSource with key '*' should set the source to every parameters", () => {
        const s = new MoveByOneUnitSystem();
        expect(s.parametersSource.get("position").source).to.equal(undefined);
        s.setParamSource("*", positionFactory);
        expect(s.parametersSource.get("position").source).to.not.equal(undefined);
    });
    it("should update active components", () => {
        const s = new MoveByOneUnitSystem();
        s.setParamSource("position", positionFactory);
        s.process();

        for (let i = 0; i < positionFactory.nbActive; ++i) {
            expect(positionFactory.values[i].active).to.equal(true);
            expect(positionFactory.values[i].position.x).to.equal(1.0);
            expect(positionFactory.values[i].position.y).to.equal(1.0);
            expect(positionFactory.values[i].position.z).to.equal(1.0);
        }
    });
    it("should not update inactive components", () => {
        const s = new MoveByOneUnitSystem();
        s.setParamSource("position", positionFactory);
        s.process();
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
        const s = new MoveByOneUnitSystem();
        s.setParamSource("position", positionFactory);
        s.process();
        for (let i = positionFactory.nbActive + positionFactory.nbInactive; i < positionFactory.size; ++i) {
            expect(positionFactory.values[i].entityId).to.equal(0);
            expect(positionFactory.values[i].position.x).to.equal(0.0);
            expect(positionFactory.values[i].position.y).to.equal(0.0);
            expect(positionFactory.values[i].position.z).to.equal(0.0);
        }
    });
    describe("System with multiple components types", () => {

        beforeEach(() => {
            positionFactory = new ComponentFactory<PositionComponent>(5, new PositionComponent(zeroVec3));
            velocityFactory = new ComponentFactory<VelocityComponent>(5, new VelocityComponent(zeroVec3));

            for (let i = 1; i < positionFactory.size + 1; ++i) {
                positionFactory.create(i, true);
                positionFactory.get(i).position = { x: 1.0, y: 1.0, z: 1.0 };
            }

            for (let i = 1; i < velocityFactory.size + 1; ++i) {
                velocityFactory.create(i, true);
                velocityFactory.get(i).velocity = { x: 2.0, y: 0.0, z: 0.0 };
            }
        });

        describe("non parallel pool", () => {

            class MoveSystem extends System<IMoveParams> {
                protected _defaultParameter: IMoveParams = moveParams;
                constructor() { super(); }

                public execute(params: IMoveParams) {
                    params.position[this._k.position].x *= params.velocity[this._k.velocity].x;
                    params.position[this._k.position].y *= params.velocity[this._k.velocity].y;
                    params.position[this._k.position].z *= params.velocity[this._k.velocity].z;
                }
            }

            beforeEach(() => {
                positionFactory = new ComponentFactory<PositionComponent>(5, new PositionComponent(zeroVec3));
                velocityFactory = new ComponentFactory<VelocityComponent>(5, new VelocityComponent(zeroVec3));

                for (let i = 1; i < positionFactory.size + 1; ++i) {
                    positionFactory.create(i, true);
                    const p = positionFactory.get(i);
                    p.position.x = 1.0;
                    p.position.y = 1.0;
                    p.position.z = 1.0;
                }

                for (let i = 1; i < velocityFactory.size + 1; ++i) {
                    velocityFactory.create(i, true);
                    const v = velocityFactory.get(i);
                    v.velocity.x = 2.0;
                    v.velocity.y = 0.0;
                    v.velocity.z = 0.0;
                }
                velocityFactory.free(5);
                expect(velocityFactory.nbCreated).to.equal(positionFactory.nbCreated - 1);
            });

            it("should iterate on the 1st factory and update its components with components of the 2nd factory", () => {

                for (let i = 0; i < positionFactory.size - 1; ++i) {
                    expect(positionFactory.values[i].position.x).to.not.equal(2.0);
                }
                const s = new MoveSystem();
                s.setParamSource("position", positionFactory);
                s.setParamSource("velocity", velocityFactory);
                s.process();

                for (let i = 0; i < positionFactory.size - 1; ++i) {
                    expect(positionFactory.values[i].position.x).to.equal(2.0);
                }
            });
            it("should not update if there is no components with the same entityId", () => {
                expect(positionFactory.nbActive).to.equal(velocityFactory.nbActive + 1);

                const s = new MoveSystem();
                s.setParamSource("position", positionFactory);
                s.setParamSource("velocity", velocityFactory);
                s.process();
                // last one should not be updated since there is no velocity component associated with.
                expect(positionFactory.values[positionFactory.size - 1].position.x).to.equal(1.0);
            });
        });

        describe("parallel pool system", () => {
            class MoveSystem extends System<IMoveParams> {
                protected _defaultParameter: IMoveParams = moveParams;
                constructor() {
                    super();
                }
                public execute(params: IMoveParams) {
                    params.position[this._k.position].x *= params.velocity[this._k.velocity].x;
                    params.position[this._k.position].y *= params.velocity[this._k.velocity].y;
                    params.position[this._k.position].z *= params.velocity[this._k.velocity].z;
                }
            }
            beforeEach(() => {
                velocityFactory.get(4).velocity = { x: 2.0, y: 0.0, z: 0.0 };
                expect(velocityFactory.nbCreated).to.equal(positionFactory.nbCreated);
            });
            it("should pass all the components to the execute fonction", () => {

                class ArgTestSystem extends System<IMoveParams> {
                    protected _defaultParameter: IMoveParams = moveParams;
                    constructor() {
                        super();
                    }
                    public execute(params: IMoveParams) {
                        expect(params.position).to.have.property("position");
                        expect(params.velocity).to.have.property("velocity");
                    }
                }
                const ms = new ArgTestSystem();
                ms.setParamSource("position", positionFactory);
                ms.setParamSource("velocity", velocityFactory);
                ms.process();

            });
            it("should update the component in pools specified in the system constructor", () => {
                const ms = new MoveSystem();
                ms.setParamSource("position", positionFactory);
                ms.setParamSource("velocity", velocityFactory);
                ms.process();

                for (let i = 0; i < positionFactory.length; ++i) {
                    expect(positionFactory.values[i].position.x).to.equal(2.0);
                }
            });
            it("use of with an EntityFactory pool", () => {
                const ms = new MoveSystem();
                const movingEntities = new EntityFactory(10);
                movingEntities.addFactory("position", positionFactory);
                movingEntities.addFactory("velocity", velocityFactory);

                ms.setParamSource("position", movingEntities.getFactory("position"));
                ms.setParamSource("velocity", movingEntities.getFactory("velocity"));
                ms.process();

                for (let i = 0; i < positionFactory.nbCreated; ++i) {
                    expect(positionFactory.values[i].position.x).to.equal(2.0);
                }
                for (let i = movingEntities.nbCreated; i < movingEntities.size; ++i) {
                    expect(positionFactory.values[i].position.x).to.equal(0.0);
                }
            });
        });
    });

    describe("passing additional arguments ", () => {
        class ArgsComponent implements IComponent {
            public active: boolean;
            public entityId: number;
            constructor(public notFromComponent1: number, public notFromComponent2: number) { }
        }
        interface IArgsParam {
            a1: { notFromComponent1: number };
            a2: { notFromComponent2: number };
        }

        const defaultArgsParam: IArgsParam = {
            a1: { notFromComponent1: 0 },
            a2: { notFromComponent2: 0 },
        };

        // set component prop value from external variables value passed to the process methode
        class ArgsSystem extends System<IArgsParam> {
            protected _defaultParameter: IArgsParam = defaultArgsParam;
            constructor() { super(); }
            public execute(params: IArgsParam, arg1: number, arg2: number) {
                params.a1.notFromComponent1 = arg1;
                params.a2.notFromComponent2 = arg2;
            }
        }

        let argsPoolFactory: ComponentFactory<ArgsComponent>;

        beforeEach(() => {
            argsPoolFactory = new ComponentFactory<ArgsComponent>(10, new ArgsComponent(0, 0));
        });

        it("additional arguments should be readable in the execute function", () => {
            argsPoolFactory.create(1, true);
            const sys = new ArgsSystem();
            sys.setParamSource("a1", argsPoolFactory);
            sys.setParamSource("a2", argsPoolFactory);
            expect(argsPoolFactory.get(1).notFromComponent1).to.equal(0);
            expect(argsPoolFactory.get(1).notFromComponent2).to.equal(0);

            const externalArg1 = 10;
            const externalArg2 = 20;

            sys.process(externalArg1, externalArg2);

            expect(argsPoolFactory.get(1).notFromComponent1).to.equal(externalArg1);
            expect(argsPoolFactory.get(1).notFromComponent2).to.equal(externalArg2);
        });
    });

    describe("changing poolFactories of system at runtime without having to rewrite the system", () => {

        // Regroup proprieties in only one component
        class MovingComponent implements IPositionComponent, IVelocityComponent {
            constructor(public entityId: number, public active: boolean, public position: IVec3, public velocity: IVec3) { }
        }

        class MoveSystem extends System<IMoveParams> {
            protected _defaultParameter: IMoveParams = moveParams;
            constructor() { super(); }

            public execute(params: IMoveParams) {
                params.position[this._k.position].x *= params.velocity[this._k.velocity].x;
                params.position[this._k.position].y *= params.velocity[this._k.velocity].y;
                params.position[this._k.position].z *= params.velocity[this._k.velocity].z;
            }
        }

        let movingFactory: ComponentFactory<MovingComponent>;

        beforeEach(() => {

            positionFactory = new ComponentFactory<PositionComponent>(5, new PositionComponent(zeroVec3));
            velocityFactory = new ComponentFactory<VelocityComponent>(5, new VelocityComponent(zeroVec3));
            movingFactory = new ComponentFactory<MovingComponent>(5, new MovingComponent(0, false, zeroVec3, zeroVec3));

            for (let i = 1; i < positionFactory.size + 1; ++i) {
                positionFactory.create(i, true);
                const p = positionFactory.get(i);
                p.position.x = 1.0;
                p.position.y = 1.0;
                p.position.z = 1.0;
            }

            for (let i = 1; i < velocityFactory.size + 1; ++i) {
                velocityFactory.create(i, true);
                const v = velocityFactory.get(i);
                v.velocity.x = 2.0;
                v.velocity.y = 0.0;
                v.velocity.z = 0.0;
            }

            for (let i = 1; i < movingFactory.size + 1; ++i) {
                movingFactory.create(i, true);
                const m = movingFactory.get(i);
                m.position.x = 1.0;
                m.position.y = 1.0;
                m.position.z = 1.0;

                m.velocity.x = 2.0;
                m.velocity.y = 0.0;
                m.velocity.z = 0.0;
            }
        });
        it("should be able to get all param from one componentssource", () => {
            const s = new MoveSystem();
            s.setParamSource("position", movingFactory);
            s.setParamSource("velocity", movingFactory);
            s.process();

            for (let i = 0; i < movingFactory.size - 1; ++i) {
                expect(movingFactory.values[i].position.x).to.equal(2.0);
            }
        });
        it("should be able to get all params from multiples components source", () => {
            const s = new MoveSystem();
            s.setParamSource("position", positionFactory);
            s.setParamSource("velocity", velocityFactory);
            s.process();

            for (let i = 0; i < positionFactory.size - 1; ++i) {
                expect(positionFactory.values[i].position.x).to.equal(2.0);
            }
        });

    });
});
