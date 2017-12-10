import "raf";
import { IComponent, IComponentFactory, IFrameEvent, ISystem } from "../src/interfaces";

export { FrameEvent, GameLoop };

class FrameEvent {
    public lastFrame: number;
    public delta: number;
    public time: number;
    constructor(public frequency: number) {
        this.delta = 0;
        this.lastFrame = 0;
        this.time = 0;
    }
    public reset() {
        this.delta = 0;
        this.lastFrame = 0;
        this.time = 0;
    }
}

class GameLoop {
    public timestamp = this._pollyFillHighResolutionTime();
    protected _running: boolean;
    protected _systems: ISystem[];
    protected _activeSystems: ISystem[];
    protected _frameId: number;
    protected _currentTimer: FrameEvent;
    constructor(systems: ISystem[], timer = new FrameEvent(1000 / 30)) {
        this.setSystems(systems);
        this._currentTimer = timer;
        this._running = false;
    }

    public isRunning(): boolean {
        return this._running;
    }
    public getSystems(): ISystem[] {
        return this._systems;
    }
    public getCurrentTimer(): FrameEvent {
        return this._currentTimer;
    }
    public setCurretnTimer(timer: FrameEvent) {
        this._currentTimer = timer;
    }
    public setSystems(systems: ISystem[]) {
        this._systems = systems;
    }
    public start() {
        this._running = true;
        this._currentTimer.reset();
        this._currentTimer.lastFrame = this.timestamp.now();
        this.loop();
        // this.update(timer);
    }
    public stop() {
        this._running = false;
        cancelAnimationFrame(this._frameId);
    }
    public resume() {
        this._running = true;
        this._currentTimer.lastFrame = this.timestamp.now();
        this.loop();
    }
    /* Set the process frequency in mms */
    public setFrequency(frequency: number) {
        this._currentTimer.frequency = frequency;
    }
    public loop() {
        const now = this.timestamp.now();
        let delta = now - this._currentTimer.lastFrame;
        this._currentTimer.time += delta;
        // limit delta max value when browser loose focus and resume ?
        while (delta >= this._currentTimer.frequency) {
            this._currentTimer.delta = delta;
            this.update();
            this._currentTimer.lastFrame = now;
            delta -= this._currentTimer.frequency;
        }
        if (this._running) {
            this._frameId = requestAnimationFrame(() => this.loop());
        } else {
            cancelAnimationFrame(this._frameId);
        }
    }
    /* Process every Systems */
    public update() {
        const l = this._systems.length;
        for (let i = 0; i < l; ++i) {
            this._systems[i].process([this._currentTimer]);
        }
    }
    protected _pollyFillHighResolutionTime() {
        return window.performance && window.performance.now ? window.performance : Date;
    }
}
