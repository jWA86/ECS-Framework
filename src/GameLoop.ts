import { ISystem } from "../src/interfaces";
import {IFrameEvent } from "./IFrameEvent";
import { IGameLoop } from "./IGameLoop";
import { TIMESTAMP } from "./pollyFill";
import { SystemManager } from "./SystemManager";

export { FrameEvent, GameLoop };

class FrameEvent implements IFrameEvent {
    public delta: number;
    public lastFrame: number;
    public lag: number;
    public time: number;
    constructor(public MS_PER_UPDATE: number) {
        this.lag = 0;
        this.lastFrame = 0;
        this.time = 0;
    }
    public reset() {
        this.lag = 0;
        this.lastFrame = 0;
        this.time = 0;
    }
}

class GameLoop implements IGameLoop {
    protected _running: boolean;
    protected _systemManager: SystemManager;
    protected _fixedTSSystems: Array<ISystem<any>>;
    protected _nonFixedTSSystems: Array<ISystem<any>>;
    protected _frameId: number;
    protected _currentTimer: FrameEvent;
    constructor(systemManager: SystemManager, timer = new FrameEvent(1000 / 30)) {
        this.systemManager  = systemManager;
        this._currentTimer = timer;
        this._running = false;
    }

    public isRunning(): boolean {
        return this._running;
    }
    public get systemManager(): SystemManager {
        return this._systemManager;
    }
    public set systemManager(systems: SystemManager) {
        this._systemManager = systems;
        this._fixedTSSystems = this._systemManager.getFixedTSSystemsArray();
        this._nonFixedTSSystems = this._systemManager.getNonFixedTSSystemsArray();
    }
    public get currentTimer(): FrameEvent {
        return this._currentTimer;
    }
    public set currentTimer(timer: FrameEvent) {
        this._currentTimer = timer;
    }
    public start(...args: any[]) {
        this._running = true;
        this._currentTimer.lastFrame = TIMESTAMP.now();
        this.loop(...args);
    }
    public pause() {
        this._running = false;
        cancelAnimationFrame(this._frameId);
    }
    public stop() {
        this.pause();
        this._currentTimer.reset();
    }
    /* Set the process frequency in mms */
    public setFrequency(frequency: number) {
        this._currentTimer.MS_PER_UPDATE = frequency;
    }
    protected loop(...args: any[]) {
        const now = TIMESTAMP.now();
        const ellapsed = now - this._currentTimer.lastFrame;
        this._currentTimer.delta = ellapsed;
        this._currentTimer.lastFrame = now;
        this._currentTimer.lag += ellapsed;
        this._currentTimer.time += ellapsed;

        // limit delta max value when browser loose focus and resume ?
        while (this._currentTimer.lag >= this._currentTimer.MS_PER_UPDATE) {
            this.updateFixedTS(...args);
            this._currentTimer.lag -= this._currentTimer.MS_PER_UPDATE;
        }

        this.updateNonFixedTS(...args);

        if (this._running) {
            // is ... args necessary here ?
            this._frameId = requestAnimationFrame(() => this.loop(...args));
        } else {
            cancelAnimationFrame(this._frameId);
        }
    }
    /* Process every Fixed Systems */
    protected updateFixedTS(... args: any[]) {
        const l = this._fixedTSSystems.length;
        for (let i = 0; i < l; ++i) {
            if (this._fixedTSSystems[i].active) {
                this._fixedTSSystems[i].process(this._currentTimer, ...args);
            }
        }
    }

     /* Process every Non Fixed Systems */
     protected updateNonFixedTS(... args: any[]) {
        const l = this._nonFixedTSSystems.length;
        for (let i = 0; i < l; ++i) {
            if (this._nonFixedTSSystems[i].active) {
                this._nonFixedTSSystems[i].process(this._currentTimer, ...args);
            }
        }
    }
}
