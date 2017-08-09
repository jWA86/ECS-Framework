import "mocha";
import {expect} from "chai";

describe(`initial test`, () => {
	it(`false should not be equal to true`, () => {
		expect(false).to.equal(true);
	}); 
});