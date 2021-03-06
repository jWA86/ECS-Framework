import { expect } from "chai";
import "mocha";
import { GLOBAL } from "../../src/pollyFill";

describe("HtmlInterface", () => {
    const placeHolderId = "placeHolder";
    const htmlInterface = "<div style='{background-color: red}'></div>";
    document.body.innerHTML = "";
    let mockHtml = '<div id="' + placeHolderId + '"><canvas id="canvas" width="800" height="600"></canvas></div>';
    document.body.innerHTML = mockHtml;

    before(() => {
        expect(GLOBAL).to.not.equal(undefined);

        document.body.innerHTML = "";
        mockHtml = '<div id="' + placeHolderId + '"><canvas id="canvas" width="800" height="600"></canvas></div>';
        document.body.innerHTML = mockHtml;
    });

    it("set a html element on top of the canvas", () => {
        // const p = new Project("project10");
        // const interfaceId = "myInterface";
        // p.initHtmlInterface(placeHolderId, interfaceId, "ctrl+t", htmlInterface);
        // expect(document.getElementById(interfaceId)).to.not.equal(undefined);
    });
});
