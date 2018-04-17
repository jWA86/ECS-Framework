import { IFrameEvent, ISystemManager } from "./interfaces";
export { IGameLoop };

interface IGameLoop {
    start: (...args: any[]) => void;
    stop: () => void;
    resume: () => void;
    systemManager: ISystemManager;
    currentTimer: IFrameEvent;
}
