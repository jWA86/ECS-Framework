export { IGraphics };
interface IGraphics {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | WebGLRenderingContext;
}
