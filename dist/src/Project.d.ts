import { FastIterationMap } from "FastIterationMap";
import { GameLoop } from "./GameLoop";
import { IGraphics, IKeyboardShortCut, IPool, IProject, IUtil } from "./interfaces";
import { SystemManager } from "./SystemManager";
export { Project };
declare class Project implements IProject {
    protected _projectName: string;
    gameLoop: GameLoop;
    graphics: IGraphics;
    poolManager: FastIterationMap<string, IPool>;
    systemManager: SystemManager;
    factories: FastIterationMap<string, {
        create: (...args) => any;
    }>;
    keyboardShortCut: IKeyboardShortCut;
    /** Centralize instances of utils here */
    utils: Map<string, IUtil>;
    protected _dependencies: any[];
    constructor(_projectName: string, dependencies?: Array<{
        name: string;
        object: any;
    }>);
    clear(): void;
    protected exposeCore(): void;
    protected exposeDependencies(dependencies: any[]): void;
    readonly projectName: string;
    /** Class that could be instantiate after the project has started */
    readonly dependencies: any[];
}
