import { IComponent } from "../../../../src/interfaces"
import * as bezier from "../../../../node_modules/bezier-easing/dist/bezier-easing.js"
export { PlaybackState, IFrameEvent, IKeyFrame, IKeyFrameController, KeyFrameControllerComponent  }
export {bezier}

enum PlaybackState {
    //first update flag to start
    "started",
    //next will be in playing flag for the whole duration
    "playing",
    // ended once it reach the end of a timeline
    "ended",
    // next will be in stopped until it's start again
    "stopped",
    "paused",
}

interface IFrameEvent {
    count: number; //the number of times the frame event was fired
    delta: number; //the time passed in seconds since the last frame event
    loopCount: number;
    reverse: boolean;
    time: number; //the total amount of time passed since the first frame event in seconds
}

interface IKeyFrame {
    from: number;
    duration: number;
    easing:Easing;
}

interface IKeyFrameController {
    progress: number; // 0 to 1
    playState: PlaybackState;
    timer: IFrameEvent;
    cycling: boolean;
    fadeLoop: boolean;
    nbLoop: number; // 0 = infinit 
}

class KeyFrameControllerComponent implements IKeyFrameController, IKeyFrame, IComponent {
    public nbLoop:number = 1;
    public progress:number = 0;
    public playState: PlaybackState = PlaybackState.stopped;
    public timer: IFrameEvent = {'count':0, 'delta':0, 'loopCount':0, 'reverse': false, 'time':0};
    public cycling:boolean = false;
    public fadeLoop: boolean = false;
    constructor(public entityId, public active, public from:number, public duration:number, public easing:Easing = bezier(0.0, 0.0, 1.0, 1.0)) {
        duration < 1 ? this.duration = 1 : this.duration = duration;
    }
}

