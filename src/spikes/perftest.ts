import { ComponentFactory } from "../ComponentFactory";
import { GameLoop, interfaces, SystemManager, TimeMeasureComponent, TimeMeasureUtil } from "../entry";
import { System } from "../System";
class Comp1 {
    public entityId = 0;
    public active = true;
    constructor(public s, public nested, public num1, public num2, public num3) { }
}

const defaultComP1 = { entityId: 0, active: true, s: "", nested: { ns1: "", ns2: "" }, num1: 0, num2: 0, num3: 0 };

class ASystem extends System<Comp1> {
    public active = true;
    protected _parameters: Comp1 = defaultComP1;
    protected _k: { s: string, nested: string, num1: string, num2: string, num3: string };
    public get parameters() {
        return this._parameters;
    }
    constructor() {
        super();
        this._k = { s: "", nested: "", num1: "", num2: "", num3: "" };
    }
    public setSource(param: string, key: string, source: interfaces.IComponentFactory<interfaces.IComponent>) {
        this._k[param] = key;
    }
    public execute(params: Comp1) {
        params.s[this._k.s] = "s" + params.num1[this._k.num1];
        params.nested[this._k.nested].ns1 = "ns1";
        params.num1[this._k.num1] += (params.num2[this._k.num2]) / (params.num2[this._k.num2] / + 1);
        params.num2[this._k.num2] += params.num1[this._k.num1] + 2;
        params.num3[this._k.num3] += 1;
    }
}

interface IOldSysParams {
    s: { s: string };
    n: { nested: { ns1: string, ns2: string } };
    num1: { num1: number };
    num2: { num2: number };
    num3: { num3: number };
}

class OldSys extends System<IOldSysParams> {
    protected _parameters: IOldSysParams = { s: { s: "" }, n: { nested: { ns1: "", ns2: "" } }, num1: { num1: 0 }, num2: { num2: 0 }, num3: { num3: 0 } };
    public execute(params: IOldSysParams) {
        params.s.s = "s" + params.num1;
        params.n.nested.ns1 = "ns1";
        params.num1.num1 += (params.num2.num2) / (params.num2.num2 + 1);
        params.num2.num2 += params.num1.num1 + 1;
        params.num3.num3 += 1;
    }
}

const testNewSys = (numComp: number, time: number, sampleFrequency: number) => {
    return new Promise((resolve) => {
        const pool1 = new ComponentFactory(numComp, new Comp1("", { ns1: "", ns2: "" }, 0, 0, 0));

        for (let i = 1; i < pool1.size; ++i) {
            pool1.create(i, true);
        }

        let newSys = new ASystem();

        newSys = new ASystem();
        newSys.setParamSource("*", pool1);
        newSys.setSource("s", "s", pool1);
        newSys.setSource("nested", "nested", pool1);
        newSys.setSource("num1", "num1", pool1);
        newSys.setSource("num2", "num2", pool1);
        newSys.setSource("num3", "num3", pool1);

        const gl = new GameLoop(new SystemManager());
        const sid = gl.systemManager.pushSystem(newSys, false);
        const tmUtil = new TimeMeasureUtil(gl.systemManager);
        const tmC = tmUtil.install(sid);
        tmC.frequency = sampleFrequency;
        gl.start();
        setTimeout(() => {
            gl.pause();
            resolve(tmC);

            // return tmC;
        }, time);
    });
};

const testOdlSys = (numComp: number, time: number, sampleFrequency) => {
    return new Promise((resolve, reject) => {
        const pool1 = new ComponentFactory(numComp, new Comp1("", { ns1: "", ns2: "" }, 0, 0, 0));

        for (let i = 1; i < pool1.size; ++i) {
            pool1.create(i, true);
        }

        let oldSys = new OldSys();

        oldSys = new OldSys();
        oldSys.setParamSource("*", pool1);

        const gl = new GameLoop(new SystemManager());
        const sid = gl.systemManager.pushSystem(oldSys, false);
        const tmUtil = new TimeMeasureUtil(gl.systemManager);
        const tmC = tmUtil.install(sid);
        tmC.frequency = sampleFrequency;
        gl.start();
        setTimeout(() => {
            gl.pause();
            resolve(tmC);

            // return tmC;
        }, time);
    });

};

const nb = 1000;
const runTime = 2000;
const sampleFreq = 900;

const oldSysTime: TimeMeasureComponent[] = [];
const newSysTime: TimeMeasureComponent[] = [];

const runOldTest = () => testOdlSys(nb, runTime, sampleFreq).then((tmC) => {
    oldSysTime.push(Object.assign(new TimeMeasureComponent("", 0, 0, 0, 0, 0), tmC));
});

runOldTest().then(runOldTest).then(runOldTest).then(runOldTest).then(() => {
    console.table(oldSysTime);

    let sumAvgOldSysTime = 0;
    oldSysTime.forEach((t) => {
        sumAvgOldSysTime += t.meanT;
    });

    console.log("avg oldSysTime: " + sumAvgOldSysTime / oldSysTime.length);
});

const runNewTest = () => testNewSys(nb, runTime, sampleFreq).then((tmC) => {
    newSysTime.push(Object.assign(new TimeMeasureComponent("", 0, 0, 0, 0, 0), tmC));
});

runNewTest().then(runNewTest).then(runNewTest).then(runNewTest).then(() => {
    console.table(newSysTime);

    let sumAvgNewSysTime = 0;
    newSysTime.forEach((t) => {
        sumAvgNewSysTime += t.meanT;
    });

    console.log("avg newSysTime: " + sumAvgNewSysTime / newSysTime.length);
});

describe.only("perf test", () => {
    it("newSys", (done) => {
        testNewSys(nb, runTime, sampleFreq).then(done());
    });
    it("oldSys", (done) => {
        testOdlSys(nb, runTime, sampleFreq).then(done());
    });
});
