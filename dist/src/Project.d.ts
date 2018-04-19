import { GameLoop } from "./GameLoop";
import { IProject } from "./interfaces";
import { PoolManager } from "./PoolManager";
import { SystemManager } from "./SystemManager";
export { Project };
declare class Project implements IProject {
    protected _projectName: string;
    gameLoop: GameLoop;
    poolManager: PoolManager;
    systemManager: SystemManager;
    protected _dependencies: any[];
    constructor(_projectName: string, dependencies?: Array<{
        name: string;
        object: any;
    }>);
    clear(): void;
    protected exposeCore(): void;
    protected exposeDependencies(dependencies: any[]): void;
    readonly projectName: string;
    readonly dependencies: any[];
}
