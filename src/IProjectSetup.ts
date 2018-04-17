import { IGameLoop, IPool, IPoolManager, ISystemManager, IUtil } from "./interfaces";
export { IProjectSetup };

interface IProjectSetup {
    GameLoop: IGameLoop;
    PoolManager: IPoolManager;
    SystemManager: ISystemManager;
    Utils: IUtil[];
    // clear: () => void;
}
