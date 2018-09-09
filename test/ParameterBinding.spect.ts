import { expect } from "chai";
import "mocha";
import { ComponentFactory } from "../src/entry";
import { IComponent } from "../src/interfaces";
import { ParameterBinding } from "../src/ParameterSource";

describe.only("ParameterBinding", () => {
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
        // TODO :
        // test parameterSourceIterator
        // rewrite system to use parameterSourceITerator
        // compare performance

    });
});
