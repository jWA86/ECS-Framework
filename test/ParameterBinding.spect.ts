import { expect } from "chai";
import "mocha";
import { ComponentFactory } from "../src/entry";
import { IComponent } from "../src/interfaces";
import { ParameterBinding, ParametersSourceIterator } from "../src/ParameterSource";

describe("ParameterBinding", () => {
    class Comp1 implements IComponent {
        public entityId: 0;
        public active: true;
        constructor(public x1: number = 0) { }
    }

    class Comp2 implements IComponent {
        public entityId: 0;
        public active: true;
        constructor(public x2: number = 0) { }
    }
    class ParamComp implements IComponent {
        public entityId = 0;
        public active = false;
        constructor(public x = 0, public y = 0) { }
    }

    let poolFactory1: ComponentFactory<Comp1>;
    let poolFactory2: ComponentFactory<Comp2>;

    beforeEach(() => {
        poolFactory1 = new ComponentFactory(1000, new Comp1());
        poolFactory2 = new ComponentFactory(1000, new Comp2());
    });

    it("should be able to get the parameter value with a different objectKey in the associated poolFactory", () => {
        const cp1 = poolFactory1.create(1, true);
        cp1.x1 = 2;
        const cp2 = poolFactory2.create(1, true);
        cp2.x2 = 3;
        const xPB = new ParameterBinding("x");
        xPB.setSource(poolFactory1, "x1");

        let x = xPB.getParameter(1);
        expect(x).to.equal(cp1.x1);

        xPB.setSource(poolFactory2, "x2");
        x = xPB.getParameter(1);
        expect(x).to.equal(cp2.x2);
    });
    describe("ParametersSourceIterator", () => {

        let defaultParams;
        beforeEach(() => {
            defaultParams = { entityId: 0, active: true, x: 0, y: 0, s: "a string" };
        });
        it("should accept an object at contruction from which it construct a collection of parameter binding", () => {

            const pSIterator = new ParametersSourceIterator(defaultParams);
            expect(pSIterator.sources.get("x").key).to.equal("x");
            expect(pSIterator.sources.get("y").key).to.equal("y");
            expect(pSIterator.sources.get("s").key).to.equal("s");
            expect(pSIterator.sources.get("active").key).to.equal("active");
            expect(pSIterator.sources.get("entityId").key).to.equal("entityId");

        });

        it("should able to set the source and key in source for each params", () => {
            const p1 = new ComponentFactory<Comp1>(10, new Comp1());
            const p2 = new ComponentFactory<Comp2>(10, new Comp2());
            const c1 = p1.create(1, true);
            c1.x1 += 1;
            const c2 = p2.create(1, true);
            c2.x2 = c1.x1 + 1;
            expect(c2.x2).to.not.eq(c1.x1);
            const pSIterator = new ParametersSourceIterator(new Comp1());
            pSIterator.setObjectSource("x1", p1, "x1");
            expect(pSIterator.sources.get("x1").getParameter(1)).be.eq(c1.x1);

            pSIterator.setObjectSource("x1", p2, "x2");
            expect(pSIterator.sources.get("x1").getParameter(1)).be.eq(c2.x2);
        });

        it("should be able to assemble a parameter object with value from various component source", () => {
            const p1 = new ComponentFactory<Comp1>(10, new Comp1());
            const p2 = new ComponentFactory<Comp2>(10, new Comp2());
            const c1 = p1.create(1, true);
            c1.x1 += 1;
            const c2 = p2.create(1, true);
            c2.x2 = c1.x1 + 1;
            expect(c2.x2).to.not.eq(c1.x1);

            const pSIterator = new ParametersSourceIterator(new ParamComp());
            pSIterator.setObjectSource("*", p1);
            pSIterator.setObjectSource("x", p1, "x1");
            pSIterator.setObjectSource("y", p2, "x2");

            const objParam1 = new ParamComp();
            const compParam1: Record<keyof ParamComp, IComponent> = {} as Record<keyof ParamComp, IComponent>;
            pSIterator.next(objParam1, compParam1, false);

            expect(objParam1.entityId).to.equal(1);
            expect(objParam1.x).to.equal(p1.get(1).x1);
            expect(objParam1.y).to.equal(p2.get(1).x2);

        });
        it("should be able to assemble a parameter object referencing the components for each parameter", () => {
            const p1 = new ComponentFactory<Comp1>(10, new Comp1());
            const p2 = new ComponentFactory<Comp2>(10, new Comp2());
            const c1 = p1.create(1, true);
            c1.x1 += 1;
            const c2 = p2.create(1, true);
            c2.x2 = c1.x1 + 1;
            expect(c2.x2).to.not.eq(c1.x1);

            const pSIterator = new ParametersSourceIterator(new ParamComp());
            pSIterator.setObjectSource("*", p1);
            pSIterator.setObjectSource("x", p1, "x1");
            pSIterator.setObjectSource("y", p2, "x2");

            const objParam1 = new ParamComp();
            const compParam1: Record<keyof ParamComp, IComponent> = {} as Record<keyof ParamComp, IComponent>;
            pSIterator.next(objParam1, compParam1, false);

            expect(compParam1.entityId.entityId).to.equal(1);
            expect(compParam1.x["x1"]).to.equal(p1.get(1).x1);
            expect(compParam1.y["x2"]).to.equal(p2.get(1).x2);
        });
        it("next should return true when reach the end of activeLenght of the pool referencing entityId", () => {
            const p1 = new ComponentFactory<Comp1>(20, new Comp1());
            const p2 = new ComponentFactory<Comp2>(20, new Comp2());
            let i = 1;
            while (i < 11) {
                const c1 = p1.create(i, true);
                c1.x1 += Math.random() * 10;
                const c2 = p2.create(i, true);
                c2.x2 += Math.random() * 10;
                i++;
            }

            expect(p1.nbActive).to.equal(10);
            expect(p2.nbActive).to.equal(10);

            const pSIterator = new ParametersSourceIterator(new ParamComp());
            pSIterator.setObjectSource("*", p1);
            pSIterator.setObjectSource("x", p1, "x1");
            pSIterator.setObjectSource("y", p2, "x2");

            const objParam = new ParamComp();
            const compParam = {} as Record<keyof ParamComp, IComponent>;
            let counter = 0;
            while (!pSIterator.next(objParam, compParam, false)) {
                counter += 1;
            }
            expect(counter).to.equal(p1.nbActive);
        });
        it("should be able to skip inactive component ", () => {

            // inactive component have their x value set to -1
            // then when iterate on the components while skiping inactive component we check if the assemblage phase has been skiped by checking if the value is not equal -1, if it's equal -1 that mean the objparam have been assembled, which is what we wanted to skip
            const p1 = new ComponentFactory<Comp1>(20, new Comp1());
            const p2 = new ComponentFactory<Comp2>(20, new Comp2());
            let i = 1;
            while (i < 11) {
                const c1 = p1.create(i, i % 2 ? true : false);
                c1.x1 = c1.active ? Math.random() * 10 : -1;
                const c2 = p2.create(i, i % 2 ? true : false);
                c2.x2 = c2.active ? Math.random() * 10 : -1;
                i++;
            }

            expect(p1.nbActive).to.equal(5);
            expect(p2.nbActive).to.equal(5);

            const pSIterator = new ParametersSourceIterator(new ParamComp());
            pSIterator.setObjectSource("*", p1);
            pSIterator.setObjectSource("x", p1, "x1");
            pSIterator.setObjectSource("y", p2, "x2");

            const objParam = new ParamComp();
            const compParam = {} as Record<keyof ParamComp, IComponent>;
            while (!pSIterator.next(objParam, compParam, true)) {
                if (!objParam.active) {
                    // if skip inactive, then the objParam value are the one of the previous assembled objParam
                    expect(objParam.x).to.not.equal(-1);
                }
            }
        });
        it("throw an error when one component is not found", () => {

        });
        it("should be able to copy back value to components", () => {
            const p1 = new ComponentFactory<Comp1>(20, new Comp1());
            const p2 = new ComponentFactory<Comp2>(20, new Comp2());
            let i = 1;
            while (i < 11) {
                const c1 = p1.create(i, true);
                c1.x1 = Math.random() * 10;
                const c2 = p2.create(i, true);
                c2.x2 = Math.random() * 10;
                i++;
            }

            const pSIterator = new ParametersSourceIterator(new ParamComp());
            pSIterator.setObjectSource("*", p1);
            pSIterator.setObjectSource("x", p1, "x1");
            pSIterator.setObjectSource("y", p2, "x2");

            const objParam = new ParamComp();
            const compParam = {} as Record<keyof ParamComp, IComponent>;
            while (!pSIterator.next(objParam, compParam, true)) {
                if (!objParam.active) {
                    objParam.x = 314.0;
                    objParam.y = 314.0;
                    expect(compParam.x[pSIterator.sources.get("x").keyInSource]).to.not.equal(objParam.x);
                    expect(compParam.y[pSIterator.sources.get("y").keyInSource]).to.not.equal(objParam.y);
                    pSIterator.copyValToComponent(objParam, compParam);
                    expect(compParam.x[pSIterator.sources.get("x").keyInSource]).to.equal(objParam.x);
                    expect(compParam.y[pSIterator.sources.get("y").keyInSource]).to.equal(objParam.y);
                }
            }
        });
        it("should be able to sort params by source for faster assemblage", () => {

            const p1 = new ComponentFactory<Comp1>(20, new Comp1());
            const p2 = new ComponentFactory<Comp2>(20, new Comp2());

            const pSIterator = new ParametersSourceIterator(new ParamComp());
            pSIterator.setObjectSource("*", p1);
            pSIterator.setObjectSource("x", p1, "x1");
            pSIterator.setObjectSource("y", p2, "x2");

            const res = pSIterator.sortParamBySource(pSIterator.sources);
            expect(res[0].length).to.equal(3);
            expect(res[0][0].source).to.equal(res[0][1].source);
            expect(res[1].length).to.equal(1);
            expect(res[1][0].source).to.not.equal(res[0][1].source);
        });
    });
});

// for every source:
// get params

// ex : x s1, y s2, entityId: s1, active: s1
// currently do :
// x = refComponent
// y = getById
// entityId = getById
// active = getById

// by Sources :
// s1 :
// set x by refComponent
// entityId = refComponent
// active = refComponent
// s2:
// y getById

// TODO :
// system class with this paramIterator
// compare performance
// Refactor test process active from different source than entityId (and different key)
