/// <reference types="webgl2" />
export { IGraphics };
interface IGraphics {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext;
}
