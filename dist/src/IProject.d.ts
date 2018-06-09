import { IGameLoop, IGraphics, IPoolManager, ISystemManager, IUtil } from "./interfaces";
export { IKeyboardShortCut, IProject };
interface IKeyboardShortCut {
    bind: (...args: any[]) => void;
}
interface IProject {
    dependencies: Array<{
        name: string;
        object: any;
    }>;
    gameLoop: IGameLoop;
    poolManager: IPoolManager;
    systemManager: ISystemManager;
    graphics: IGraphics;
    keyboardShortCut: IKeyboardShortCut;
    clear: () => void;
    utils: Map<string, IUtil>;
}
