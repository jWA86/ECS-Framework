import { IFrameEvent, ISystem } from "../src/interfaces";

export  { FrameEvent, GameLoop };

class FrameEvent implements IFrameEvent {
    public count: number;
    public delta: number;
    public loopCount: number;
    public reverse: boolean;
    constructor(public time = Date.now()) {
        this.count = 0;
        this.loopCount = 0;
        this.delta = 0;
        this.reverse = false;
    }
}

class GameLoop {
    protected requestAnimationFrame: Function;
    protected cancelAnimationFrame: Function;
    protected _running = false;
    protected _systems: ISystem[];
    protected _frameId: number;
    protected _currentTimer: IFrameEvent;
    constructor() {
        this.pollyFillAnimationFrame();
        this._currentTimer = new FrameEvent(0);
    }

    public isRunning(): boolean {
        return this._running;
    }
    public getSystems(): ISystem[] {
        return this._systems;
    }
    public getCurrentTimer(): IFrameEvent {
        return this._currentTimer;
    }
    public setSystems(systems: ISystem[]) {
        this._systems = systems;
    }
    public start(timer = new FrameEvent()) {
        this._running = true;
        this._currentTimer = timer;
        // this.update(timer);
    }
    public stop() {
        this._running = false;
        this.cancelAnimationFrame(this._frameId);
    }
    public update(timer: IFrameEvent = new FrameEvent()) {
        var timestep = 1000 / 60;
        let delta = 0;
        let lastFrameTimeMs = 0;
        function mainLoop(timestamp) {
            // ...

            // Track the accumulated time that hasn't been simulated yet
            delta += timestamp - lastFrameTimeMs; // note += here
            lastFrameTimeMs = timestamp;

            // Simulate the total elapsed time in fixed-size chunks
            while (delta >= timestep) {
                // update(timestep);
                delta -= timestep;
            }
            // draw();
            this.requestAnimationFrame(mainLoop);
        }
    }
    /* Process every Systems */
    public mainLoop() {
        const l = this._systems.length;
        for (let i = 0; i < l; ++i) {
            this._systems[i].process();
        }
    }

    protected pollyFillAnimationFrame() {
        this.requestAnimationFrame = () => { };
        this.cancelAnimationFrame = () => { };
    }
}
