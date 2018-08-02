import { expect } from "chai";
import "mocha";
import { ComponentFactory } from "../ComponentFactory";
import { IComponent } from "../IComponentFactory";
import { IComponentFactory, ISystem } from "../interfaces";
import { System } from "../System";

// Component
class Comp1 implements IComponent {
    public entityId = 0;
    public active = true;
    constructor(public s: string, public nested: { ns1: string, ns2: string }) { }
}

class Comp2 implements IComponent {
    public entityId = 0;
    public active = true;
    constructor(public s2: string, public nested2: { ns12: string, ns22: string }) { }
}

// System
interface IASysParam {
    s: string;
    nested: { ns1: string, ns2: string };
}

class ASystem extends System<IASysParam> {
    public active = true;
    protected _parameters: IASysParam = { s: "", nested: { ns1: "", ns2: "" } };
    protected _k: { s: string, nested: string };
    public get parameters() {
        return this._parameters;
    }
    constructor() {
        super();
        this._k = { s: "", nested: "" };
    }
    public setSource(param: string, key: string, source: IComponentFactory<IComponent>) {
        this._k[param] = key;
    }
    public execute(params: IASysParam) {
        params.s[this._k.s] = "s";
    }
}

describe.only("spike", () => {
    let pool1: ComponentFactory<Comp1>;
    let pool2: ComponentFactory<Comp2>;

    beforeEach(() => {
        pool1 = new ComponentFactory<Comp1>(10, new Comp1("", { ns1: "", ns2: "" }));
        pool2 = new ComponentFactory<Comp2>(10, new Comp2("", { ns12: "", ns22: "" }));
    });
    it("should set every component.s proprety to 's' ", () => {
        const sys = new ASystem();
        const p1 = pool1.create(1, true);
        const p2 = pool1.create(2, true);
        expect(p1.s).to.equal("");
        sys.setParamSource("*", pool1);
        sys.setSource("s", "s", pool1);
        sys.process();
        expect(pool1.get(1).s).to.equal("s");
        expect(pool1.get(2).s).to.equal("s");

    });
    it("should set every component.s2 proprety to s while calling params.s in the system.execute", () => {
        const sys = new ASystem();
        const p1 = pool2.create(1, true);
        const p2 = pool2.create(2, true);
        expect(p1.s2).to.equal("");
        sys.setParamSource("*", pool2);
        sys.setSource("s", "s2", pool2);
        sys.process();
        expect(pool2.get(1).s2).to.equal("s");
        expect(pool2.get(2).s2).to.equal("s");
    });
    it("perf ", () => {
        for (let i = 1; i < pool2.size; ++i) {
            pool1.create(i, true);
        }
    });
});


// t: 0.304931640625ms
// sysParamSpike.ts:80 t: 0.069091796875ms
// debug.js:15 SUCCESS spike should set every component.s proprety to 's' 
// debug.js:15 SUCCESS spike should set every component.s2 proprety to s while calling params.s in the system.execute
// debug.js:6 Skipped 0 tests