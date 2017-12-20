import "raf";
import { ISystemWithStates, SystemManager } from "./SystemManager";
export { FrameEvent, IFrameEvent, GameLoop };
interface IFrameEvent {
    lag: number;
    frequency: number;
    lastFrame: number;
    time: number;
}
declare class FrameEvent implements IFrameEvent {
    frequency: number;
    lastFrame: number;
    lag: number;
    time: number;
    constructor(frequency: number);
    reset(): void;
}
declare class GameLoop {
    timestamp: Performance | DateConstructor;
    protected _running: boolean;
    protected _systemManager: SystemManager;
    protected _fixedTSSystems: ISystemWithStates[];
    protected _nonFixedTSSystems: ISystemWithStates[];
    protected _frameId: number;
    protected _currentTimer: FrameEvent;
    constructor(systemManager: SystemManager, timer?: FrameEvent);
    isRunning(): boolean;
    getSystemManager(): SystemManager;
    getCurrentTimer(): FrameEvent;
    setCurretnTimer(timer: FrameEvent): void;
    setSystemManager(systems: SystemManager): void;
    start(...args: any[]): void;
    stop(): void;
    resume(): void;
    setFrequency(frequency: number): void;
    loop(...args: any[]): void;
    updateFixedTS(...args: any[]): void;
    updateNonFixedTS(...args: any[]): void;
    protected _pollyFillHighResolutionTime(): Performance | DateConstructor;
}
