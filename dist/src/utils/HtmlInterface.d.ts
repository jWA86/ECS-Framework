import { IUtil } from "../interfaces";
import { IHtmlInterface } from "./IHtmlInterface";
export { HtmlInterface };
declare class HtmlInterface implements IUtil, IHtmlInterface {
    protected _htmlId: string;
    protected _url: string;
    protected _placeHolderId: string;
    protected _display: boolean;
    constructor(_htmlId: string, _url: string);
    /**
     * Insert the html object inside a container
     * @param placeHolderId html id of the container
     */
    install(placeHolderId: string, display?: false): void;
    /**
     * Remove the html object from the page
     */
    uninstall(): void;
    /**
     * Toggle css style : display: "none" || display: "initial"
     */
    toggleDisplay(val?: boolean): void;
    /**
     *
     */
    modifyContent(url: string): void;
    readonly id: string;
    display: boolean;
    readonly url: string;
}
