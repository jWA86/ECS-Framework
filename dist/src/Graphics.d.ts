/// <reference types="webgl2" />
import { IGraphics } from "./IGraphics";
export { Graphics };
declare class Graphics implements IGraphics {
    protected _canvasId: string;
    protected _renderingContext: "2d" | "webgl" | "webgl2";
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext;
    constructor(_canvasId: string, _renderingContext: "2d" | "webgl" | "webgl2");
    initCanvas(): void;
    readonly canvasId: string;
    readonly context: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext;
    readonly canvas: HTMLCanvasElement;
}
