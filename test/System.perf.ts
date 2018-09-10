import { expect } from "chai";
import { ComponentFactory, System } from "../src/entry";
import { IComponent, IComponentFactory, ISystem } from "../src/interfaces";

// test
// old system
// new System
// new System with iteration on sources
// test with:
// 1 pool of small number of params
// 1 pool of big number of params
// 1 pool for each params (small number of params)
// 1 pool for each params (big number of params)
// test each with different number of component (set last comp as inactive ): 1, 5, 10, 20, 50, 75, 100, 250, 500, 1000, 10000, 100000

// oldSystemL | 1 pool | sNBParams
// oldSystem | 1 pool | bigNbParams
// oldSystem | nb pool == nbParams | sNBParams
// oldSystem | nb pool == nbParams | bigNBParams

describe.only("PerfTest", () => {
    interface IRes {
        sys: "previousSystem" | "newSystem";
        nbParam: number;
        nbPool: number;
        nbComponents: number;
        time: number;
    }

    const res: IRes[] = [];

    describe("previous System", () => {

        class SmallNbParam implements IComponent {
            public entityId = 0;
            public active = true;
            constructor(public x = 0, public y = 0) { }
        }
        class SmallNbParamsSystem extends System<SmallNbParam> {
            protected _defaultParameter: SmallNbParam = new SmallNbParam();
            constructor() {
                super();
            }
            public execute(params: SmallNbParam, randomNb: number) {
                params.x[this._k.x] += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
                params.y[this._k.y] += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            }
        }
        describe("small number of params", () => {
            describe("1 pool", () => {
                let pool: ComponentFactory<SmallNbParam>;
                let system: SmallNbParamsSystem;
                beforeEach(() => {
                    pool = new ComponentFactory<SmallNbParam>(1000, new SmallNbParam());
                    system = new SmallNbParamsSystem();

                    system.setParamSource("*", pool);
                    expect(system.parametersSource.get("x").keyInSource).to.equal("x");
                    expect(system.parametersSource.get("y").keyInSource).to.equal("y");
                });
                // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                it("0 component", () => {
                    const r = run(system);
                    res.push({ time: r, nbComponents: 0, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("1 components", () => {
                    const nbComp = 1;
                    pool.create(1, true);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("5 components", () => {
                    const nbComp = 5;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("10 components", () => {
                    const nbComp = 10;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("25 components", () => {
                    const nbComp = 25;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("50 components", () => {
                    const nbComp = 50;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("75 components", () => {
                    const nbComp = 75;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("100 components", () => {
                    const nbComp = 100;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("250 components", () => {
                    const nbComp = 250;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("500 components", () => {
                    const nbComp = 500;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                it("1000 components", () => {
                    const nbComp = 1000;
                    createComponents([pool], nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                });
                // it("10000 components", () => {
                    // const nbComp = 10000;
                    // createComponents([pool], nbComp);
                    // const r = run(system);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                // });
                // it("100000 components", () => {
                    // const nbComp = 100000;
                    // createComponents([pool], nbComp);
                    // const r = run(system);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "previousSystem" });
                // });
            });
            describe("1 pool per params", () => {
                let poolId: ComponentFactory<{ entityId: number, active: true }>;
                let poolActive: ComponentFactory<{ entityId: number, active: true }>;
                let poolX: ComponentFactory<{ entityId: number, active: true, x: number }>;
                let poolY: ComponentFactory<{ entityId: number, active: true, y: number }>;

                let pools: Array<ComponentFactory<any>>;

                let system: SmallNbParamsSystem;
                beforeEach(() => {
                    poolId = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                    poolActive = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                    poolX = new ComponentFactory<{ entityId: number, active: true, x: number }>(1000, { entityId: 0, active: true, x: 0 });
                    poolY = new ComponentFactory<{ entityId: number, active: true, y: number }>(1000, { entityId: 0, active: true, y: 0 });

                    pools = [poolId, poolActive, poolX, poolY];

                    system = new SmallNbParamsSystem();
                    system.setParamSource("entityId", poolId);
                    system.setParamSource("active", poolActive);
                    system.setParamSource("x", poolY);
                    system.setParamSource("y", poolX);
                });

                // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                it("0 component", () => {
                    const nbComp = 0;
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("1 components", () => {
                    const nbComp = 1;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("5 components", () => {
                    const nbComp = 5;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("10 components", () => {
                    const nbComp = 10;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("25 components", () => {
                    const nbComp = 25;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("50 components", () => {
                    const nbComp = 50;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("75 components", () => {
                    const nbComp = 75;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("100 components", () => {
                    const nbComp = 100;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("250 components", () => {
                    const nbComp = 250;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("500 components", () => {
                    const nbComp = 500;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                it("1000 components", () => {
                    const nbComp = 1000;
                    createComponents(pools, nbComp);
                    const r = run(system);
                    res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                });
                // it("10000 components", () => {
                    // const nbComp = 10000;
                    // createComponents(pools, nbComp);
                    // const r = run(system);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                // });
                // it("100000 components", () => {
                    // const nbComp = 100000;
                    // createComponents(pools, nbComp);
                    // const r = run(system);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "previousSystem" });
                // });
            });
        });
        describe("big number of params", () => {
            describe("1 pool", () => {
                // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                it("0 component", () => {

                });
                it("1 components", () => {

                });
                it("5 components", () => {

                });
                it("10 components", () => {

                });
                it("25 components", () => {

                });
                it("50 components", () => {

                });
                it("75 components", () => {

                });
                it("100 components", () => {

                });
                it("250 components", () => {

                });
                it("500 components", () => {

                });
                it("1000 components", () => {

                });
                it("10000 components", () => {

                });
                it("100000 components", () => {

                });
            });
            describe("1 pool per params", () => {
                // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                it("0 component", () => {

                });
                it("1 components", () => {

                });
                it("5 components", () => {

                });
                it("10 components", () => {

                });
                it("25 components", () => {

                });
                it("50 components", () => {

                });
                it("75 components", () => {

                });
                it("100 components", () => {

                });
                it("250 components", () => {

                });
                it("500 components", () => {

                });
                it("1000 components", () => {

                });
                it("10000 components", () => {

                });
                it("100000 components", () => {

                });
            });
        });
    });
});

const run = (system: ISystem<any>): number => {
    const random = Math.random();
    const t0 = performance.now();
    system.process(random);
    const t1 = performance.now();
    const res = t1 - t0;
    console.log(res + "mms");
    return res;
};

const createComponents = (pools: Array<IComponentFactory<any>>, nb: number) => {
    pools.forEach((p) => {
        let i = 1;
        while (i < nb + 1) {
            p.create(i, true);
            i++;
        }
    });
};
