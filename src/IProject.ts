import { IGameLoop, IPool, IPoolManager, ISystemManager, IUtil } from "./interfaces";
export { IProject };

interface IProject {
    dependencies: Array<{name: string, object: any}>;
    gameLoop: IGameLoop;
    poolManager: IPoolManager;
    systemManager: ISystemManager;
    clear: () => void;
}
