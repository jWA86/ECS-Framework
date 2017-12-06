import { expect } from "chai";
import "mocha";
import { ComponentFactory, EntityFactory } from "../src/ComponentFactory";
import { GameLoop } from "../src/GameLoop";
import { IComponent, IComponentFactory } from "../src/interfaces";
import { System } from "../src/System";

describe("GameLoop should be able to", () => {
    it("start execution of the loop ", () => {
        const gl = new GameLoop();
        gl.start();
    });
    it("stop the execution of the loop", () => {
        const gl = new GameLoop();
        gl.start();
        gl.stop();
        // cancelRequestAnimationFrame ?
    });
    it("provide the current time", () => {
        const gl = new GameLoop();
        expect(gl.getCurrentTime()).to.approximately(Date.now(), 1000);
    });
    it("provide the time of the last iteration", () => {
        // const gl = new GameLoop();
        // expect(gl.getLastIterationTime()).to.equal(Date.now());
    });
    it("provide the elapsed time since last iteration", () => {

    });
    it("use a time frequency of execution", () => {

    });
    it("change the frequency of execution at runtime", () => {

    });

    describe("use of Systems ", () => {
        //dummy system that increment a interger

        class IntegerComponent {
            constructor(public entityId: number, public active: boolean, public integer:number) {}
        }
        class IncrementSystem extends System {
            constructor(){ super();}
            execute(int: IntegerComponent){
                int.integer +=1;
            }
        }

        // dummy sytem that multiply an integer by itself
        class SquareSystem extends System {
            constructor(){ super();}
            execute(int: IntegerComponent){
                int.integer *= int.integer;
            }
        }

        // moving System
        interface IPositionComponent extends IComponent {
            position: { x: number, y: number, z: number }
        }

        interface IVelocityComponent extends IComponent {
            velocity: { x: number, y: number; z: number }
        }

        interface Ivec3 {
            x: number;
            y: number;
            z: number;
        }
        class PositionComponent implements IPositionComponent {
            constructor(public entityId: number, public active: boolean, public position: Ivec3) { }
        }

        class VelocityComponent implements IVelocityComponent {
            constructor(public entityId: number, public active: boolean, public velocity: Ivec3) { }
        }

        class MoveSystem extends System {
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
        let integerFactory: ComponentFactory<IntegerComponent>;
       

        let positionFactory: ComponentFactory<PositionComponent>;
        let velocityFactory: ComponentFactory<VelocityComponent>;
        beforeEach(() => {

            integerFactory = new ComponentFactory<IntegerComponent>(5, IntegerComponent, 1);


            let zeroVec = { x: 0.0, y: 0.0, z: 0.0 };
            positionFactory = new ComponentFactory<PositionComponent>(5, PositionComponent, zeroVec);
            velocityFactory = new ComponentFactory<VelocityComponent>(5, VelocityComponent, zeroVec);

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


        });

        it("accept a list of System to iterate on", () => {
            const gl = new GameLoop();
            const inputArr = [];

            inputArr.push(new MoveSystem());
            inputArr.push(new MoveSystem());
            gl.setSystems(inputArr);

            const outputArr = gl.getSystems();

            expect(outputArr.length).to.equal(inputArr.length);
            for (let i = 0; i < outputArr.length; ++i) {
                expect(outputArr[i]).to.equal(inputArr[i]);
            }
        });
        it("iterate on systems in the order they are provided", () => {
            let c1 = integerFactory.create(1, true);
            expect(c1.integer).to.equal(1);

            let s1 = new IncrementSystem();
            let s2 = new SquareSystem();

            let gl = new GameLoop();
            gl.setSystems([s1, s2]);
            gl.start();
            
        });
        it("re-order the sytems", () => {

        });
        it("pause each system individually", () => {

        });
        it("set a frequency of execution for each system", () => {

        });
        it("", () => {

        });
    });
});
