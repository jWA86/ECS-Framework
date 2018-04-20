import { IComponentFactory } from "../IComponentFactory";
import { IFrameEvent } from "../IFrameEvent";
import { ISystem } from "../ISystem";
import { ISystemManager } from "../ISystemManager";
import { ITimeMeasureComponent, ITimeMeasureUtil } from "./ITimeMeasureUtil";
export { TimeMeasureComponent, TimeMeasureSystem, TimeMeasureUtil, TimeMeasureSystemStartMark, TimeMeasureSystemEndMark };
/**
 * Component that holds time measure
 */
declare class TimeMeasureComponent implements ITimeMeasureComponent {
    measureId: string;
    lastT: number;
    minT: number;
    maxT: number;
    meanT: number;
    frequency: number;
    /**
     * @param entityId
     * @param active
     * @param measureId string to identify the measure
     * @param lastT last measured time
     * @param minT minimum time of the measure data set
     * @param maxT maximum time of the measure data set
     * @param meanT mean time of the measure data set
     * @param frequency the frequency of minT, maxT, meanT computation
     */
    entityId: number;
    active: boolean;
    constructor(measureId: string, lastT: number, minT: number, maxT: number, meanT: number, frequency?: number);
}
/**
 * Measure time passed between execution of n Systems
 */
declare class TimeMeasureUtil implements ITimeMeasureUtil {
    sysManager: ISystemManager;
    timeMeasurePool: IComponentFactory<TimeMeasureComponent>;
    protected measures: Map<string, {
        startSystem: string;
        endSystem: string;
    }>;
    constructor(sysManager: ISystemManager, timeMeasurePool?: IComponentFactory<TimeMeasureComponent>);
    install(systemIdToMeasure: string): TimeMeasureComponent;
    /**
     * Remove TimeMeasure Systems from the SystemManager and free the TimeMeasure component
     */
    uninstall(tmComponent: TimeMeasureComponent): void;
    getMeasures(tmComponent: TimeMeasureComponent): any;
}
declare abstract class TimeMeasureSystem implements ISystem<void> {
    tmComponent: TimeMeasureComponent;
    static performance: Performance;
    active: boolean;
    protected startMark: string;
    protected endMark: string;
    /**
     * @param tmComponent the component used for recording time
     */
    constructor(tmComponent: TimeMeasureComponent);
    /** Not used */
    abstract process(...args: any[]): any;
    getMeasures(): any;
    /**
     * Set max, min mean and last measure to the TMComponent from the performance.measure data set
     */
    computeData(): void;
    measure(): void;
    /**
     * Clear the measure data set
     */
    clearMeasures(): void;
}
/**
 * System that place a mark to start the measure of time
 */
declare class TimeMeasureSystemStartMark extends TimeMeasureSystem {
    /**
     * @param tmComponent the component used for recording time
     */
    constructor(tmComponent: TimeMeasureComponent);
    /**
     * Place the starting mark
     */
    process(...args: any[]): void;
    /**
     * Not used
     */
    execute(): void;
}
declare class TimeMeasureSystemEndMark extends TimeMeasureSystem {
    lastUpdate: number;
    constructor(tmComponent: TimeMeasureComponent);
    /**
     * @param args first args have to be a FrameEvent object
     */
    process(...args: any[]): void;
    /**
     *  Measure time passed since the start mark and compute statistics if time.lag >= the specified frequency of computation
     * @param time FrameEvent used to decide when to compute data
     */
    execute(time: IFrameEvent): void;
}
