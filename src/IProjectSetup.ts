import { IGameLoop, IPool, IPoolManager, ISystemManager } from "./interfaces";
export { IProjectSetup };

interface IProjectSetup {
    GameLoop: IGameLoop;
    SystemManager: ISystemManager;
    PoolManager: IPoolManager;
    Utils: any[];
}
