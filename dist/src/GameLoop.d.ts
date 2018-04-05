import { ISystem } from "../src/interfaces";
import { SystemManager } from "./SystemManager";
export { FrameEvent, IFrameEvent, GameLoop };
interface IFrameEvent {
    delta: number;
    lag: number;
    MS_PER_UPDATE: number;
    lastFrame: number;
    time: number;
}
declare class FrameEvent implements IFrameEvent {
    MS_PER_UPDATE: number;
    delta: number;
    lastFrame: number;
    lag: number;
    time: number;
    constructor(MS_PER_UPDATE: number);
    reset(): void;
}
declare class GameLoop {
    protected _running: boolean;
    protected _systemManager: SystemManager;
    protected _fixedTSSystems: ISystem[];
    protected _nonFixedTSSystems: ISystem[];
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
}
