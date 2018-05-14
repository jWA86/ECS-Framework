import { ISystem } from "../src/interfaces";
import { IFrameEvent } from "./IFrameEvent";
import { IGameLoop } from "./IGameLoop";
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
declare class GameLoop implements IGameLoop {
    protected _running: boolean;
    protected _systemManager: SystemManager;
    protected _fixedTSSystems: Array<ISystem<any>>;
    protected _nonFixedTSSystems: Array<ISystem<any>>;
    protected _frameId: number;
    protected _currentTimer: FrameEvent;
    constructor(systemManager: SystemManager, timer?: FrameEvent);
    isRunning(): boolean;
    systemManager: SystemManager;
    currentTimer: FrameEvent;
    start(...args: any[]): void;
    pause(): void;
    stop(): void;
    setFrequency(frequency: number): void;
    protected loop(...args: any[]): void;
    protected updateFixedTS(...args: any[]): void;
    protected updateNonFixedTS(...args: any[]): void;
}
