import { IUtil } from "../interfaces";
import { IHtmlInterface } from "./IHtmlInterface";
export { HtmlInterface };

// TO do , propriety to place it on top of the canvas
class HtmlInterface implements IUtil, IHtmlInterface {

    protected _placeHolderId: string;
    protected _display: boolean = false;

    constructor(protected _htmlId: string, protected _url: string) { }

    /**
     * Insert the html object inside a container
     * @param placeHolderId html id of the container
     */
    public install(placeHolderId: string, display?: false) {
        this._placeHolderId = placeHolderId;
        const obj = `<object id="${this._htmlId}" type="text/html" data="${this._url}"></object>`;
        document.getElementById(placeHolderId).insertAdjacentHTML("afterbegin", obj);
        this.toggleDisplay(display);

    }

    /**
     * Remove the html object from the page
     */
    public uninstall() {
        const parent = document.getElementById(this._placeHolderId);
        const content = document.getElementById(this._htmlId);
        parent.removeChild(content);
    }

    /**
     * Toggle css style : display: "none" || display: "initial"
     */
    public toggleDisplay(val?: boolean) {
        this._display = val || !this._display;
        document.getElementById(this._htmlId).style.display = this._display ? "initial" : "none";
    }

    /**
     *
     */
    public modifyContent(url: string) {
        this._url = url;
        document.getElementById(this._htmlId).setAttribute("data", url);
        // change data in html
    }

    public get id(): string {
        return this._htmlId;
    }

    public set display(val: boolean) {
        this._display = val;
        this.toggleDisplay(val);
    }

    public get display(): boolean {
        return this._display;
    }

    public get url(): string {
        return this._url;
    }
}
