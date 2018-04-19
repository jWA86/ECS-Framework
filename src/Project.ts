import { ComponentFactory } from "./ComponentFactory";
import { EntityFactory } from "./EntityFactory";
import { GameLoop } from "./GameLoop";
import { IProject, IUtil } from "./interfaces";
import { GLOBAL } from "./pollyFill";
import { PoolManager } from "./PoolManager";
import { System } from "./System";
import { SystemManager } from "./SystemManager";

export { Project };

class Project implements IProject {
    public gameLoop: GameLoop;
    public poolManager: PoolManager;
    public systemManager: SystemManager;
    protected _dependencies: any[];
    constructor(protected _projectName: string, dependencies?: Array<{name: string, object: any}>) {
        const sysM = new SystemManager();
        this.gameLoop = new GameLoop(sysM);
        this.poolManager = new PoolManager();
        this.systemManager = sysM;
        this._dependencies = dependencies || [];

        GLOBAL[_projectName] = this;
        this.exposeCore();
        this.exposeDependencies(this._dependencies);
    }

    public clear() {
        this.gameLoop.stop();
        this.gameLoop.systemManager = undefined;

        this.systemManager = undefined;
        this.poolManager = undefined;

        if (GLOBAL) {
            GLOBAL[this._projectName] = undefined;
            try {
                delete GLOBAL[this._projectName];
                this._dependencies.forEach((d) => {
                    GLOBAL[d.name] = undefined;
                    delete GLOBAL[d.name];
                });
            } catch (e) {
                throw e;
            }
        }
    }

    protected exposeCore() {
        GLOBAL["ComponentFactory"] = ComponentFactory;
        GLOBAL["System"] = System;
        GLOBAL["EntityFactory"] = EntityFactory;
    }

    protected exposeDependencies(dependencies: any[]) {
        dependencies.forEach((d) => {
            GLOBAL[d.name] = d.object;
        });
    }

    get projectName(): string {
        return this._projectName;
    }

    get dependencies(): any[] {
        return this._dependencies;
    }

}
