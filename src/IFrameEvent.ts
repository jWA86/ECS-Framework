export { IFrameEvent };
/* Object that holds time data between frame update */
interface IFrameEvent {
    /* time difference since last frame */
    delta: number;
    /* time before next render frame */
    lag: number;
    /* frequency of update */
    MS_PER_UPDATE: number;
    /* time the last frame was fired */
    lastFrame: number;
    /* time passed since the start of the game loop */
    time: number;
    state: "running" | "paused" | "idle";
}
