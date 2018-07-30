import { ComponentFactory } from "../ComponentFactory";
import { IComponentFactory } from "../IComponentFactory";
import { IFrameEvent} from "../IFrameEvent";
import { ISystem } from "../ISystem";
import { ISystemManager } from "../ISystemManager";
import { RANDOM, TIMESTAMP } from "../pollyFill";
import { TM_POOL_SIZE } from "./DefaultConfig";
import { ITimeMeasureComponent, ITimeMeasureUtil } from "./ITimeMeasureUtil";
export { TimeMeasureComponent, TimeMeasureSystem, TimeMeasureUtil, TimeMeasureSystemStartMark, TimeMeasureSystemEndMark };

/**
 * Component that holds time measure
 */
class TimeMeasureComponent implements ITimeMeasureComponent {
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
    public entityId: number;
    public active: boolean;
    constructor( public systemId: string, public lastT: number, public minT: number, public maxT: number, public meanT: number, public nbCall: number, public frequency: number = 1000) { }
}

/**
 * Measure time passed between execution of n Systems
 */
class TimeMeasureUtil implements ITimeMeasureUtil {
    public timeMeasurePool: IComponentFactory<TimeMeasureComponent>;
    protected measures = new Map<string, {startSystem: string, endSystem: string, tmComponentId: number}>();
    constructor(public sysManager: ISystemManager, timeMeasurePool?: IComponentFactory<TimeMeasureComponent>) {
        this.timeMeasurePool = timeMeasurePool || new ComponentFactory<TimeMeasureComponent>(TM_POOL_SIZE, new TimeMeasureComponent( "", 0, 0, 0, 0, 0, 0));
     }
    public install(systemIdToMeasure: string): TimeMeasureComponent {
        if (this.measures.has(systemIdToMeasure)) {
            throw Error("the system already have a time measure installed");
        }
        const measureId = systemIdToMeasure;
        const tmC: TimeMeasureComponent = this.timeMeasurePool.create(this.timeMeasurePool.nbCreated + 1, true);
        tmC.systemId = measureId;

        const res = this.sysManager.insertAround(systemIdToMeasure, new TimeMeasureSystemStartMark(tmC), new TimeMeasureSystemEndMark(tmC));

        this.measures.set(measureId, {startSystem: res[0], endSystem: res[1], tmComponentId: tmC.entityId});
        return tmC;
    }
    /**
     * Remove TimeMeasure Systems from the SystemManager and free the TimeMeasure component
     */
    public uninstall(systemId: string) {
        const measure = this.measures.get(systemId);
        this.sysManager.remove(measure.startSystem);
        this.sysManager.remove(measure.endSystem);

        this.timeMeasurePool.free(measure.tmComponentId);
        this.measures.delete(systemId);
    }

    public getMeasures(systemId: string) {
        return TimeMeasureSystem.performance.getEntriesByName(systemId);
    }
}

abstract class TimeMeasureSystem implements ISystem<{}> {
    public static performance = window.performance;
    public active = true;
    protected startMark: string;
    protected endMark: string;
    protected _parameters = {};
    /**
     * @param tmComponent the component used for recording time
     */
    constructor(public tmComponent: TimeMeasureComponent ) {
        this.startMark = "start" + this.tmComponent.systemId;
        this.endMark = "end" + this.tmComponent.systemId;
     }
     /** Not used */
    public get parameters() { return this._parameters; }
    public abstract process(...args: any[]);
    public abstract execute(...args: any[]);
    public setParamSource() {}

    public getMeasures() {
        return TimeMeasureSystem.performance.getEntriesByName(this.tmComponent.systemId);
    }
    /**
     * Set max, min mean and last measure to the TMComponent from the performance.measure data set
     */
    public computeData() {
        const measures = TimeMeasureSystem.performance.getEntriesByName(this.tmComponent.systemId);
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
        l > 0 ? this.tmComponent.lastT = measures[l - 1].duration : this.tmComponent.lastT = undefined;
    }

    public measure() {
        TimeMeasureSystem.performance.measure(this.tmComponent.systemId, this.startMark, this.endMark);
        this.tmComponent.nbCall += 1;
    }

    /**
     * Clear the measure data set
     */
    public clearMeasures() {
        TimeMeasureSystem.performance.clearMeasures(this.tmComponent.systemId);
        this.tmComponent.nbCall = 0;
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
    public process(...args: any[]) {
        TimeMeasureSystem.performance.mark(this.startMark);
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
    public process(...args: any[]) {
       this.execute(args[0]);
    }
    /**
     *  Measure time passed since the start mark and compute statistics if time.lag >= the specified frequency of computation
     */
    public execute(time?: IFrameEvent) {
        TimeMeasureSystem.performance.mark(this.endMark);
        this.measure();
        if ((TIMESTAMP.now() - this.lastUpdate) >= this.tmComponent.frequency) {
            this.computeData();
            this.clearMeasures();
            this.lastUpdate = TIMESTAMP.now();
        }
    }
}
