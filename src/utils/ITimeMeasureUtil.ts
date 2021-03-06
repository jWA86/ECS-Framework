import { IComponent, IUtil } from "../interfaces";
export { ITimeMeasureComponent, ITimeMeasureUtil };

/**
 * Component that holds time measure
 */
interface ITimeMeasureComponent extends IComponent {

    /** the id of the system being measured */
    systemId: string;
    /** last measured time */
    lastT: number;
    /** minimum time of the measure data set */
    minT: number;
    /** maximum time of the measure data set */
    maxT: number;
    /** mean time of the measure data set */
    meanT: number;
    /** frequency the frequency of lastT, minT, maxT, meanT computation */
    frequency: number;

}

interface ITimeMeasureUtil extends IUtil {
    /**
     * Install marks to measure time of execution of a System
     * @param systemId the System id to measure
     */
    install(systemId: string);
    /**
     * UnInstall marks placed around a System
     * @param systemId the id of the system we want to uninstall the time measure
     */
    uninstall(systemId: string);
}
