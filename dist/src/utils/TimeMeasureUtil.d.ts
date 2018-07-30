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
    systemId: string;
    lastT: number;
    minT: number;
    maxT: number;
    meanT: number;
    nbCall: number;
    frequency: number;
    /**
     * @param entityId
     * @param active
     * @param systemId the id of the system being measured
     * @param lastT last measured time
     * @param minT minimum time of the measure data set
     * @param maxT maximum time of the measure data set
     * @param meanT mean time of the measure data set
     * @param frequency the frequency at which to sample
     */
    entityId: number;
    active: boolean;
    constructor(systemId: string, lastT: number, minT: number, maxT: number, meanT: number, nbCall: number, frequency?: number);
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
        tmComponentId: number;
    }>;
    constructor(sysManager: ISystemManager, timeMeasurePool?: IComponentFactory<TimeMeasureComponent>);
    install(systemIdToMeasure: string): TimeMeasureComponent;
    /**
     * Remove TimeMeasure Systems from the SystemManager and free the TimeMeasure component
     */
    uninstall(systemId: string): void;
    getMeasures(systemId: string): any;
}
declare abstract class TimeMeasureSystem implements ISystem<{}> {
    tmComponent: TimeMeasureComponent;
    static performance: Performance;
    active: boolean;
    protected startMark: string;
    protected endMark: string;
    protected _parameters: {};
    /**
     * @param tmComponent the component used for recording time
     */
    constructor(tmComponent: TimeMeasureComponent);
    /** Not used */
    readonly parameters: {};
    abstract process(...args: any[]): any;
    abstract execute(...args: any[]): any;
    setParamSource(): void;
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
     */
    execute(time?: IFrameEvent): void;
}
