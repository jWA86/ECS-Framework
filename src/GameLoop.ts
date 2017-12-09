import "raf";
import { IComponent, IComponentFactory, IFrameEvent, ISystem } from "../src/interfaces";

export { FrameEvent, GameLoop };

class FrameEvent {
    public lastFrame: number;
    public count: number;
    public delta: number;
    public loopCount: number;
    public reverse: boolean;
    public time: number;
    public frequency: number;
    constructor() {
        this.count = 0;
        this.loopCount = 0;
        this.delta = 0;
        this.reverse = false;
        this.lastFrame = 0;
        this.time = 0;
    }
}

class GameLoop {
    // protected requestAnimationFrame;
    // protected cancelAnimationFrame;
    protected _running: boolean;
    protected _systems: ISystem[];
    protected _frameId: number;
    protected _currentTimer: FrameEvent;
    /* Iteration frequency in mms */
    protected _processFrequency: number;
    constructor(systems: ISystem[], processFrequency = 30) {
        this.setSystems(systems);
        // this.pollyFillAnimationFrame();
        this._currentTimer = new FrameEvent();
        this.setFrequency(processFrequency);
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
    public setSystems(systems: ISystem[]) {
        this._systems = systems;
    }
    public start() {
        this._running = true;
        this._currentTimer = new FrameEvent();
        this._currentTimer.lastFrame = Date.now();
        this.loop();
        // this.update(timer);
    }
    public stop() {
        this._running = false;
        cancelAnimationFrame(this._frameId);
    }
    /* Set the process frequency in mms */
    public setFrequency(frequency: number) {
        this._processFrequency = frequency;
        this._currentTimer.frequency = frequency;
    }
    public loop() {
        // this._currentTimer.lastFrame = Date.now();
        const delta = Date.now() - this._currentTimer.lastFrame;
        if (delta >= this._processFrequency) {
            this._currentTimer.delta = delta;
            this._currentTimer.time += delta;
            this.update();
            this._currentTimer.lastFrame = Date.now();
            this._currentTimer.count += 1;
        }
        if (this._running) {
            requestAnimationFrame(() => this.loop());
        }
    }
    /* Process every Systems */
    public update() {
        const l = this._systems.length;
        for (let i = 0; i < l; ++i) {
            this._systems[i].process([this._currentTimer]);
        }
    }

    // protected pollyFillAnimationFrame() {
    //     this.requestAnimationFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : (() => {
    //         let lastTimestamp = Date.now();
    //         return (callback) => {
    //             const now = Date.now();
    //             const timeout = Math.max(0, this._processFrequency - (now - lastTimestamp));
    //             lastTimestamp = now + timeout;
    //             return setTimeout(() => {
    //                 callback(now + timeout);
    //             }, timeout);
    //         };
    //     })(),

    //         this.cancelAnimationFrame = typeof cancelAnimationFrame === "function" ? cancelAnimationFrame : clearTimeout;
    // }
}
