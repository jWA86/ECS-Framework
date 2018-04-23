import { IGraphics } from "./IGraphics";
export { Graphics };
declare class Graphics implements IGraphics {
    protected _canvasId: string;
    protected _renderingContext: "2d" | "webgl";
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D | WebGLRenderingContext;
    constructor(_canvasId: string, _renderingContext: "2d" | "webgl");
    protected initCanvas(): void;
    protected get2DCanvasRenderingContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
    readonly canvasId: string;
    readonly context: CanvasRenderingContext2D | WebGLRenderingContext;
    readonly canvas: HTMLCanvasElement;
}
