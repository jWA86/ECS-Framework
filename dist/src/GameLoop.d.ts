import { ISystem } from "../src/interfaces";
import { IFrameEvent } from "./IFrameEvent";
import { SystemManager } from "./SystemManager";
export { FrameEvent, GameLoop };
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
    protected _fixedTSSystems: Array<ISystem<any>>;
    protected _nonFixedTSSystems: Array<ISystem<any>>;
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
