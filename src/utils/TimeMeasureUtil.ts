import { ComponentFactory, IComponentFactory } from "../ComponentFactory";
import { IComponent, SystemManager } from "../entry";
import { FrameEvent} from "../GameLoop";
import { TIMESTAMP } from "../pollyFill";
import { System } from "../System";
import { TM_POOL_SIZE } from "./DefaultConfig";

export { ITimeMeasureUtil, TimeMeasureComponent, TimeMeasureSystem, TimeMeasureUtil, TimeMeasureSystemStartMark, TimeMeasureSystemEndMark };

/**
 * Component that holds time measure
 */
class TimeMeasureComponent implements IComponent {
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
    constructor(public entityId: number, public active: boolean, public measureId: string, public lastT: number, public minT: number, public maxT: number, public meanT: number, public frequency: number) { }
}

interface ITimeMeasureUtil {
    /**
     * Install marks to measure time of execution of a System
     * @param systemId the System id to measure
     */
    install(systemId: string);
    /**
     * UnInstall marks placed around a System
     * @param tmComponent the TimeMeasureComponent
     */
    uninstall(tmComponent: TimeMeasureComponent);
    // placeStartingMark(systemIdToPlaceBefore: string);
    // placeEndingMark(systemIdToPlaceBefore: string);
}

/**
 * Measure time passed between execution of n Systems
 */
class TimeMeasureUtil implements ITimeMeasureUtil {
    public timeMeasurePool: ComponentFactory<TimeMeasureComponent>;
    protected measures = new Map<string, {startSystem: string, endSystem: string}>();
    constructor(public sysManager: SystemManager, timeMeasurePool?: ComponentFactory<TimeMeasureComponent>) {
        this.timeMeasurePool = timeMeasurePool || new ComponentFactory<TimeMeasureComponent>(TM_POOL_SIZE, TimeMeasureComponent, "", 0, 0, 0, 0, 0);
     }
    public install(systemIdToMeasure: string): TimeMeasureComponent {
        // use the system id to measure as the measure id + a random number in case of multiple installation of a TimeMeasure on the same System (no use unless to measure the TM overhead)
        const measureId = systemIdToMeasure + Math.floor((Math.random() * 1000000));
        const tmC = this.timeMeasurePool.create(this.timeMeasurePool.nbCreated + 1, true);
        tmC.measureId = measureId;

        const res = this.sysManager.insertAround(systemIdToMeasure, new TimeMeasureSystemStartMark(tmC), new TimeMeasureSystemEndMark(tmC));

        this.measures.set(measureId, {startSystem: res[0], endSystem: res[1]});
        return tmC;
    }
    /**
     * Remove TimeMeasure Systems from the SystemManager and free the TimeMeasure component
     */
    public uninstall(tmComponent: TimeMeasureComponent) {
        const tmId = tmComponent.measureId;
        const systemIds = this.measures.get(tmId);
        this.sysManager.remove(systemIds.startSystem);
        this.sysManager.remove(systemIds.endSystem);
        this.timeMeasurePool.free(tmComponent.entityId);
        this.measures.delete(tmId);
     }
}

abstract class TimeMeasureSystem extends System {
    public static performance = window.performance;
    protected startMark: string;
    protected endMark: string;
    /**
     * @param tmComponent the component used for recording time
     */
    constructor(public tmComponent: TimeMeasureComponent ) {
        super();
        this.startMark = "start" + this.tmComponent.measureId;
        this.endMark = "end" + this.tmComponent.measureId;
     }
    public getData() {
        return TimeMeasureSystem.performance.getEntriesByName(this.tmComponent.measureId);
    }
}

/**
 * System that place a mark to start the measure of time
 */
class TimeMeasureSystemStartMark extends TimeMeasureSystem {
    /**
     * @param tmComponent the component used for recording time
     */
    constructor(tmComponent: TimeMeasureComponent) { super(tmComponent); }
    /**
     * Place the starting mark
     */
    public process() {
        // TimeMeasureSystem.performance.mark(this.startMark);
        window.performance.mark(this.startMark);
    }
    /**
     * Not used
     */
    public execute() {}
}

class TimeMeasureSystemEndMark extends TimeMeasureSystem {
    public lastUpdate: number = 0;
    constructor(tmComponent: TimeMeasureComponent) { super(tmComponent); }
    /**
     * @param args first args have to be a FrameEvent object
     */
    public process(args: any[]) {
       this.execute(args[0]);
    }
    /**
     *  Measure time passed since the start mark and compute statistics if time.lag >= the specified frequency of computation
     * @param time FrameEvent used to decide when to compute data
     */
    public execute(time: FrameEvent) {
        TimeMeasureSystem.performance.mark(this.endMark);
        this.measure();
        if ((TIMESTAMP.now() - this.lastUpdate) >= this.tmComponent.frequency) {
            this.computeData();
            this.clearData();
            this.lastUpdate = TIMESTAMP.now();
        }
    }
    public measure() {
        TimeMeasureSystem.performance.measure(this.tmComponent.measureId, this.startMark, this.endMark);
    }
    /**
     * Set max, min mean and last measure to the TMComponent from the performance.measure data set
     */
    public computeData() {
        const measures = TimeMeasureSystem.performance.getEntriesByName(this.tmComponent.measureId);
        const l = measures.length;
        let min = Number.MAX_VALUE;
        let max = 0;
        let mean = 0;
        for (let i = 0; i < l; ++i) {
            const d = measures[i].duration;
            if (d < min) {
                min = d;
            }
            if (d > max) {
                max = d;
            }
            mean += d;
        }
        mean /= l;
        this.tmComponent.meanT = mean;
        this.tmComponent.maxT = max;
        this.tmComponent.minT = min;
        this.tmComponent.lastT = measures[l - 1].duration;
    }
    /**
     * Clear the measure data set
     */
    public clearData() {
        TimeMeasureSystem.performance.clearMeasures(this.tmComponent.measureId);
    }
}
