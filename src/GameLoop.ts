import { IComponent, IComponentFactory, IFrameEvent, ISystem } from "../src/interfaces";

export  { FrameEvent, GameLoop };

class FrameEvent {
    public lastFrame: number;
    public count: number;
    public delta: number;
    public loopCount: number;
    public reverse: boolean;
    public time: number;
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
    protected requestAnimationFrame: () => number;
    protected cancelAnimationFrame: (frameId: number) => void;
    protected _running: boolean;
    protected _systems: ISystem[];
    protected _frameId: number;
    protected _currentTimer: FrameEvent;
    /* Iteration frequency in mms */
    protected _processFrequency: number;
    constructor(systems: ISystem[], processFrequency = 30) {
        this.setSystems(systems);
        this.pollyFillAnimationFrame();
        this._currentTimer = new FrameEvent();
        this._processFrequency = processFrequency;
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
        this.update();
        // this.update(timer);
    }
    public stop() {
        this._running = false;
        this.cancelAnimationFrame(this._frameId);
    }
    /* Set the process frequency in mms */
    public setFrequency(frequency: number) {
        this._processFrequency = frequency;
    }
    public update() {
        this._currentTimer.lastFrame = Date.now();
        while (this._running) {
            const delta = Date.now() - this._currentTimer.lastFrame;
            if (delta >= this._processFrequency) {
                this._currentTimer.delta = delta;
                this._currentTimer.time += delta;
                this.mainLoop(this._currentTimer);
                this._currentTimer.lastFrame = Date.now();
                this._currentTimer.count += 1;
            }
        }
    }
    /* Process every Systems */
    public mainLoop(timer: FrameEvent) {
        const l = this._systems.length;
        for (let i = 0; i < l; ++i) {
            this._systems[i].process([timer]);
        }
    }

    protected pollyFillAnimationFrame() {
        this.requestAnimationFrame = () => 0;
        this.cancelAnimationFrame = (frameId: number) => { };
    }
}
