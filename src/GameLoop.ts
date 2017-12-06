import { ISystem } from "../dist/src/interfaces";

export  { GameLoop };

class GameLoop {
    protected _running = false;
    protected _systems: ISystem[];
    public requestAnimationFrame: Function;
    constructor() {

    }
    protected constructRequestAnimationFrame(){
        this.requestAnimationFrame = () {

        }
    }
    public getCurrentTime() {
        return Date.now();
    }
    public getSystems(): ISystem[] {
        return this._systems;
    }
    public setSystems(systems: ISystem[]) {
        this._systems = systems;
    }
    public start() {
        this._running = true;
        this.run();
    }
    public stop() {
        this._running = false;
    }
    protected run() {
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
    public mainLoop() {
        const l = this._systems.length;
        for(let i =0; i < l; ++i){
            this._systems[i].process();
        }
    }
}
