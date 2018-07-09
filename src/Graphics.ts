import { IGraphics } from "./IGraphics";

export { Graphics };

class Graphics implements IGraphics {

    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D | WebGLRenderingContext| WebGL2RenderingContext;
    constructor(protected _canvasId: string, protected _renderingContext: "2d" | "webgl" | "webgl2") { }

    public initCanvas() {
        this._canvas = document.getElementById(this._canvasId) as HTMLCanvasElement;
        this._context = this._canvas.getContext(this._renderingContext);
    }

    // protected getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext {
    //     return canvas.getContext("2d");
    // }
    public get canvasId() {
        return this._canvasId;
    }
    public get context() {
        return this._context;
    }
    public get canvas() {
        return this._canvas;
    }
}
