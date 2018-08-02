import { FastIterationMap } from "FastIterationMap";
import { IGameLoop, IGraphics, IPool, ISystemManager, IUtil } from "./interfaces";
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
    poolManager: FastIterationMap<string, IPool>;
    factories: FastIterationMap<string, {
        create: (...args: any[]) => any;
    }>;
    systemManager: ISystemManager;
    graphics: IGraphics;
    keyboardShortCut: IKeyboardShortCut;
    clear: () => void;
    utils: Map<string, IUtil>;
}
