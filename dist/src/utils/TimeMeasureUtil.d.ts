import { ComponentFactory } from "../ComponentFactory";
import { IComponent, SystemManager } from "../entry";
import { FrameEvent } from "../GameLoop";
import { System } from "../System";
export { ITimeMeasureUtil, TimeMeasureComponent, TimeMeasureSystem, TimeMeasureUtil, TimeMeasureSystemStartMark, TimeMeasureSystemEndMark };
/**
 * Component that holds time measure
 */
declare class TimeMeasureComponent implements IComponent {
    entityId: number;
    active: boolean;
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
    constructor(entityId: number, active: boolean, measureId: string, lastT: number, minT: number, maxT: number, meanT: number, frequency: number);
}
interface ITimeMeasureUtil {
    /**
     * Install marks to measure time of execution of a System
     * @param systemId the System id to measure
     */
    install(systemId: string): any;
    /**
     * UnInstall marks placed around a System
     * @param tmComponent the TimeMeasureComponent
     */
    uninstall(tmComponent: TimeMeasureComponent): any;
}
/**
 * Measure time passed between execution of n Systems
 */
declare class TimeMeasureUtil implements ITimeMeasureUtil {
    sysManager: SystemManager;
    timeMeasurePool: ComponentFactory<TimeMeasureComponent>;
    protected measures: Map<string, {
        startSystem: string;
        endSystem: string;
    }>;
    constructor(sysManager: SystemManager, timeMeasurePool?: ComponentFactory<TimeMeasureComponent>);
    install(systemIdToMeasure: string): TimeMeasureComponent;
    /**
     * Remove TimeMeasure Systems from the SystemManager and free the TimeMeasure component
     */
    uninstall(tmComponent: TimeMeasureComponent): void;
}
declare abstract class TimeMeasureSystem extends System {
    tmComponent: TimeMeasureComponent;
    static performance: Performance;
    protected startMark: string;
    protected endMark: string;
    /**
     * @param tmComponent the component used for recording time
     */
    constructor(tmComponent: TimeMeasureComponent);
    getData(): any;
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
    process(): void;
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
    process(args: any[]): void;
    /**
     *  Measure time passed since the start mark and compute statistics if time.lag >= the specified frequency of computation
     * @param time FrameEvent used to decide when to compute data
     */
    execute(time: FrameEvent): void;
    measure(): void;
    /**
     * Set max, min mean and last measure to the TMComponent from the performance.measure data set
     */
    computeData(): void;
    /**
     * Clear the measure data set
     */
    clearData(): void;
}
