"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
describe("initial test", function () {
    it("false should not be equal to true", function () {
        chai_1.expect(false).to.equal(true);
    });
});
