import { expect } from "chai";
import { ComponentFactory, System } from "../src/entry";
import { IComponent, IComponentFactory, ISystem } from "../src/interfaces";
import { System as SystemWithPBIterator, System2 as SystemWithPBIterator2 } from "../src/SystemWithPBIterator";

// test
// old system ok
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

describe("PerfTest", () => {
    interface IRes {
        sys: "previousSystem" | "newSystem" | "newSystem2";
        nbParam: number;
        nbPool: number;
        nbComponents: number;
        time: number;
    }

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

    class NewSmallNbParamsSystem extends SystemWithPBIterator<SmallNbParam> {
        constructor(p: SmallNbParam) {
            super(p);
        }
        public execute(params: SmallNbParam, randomNb: number): SmallNbParam {
            params.x += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.y += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            return params;
        }
    }

    class NewSmallNbParamsSystem2 extends SystemWithPBIterator2<SmallNbParam> {
        constructor(p: SmallNbParam) {
            super(p);
        }
        public execute(params: SmallNbParam, randomNb: number): SmallNbParam {
            params.x += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.y += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            return params;
        }
    }

    class TenParams implements IComponent {
        public entityId = 0;
        public active = true;
        constructor(public x = 0, public y = 0, public z = 0, public a = 0, public b = 0, public c = 0, public d = 0, public e = 0) { }
    }
    class TenParamsSystem extends System<TenParams> {
        protected _defaultParameter: TenParams = new TenParams();
        constructor() {
            super();
        }
        public execute(params: TenParams, randomNb: number) {
            params.x[this._k.x] += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.y[this._k.y] += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.z[this._k.z] += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.a[this._k.a] += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.b[this._k.b] += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.c[this._k.c] += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.d[this._k.d] += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.e[this._k.e] += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
        }
    }

    class NewTenParamsSystem extends SystemWithPBIterator<TenParams> {
        constructor(p: TenParams) {
            super(p);
        }
        public execute(params: TenParams, randomNb: number): TenParams {
            params.x += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.y += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.z += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.a += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.b += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.c += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.d += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.e += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            return params;
        }
    }

    class NewTenParamsSystem2 extends SystemWithPBIterator2<TenParams> {
        constructor(p: TenParams) {
            super(p);
        }
        public execute(params: TenParams, randomNb: number): TenParams {
            params.x += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.y += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.z += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.a += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.b += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.c += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            params.d += randomNb > 0.5 ? randomNb * 0.5 : randomNb * 2;
            params.e += randomNb > 0.45 ? randomNb * 0.45 : randomNb * 1.90;
            return params;
        }
    }

    const res: IRes[] = [];
    window["res"] = res;

    for (let i = 0; i < 10; ++i) {

        describe("previous System", () => {

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
                    let pool1: ComponentFactory<TenParams>;

                    let pools: Array<ComponentFactory<any>>;
                    let system: TenParamsSystem;
                    beforeEach(() => {
                        pool1 = new ComponentFactory<TenParams>(1000, new TenParams());

                        pools = [pool1];
                        system = new TenParamsSystem();
                        system.setParamSource("*", pool1);
                    });

                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const nbComp = 0;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "previousSystem" });
                    });
                    // it("10000 components", () => {

                    // });
                    // it("100000 components", () => {

                    // });
                });
                describe("1 pool per params", () => {

                    let poolId: ComponentFactory<IComponent>;
                    let poolActive: ComponentFactory<IComponent>;
                    let poolX: ComponentFactory<{ x: number } & IComponent>;
                    let poolY: ComponentFactory<{ y: number } & IComponent>;
                    let poolZ: ComponentFactory<{ z: number } & IComponent>;
                    let poolA: ComponentFactory<{ a: number } & IComponent>;
                    let poolB: ComponentFactory<{ b: number } & IComponent>;
                    let poolC: ComponentFactory<{ c: number } & IComponent>;
                    let poolD: ComponentFactory<{ d: number } & IComponent>;
                    let poolE: ComponentFactory<{ e: number } & IComponent>;

                    let pools: Array<ComponentFactory<any>>;
                    let system: TenParamsSystem;
                    beforeEach(() => {
                        poolId = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolActive = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolX = new ComponentFactory<{ x: number } & IComponent>(1000, { entityId: 0, active: true, x: 0 });
                        poolY = new ComponentFactory<{ y: number } & IComponent>(1000, { entityId: 0, active: true, y: 0 });
                        poolZ = new ComponentFactory<{ z: number } & IComponent>(1000, { entityId: 0, active: true, z: 0 });
                        poolA = new ComponentFactory<{ a: number } & IComponent>(1000, { entityId: 0, active: true, a: 0 });
                        poolB = new ComponentFactory<{ b: number } & IComponent>(1000, { entityId: 0, active: true, b: 0 });
                        poolC = new ComponentFactory<{ c: number } & IComponent>(1000, { entityId: 0, active: true, c: 0 });
                        poolD = new ComponentFactory<{ d: number } & IComponent>(1000, { entityId: 0, active: true, d: 0 });
                        poolE = new ComponentFactory<{ e: number } & IComponent>(1000, { entityId: 0, active: true, e: 0 });

                        pools = [poolId, poolActive, poolX, poolY, poolZ, poolA, poolB, poolC, poolD, poolE];
                        system = new TenParamsSystem();
                        system.setParamSource("entityId", poolId);
                        system.setParamSource("active", poolActive);
                        system.setParamSource("x", poolX);
                        system.setParamSource("y", poolY);
                        system.setParamSource("z", poolZ);
                        system.setParamSource("a", poolA);
                        system.setParamSource("b", poolB);
                        system.setParamSource("c", poolC);
                        system.setParamSource("d", poolD);
                        system.setParamSource("e", poolE);

                    });
                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const nbComp = 0;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents(pools, nbComp);
                        const r = run(system);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "previousSystem" });
                    });
                    // it("10000 components", () => {

                    // });
                    // it("100000 components", () => {

                    // });
                });
            });
        });
        describe("newSystem", () => {
            describe("small number of params", () => {
                describe("1 pool", () => {
                    let pool: ComponentFactory<SmallNbParam>;
                    let newSystem: NewSmallNbParamsSystem;
                    beforeEach(() => {
                        pool = new ComponentFactory<SmallNbParam>(1000, new SmallNbParam());
                        newSystem = new NewSmallNbParamsSystem(new SmallNbParam());

                        newSystem.setParamSource("*", pool);
                        expect(newSystem.parametersSource.get("x").keyInSource).to.equal("x");
                        expect(newSystem.parametersSource.get("y").keyInSource).to.equal("y");
                    });
                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: 0, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        pool.create(1, true);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    });
                    // it("10000 components", () => {
                    // const nbComp = 10000;
                    // createComponents([pool], nbComp);
                    // const r = run(newSystem);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    // });
                    // it("100000 components", () => {
                    // const nbComp = 100000;
                    // createComponents([pool], nbComp);
                    // const r = run(newSystem);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem" });
                    // });
                });
                describe("1 pool per params", () => {
                    let poolId: ComponentFactory<{ entityId: number, active: true }>;
                    let poolActive: ComponentFactory<{ entityId: number, active: true }>;
                    let poolX: ComponentFactory<{ entityId: number, active: true, x: number }>;
                    let poolY: ComponentFactory<{ entityId: number, active: true, y: number }>;

                    let pools: Array<ComponentFactory<any>>;

                    let newSystem: NewSmallNbParamsSystem;
                    beforeEach(() => {
                        poolId = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolActive = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolX = new ComponentFactory<{ entityId: number, active: true, x: number }>(1000, { entityId: 0, active: true, x: 0 });
                        poolY = new ComponentFactory<{ entityId: number, active: true, y: number }>(1000, { entityId: 0, active: true, y: 0 });

                        pools = [poolId, poolActive, poolX, poolY];

                        newSystem = new NewSmallNbParamsSystem(new SmallNbParam());
                        newSystem.setParamSource("entityId", poolId);
                        newSystem.setParamSource("active", poolActive);
                        newSystem.setParamSource("x", poolY);
                        newSystem.setParamSource("y", poolX);
                    });

                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const nbComp = 0;
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    });
                    // it("10000 components", () => {
                    // const nbComp = 10000;
                    // createComponents(pools, nbComp);
                    // const r = run(newSystem);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    // });
                    // it("100000 components", () => {
                    // const nbComp = 100000;
                    // createComponents(pools, nbComp);
                    // const r = run(newSystem);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem" });
                    // });
                });
            });
            describe("big number of params", () => {
                describe("1 pool", () => {
                    let pool1: ComponentFactory<TenParams>;

                    let pools: Array<ComponentFactory<any>>;
                    let newSystem: NewTenParamsSystem;
                    beforeEach(() => {
                        pool1 = new ComponentFactory<TenParams>(1000, new TenParams());

                        pools = [pool1];
                        newSystem = new NewTenParamsSystem(new TenParams());
                        newSystem.setParamSource("*", pool1);
                    });

                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const nbComp = 0;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem" });
                    });
                    // it("10000 components", () => {

                    // });
                    // it("100000 components", () => {

                    // });
                });
                describe("1 pool per params", () => {

                    let poolId: ComponentFactory<IComponent>;
                    let poolActive: ComponentFactory<IComponent>;
                    let poolX: ComponentFactory<{ x: number } & IComponent>;
                    let poolY: ComponentFactory<{ y: number } & IComponent>;
                    let poolZ: ComponentFactory<{ z: number } & IComponent>;
                    let poolA: ComponentFactory<{ a: number } & IComponent>;
                    let poolB: ComponentFactory<{ b: number } & IComponent>;
                    let poolC: ComponentFactory<{ c: number } & IComponent>;
                    let poolD: ComponentFactory<{ d: number } & IComponent>;
                    let poolE: ComponentFactory<{ e: number } & IComponent>;

                    let pools: Array<ComponentFactory<any>>;
                    let newSystem: NewTenParamsSystem;
                    beforeEach(() => {
                        poolId = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolActive = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolX = new ComponentFactory<{ x: number } & IComponent>(1000, { entityId: 0, active: true, x: 0 });
                        poolY = new ComponentFactory<{ y: number } & IComponent>(1000, { entityId: 0, active: true, y: 0 });
                        poolZ = new ComponentFactory<{ z: number } & IComponent>(1000, { entityId: 0, active: true, z: 0 });
                        poolA = new ComponentFactory<{ a: number } & IComponent>(1000, { entityId: 0, active: true, a: 0 });
                        poolB = new ComponentFactory<{ b: number } & IComponent>(1000, { entityId: 0, active: true, b: 0 });
                        poolC = new ComponentFactory<{ c: number } & IComponent>(1000, { entityId: 0, active: true, c: 0 });
                        poolD = new ComponentFactory<{ d: number } & IComponent>(1000, { entityId: 0, active: true, d: 0 });
                        poolE = new ComponentFactory<{ e: number } & IComponent>(1000, { entityId: 0, active: true, e: 0 });

                        pools = [poolId, poolActive, poolX, poolY, poolZ, poolA, poolB, poolC, poolD, poolE];
                        newSystem = new NewTenParamsSystem(new TenParams());
                        newSystem.setParamSource("entityId", poolId);
                        newSystem.setParamSource("active", poolActive);
                        newSystem.setParamSource("x", poolX);
                        newSystem.setParamSource("y", poolY);
                        newSystem.setParamSource("z", poolZ);
                        newSystem.setParamSource("a", poolA);
                        newSystem.setParamSource("b", poolB);
                        newSystem.setParamSource("c", poolC);
                        newSystem.setParamSource("d", poolD);
                        newSystem.setParamSource("e", poolE);

                    });
                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const nbComp = 0;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem" });
                    });
                    // it("10000 components", () => {

                    // });
                    // it("100000 components", () => {

                    // });
                });
            });
        });
        describe("newSystem2 with iteration by source", () => {
            describe("small number of params", () => {
                describe("1 pool", () => {
                    let pool: ComponentFactory<SmallNbParam>;
                    let newSystem: NewSmallNbParamsSystem2;
                    beforeEach(() => {
                        pool = new ComponentFactory<SmallNbParam>(1000, new SmallNbParam());
                        newSystem = new NewSmallNbParamsSystem2(new SmallNbParam());

                        newSystem.setParamSource("*", pool);
                        expect(newSystem.parametersSource.get("x").keyInSource).to.equal("x");
                        expect(newSystem.parametersSource.get("y").keyInSource).to.equal("y");
                    });
                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: 0, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        pool.create(1, true);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents([pool], nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    });
                    // it("10000 components", () => {
                    // const nbComp = 10000;
                    // createComponents([pool], nbComp);
                    // const r = run(newSystem);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    // });
                    // it("100000 components", () => {
                    // const nbComp = 100000;
                    // createComponents([pool], nbComp);
                    // const r = run(newSystem);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 1, sys: "newSystem2" });
                    // });
                });
                describe("1 pool per params", () => {
                    let poolId: ComponentFactory<{ entityId: number, active: true }>;
                    let poolActive: ComponentFactory<{ entityId: number, active: true }>;
                    let poolX: ComponentFactory<{ entityId: number, active: true, x: number }>;
                    let poolY: ComponentFactory<{ entityId: number, active: true, y: number }>;

                    let pools: Array<ComponentFactory<any>>;

                    let newSystem: NewSmallNbParamsSystem2;
                    beforeEach(() => {
                        poolId = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolActive = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolX = new ComponentFactory<{ entityId: number, active: true, x: number }>(1000, { entityId: 0, active: true, x: 0 });
                        poolY = new ComponentFactory<{ entityId: number, active: true, y: number }>(1000, { entityId: 0, active: true, y: 0 });

                        pools = [poolId, poolActive, poolX, poolY];

                        newSystem = new NewSmallNbParamsSystem2(new SmallNbParam());
                        newSystem.setParamSource("entityId", poolId);
                        newSystem.setParamSource("active", poolActive);
                        newSystem.setParamSource("x", poolY);
                        newSystem.setParamSource("y", poolX);
                    });

                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const nbComp = 0;
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    });
                    // it("10000 components", () => {
                    // const nbComp = 10000;
                    // createComponents(pools, nbComp);
                    // const r = run(newSystem);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    // });
                    // it("100000 components", () => {
                    // const nbComp = 100000;
                    // createComponents(pools, nbComp);
                    // const r = run(newSystem);
                    // res.push({ time: r, nbComponents: nbComp, nbParam: 4, nbPool: 4, sys: "newSystem2" });
                    // });
                });
            });
            describe("big number of params", () => {
                describe("1 pool", () => {
                    let pool1: ComponentFactory<TenParams>;

                    let pools: Array<ComponentFactory<any>>;
                    let newSystem: NewTenParamsSystem2;
                    beforeEach(() => {
                        pool1 = new ComponentFactory<TenParams>(1000, new TenParams());

                        pools = [pool1];
                        newSystem = new NewTenParamsSystem2(new TenParams());
                        newSystem.setParamSource("*", pool1);
                    });

                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const nbComp = 0;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 1, sys: "newSystem2" });
                    });
                    // it("10000 components", () => {

                    // });
                    // it("100000 components", () => {

                    // });
                });
                describe("1 pool per params", () => {

                    let poolId: ComponentFactory<IComponent>;
                    let poolActive: ComponentFactory<IComponent>;
                    let poolX: ComponentFactory<{ x: number } & IComponent>;
                    let poolY: ComponentFactory<{ y: number } & IComponent>;
                    let poolZ: ComponentFactory<{ z: number } & IComponent>;
                    let poolA: ComponentFactory<{ a: number } & IComponent>;
                    let poolB: ComponentFactory<{ b: number } & IComponent>;
                    let poolC: ComponentFactory<{ c: number } & IComponent>;
                    let poolD: ComponentFactory<{ d: number } & IComponent>;
                    let poolE: ComponentFactory<{ e: number } & IComponent>;

                    let pools: Array<ComponentFactory<any>>;
                    let newSystem: NewTenParamsSystem2;
                    beforeEach(() => {
                        poolId = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolActive = new ComponentFactory<{ entityId: number, active: true }>(1000, { entityId: 0, active: true });
                        poolX = new ComponentFactory<{ x: number } & IComponent>(1000, { entityId: 0, active: true, x: 0 });
                        poolY = new ComponentFactory<{ y: number } & IComponent>(1000, { entityId: 0, active: true, y: 0 });
                        poolZ = new ComponentFactory<{ z: number } & IComponent>(1000, { entityId: 0, active: true, z: 0 });
                        poolA = new ComponentFactory<{ a: number } & IComponent>(1000, { entityId: 0, active: true, a: 0 });
                        poolB = new ComponentFactory<{ b: number } & IComponent>(1000, { entityId: 0, active: true, b: 0 });
                        poolC = new ComponentFactory<{ c: number } & IComponent>(1000, { entityId: 0, active: true, c: 0 });
                        poolD = new ComponentFactory<{ d: number } & IComponent>(1000, { entityId: 0, active: true, d: 0 });
                        poolE = new ComponentFactory<{ e: number } & IComponent>(1000, { entityId: 0, active: true, e: 0 });

                        pools = [poolId, poolActive, poolX, poolY, poolZ, poolA, poolB, poolC, poolD, poolE];
                        newSystem = new NewTenParamsSystem2(new TenParams());
                        newSystem.setParamSource("entityId", poolId);
                        newSystem.setParamSource("active", poolActive);
                        newSystem.setParamSource("x", poolX);
                        newSystem.setParamSource("y", poolY);
                        newSystem.setParamSource("z", poolZ);
                        newSystem.setParamSource("a", poolA);
                        newSystem.setParamSource("b", poolB);
                        newSystem.setParamSource("c", poolC);
                        newSystem.setParamSource("d", poolD);
                        newSystem.setParamSource("e", poolE);

                    });
                    // 0, 1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 10000, 100000
                    it("0 component", () => {
                        const nbComp = 0;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("1 components", () => {
                        const nbComp = 1;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("5 components", () => {
                        const nbComp = 5;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("10 components", () => {
                        const nbComp = 10;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("25 components", () => {
                        const nbComp = 25;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("50 components", () => {
                        const nbComp = 50;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("75 components", () => {
                        const nbComp = 75;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("100 components", () => {
                        const nbComp = 100;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("250 components", () => {
                        const nbComp = 250;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("500 components", () => {
                        const nbComp = 500;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    it("1000 components", () => {
                        const nbComp = 1000;
                        createComponents(pools, nbComp);
                        const r = run(newSystem);
                        res.push({ time: r, nbComponents: nbComp, nbParam: 10, nbPool: 10, sys: "newSystem2" });
                    });
                    // it("10000 components", () => {

                    // });
                    // it("100000 components", () => {

                    // });
                });
            });
        });
    }
});

const run = (system: ISystem<any>): number => {
    const random = Math.random();
    const t0 = performance.now();
    system.process(random);
    const t1 = performance.now();
    const r = t1 - t0;
    // console.log(r + "mms");
    return r;
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
