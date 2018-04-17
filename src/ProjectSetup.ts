import { GameLoop } from "./GameLoop";
import { IProjectSetup, IUtil } from "./interfaces";
import { PoolManager } from "./PoolManager";
import { SystemManager } from "./SystemManager";

class Project  {
    public project: IProjectSetup;
    protected globalObject: any;
    constructor(globalObject: any, protected _projectName: string, ...utils: IUtil[]) {
        const sysM  = new SystemManager();
        this.project = {
            GameLoop: new GameLoop(sysM),
            PoolManager: new PoolManager(),
             SystemManager: sysM,
               Utils: [...utils] };

        globalObject[_projectName] = this.project;
    }

    get projectName(): string {
        return this._projectName;
    }

    /**
     * Clear references so that the project can be garbage collected
     */
    public clear() {
        this.project.GameLoop.stop();
        this.project.GameLoop.systemManager = undefined;

        this.project.SystemManager = undefined;
        this.project.PoolManager = undefined;

        this.globalObject[this._projectName] = undefined;

        this.project.Utils = [];

        try {
            delete this.globalObject[this._projectName];
        } catch (e) { }
    }
}
