import { FastIterationMap } from "FastIterationMap";
import { ISystem } from "../src/System";
import { TimeMeasure } from "../src/TimeMeasure";
import { IComponent, IComponentFactory } from "./interfaces";
export { SystemManager, ISystemWithStates };

interface ISystemWithStates {
    id: string;
    active: boolean;
    system: ISystem;
    perfMeasure: TimeMeasure;
    setFactories(...args: Array<IComponentFactory<IComponent>>);
    process(args?: any[]);
}

class SystemWithStates implements ISystemWithStates {
    public active: boolean = true;
    public perfMeasure: TimeMeasure;
    protected _system: ISystem;
    protected _id: string;
    constructor(id: string, system: ISystem) {
        this.perfMeasure = new TimeMeasure(id);
        this.system = system;
    }
    public setFactories(...args: Array<IComponentFactory<IComponent>>) {
        this._system.setFactories(...args);
    }
    public process(args?: any[]) {
        this._system.process(args);
    }
    get id(): string {
        return this._id;
    }
    get system(): ISystem {
        return this._system;
    }
    set system(system: ISystem) {
        this._system = system;
        this.perfMeasure.buildMark(this._id);
    }
}
// renomage necessaire fixed et non fixedTimeStep
// en realité les 2 sont executés en fixedTimeSteps
// seulement l'un est executer plusieurs fois si possible
class SystemManager {
    protected fixedTimeStepSystems: FastIterationMap<string, ISystemWithStates>;
    protected nonFixedTimeStepSystems: FastIterationMap<string, ISystemWithStates>;
    constructor() {
        this.fixedTimeStepSystems = new FastIterationMap();
        this.nonFixedTimeStepSystems = new FastIterationMap();
    }
    /* Add a system to be processed in fixed time step or independently */
    public pushSystem(system: ISystem, fixedTimeStep: boolean): string {
        const id = this.generateId(system);
        const sysWState = new SystemWithStates(id, system);
        if (fixedTimeStep) {
            this.fixedTimeStepSystems.push(id, sysWState);
        } else {
            this.nonFixedTimeStepSystems.push(id, sysWState);
        }
        return id;
    }
    public getFixedTSSystems(): ISystemWithStates[] {
        return this.fixedTimeStepSystems.values;
    }
    public getNonFixedTSSystems(): ISystemWithStates[] {
        return this.nonFixedTimeStepSystems.values;
    }
    /* Get a system by its id.
    /*  return undefined if not found.
    */
    public get(systemId: string): ISystemWithStates {
        if (this.fixedTimeStepSystems.has(systemId)) {
            return this.fixedTimeStepSystems.get(systemId);
        } else if (this.nonFixedTimeStepSystems.has(systemId)) {
            return this.nonFixedTimeStepSystems.get(systemId);
        }
        return undefined;
    }

    /* Generate an Id with the System class name + a number if more than one instance in the SystemManager.
    /* i.e : System, System_1, System_2
    */
    protected generateId(system: ISystem): string {
        const stringName: string = system.constructor.name;
        const nbChar = stringName.length;
        const found = this.getListOfSystemId(stringName);
        if (found.length === 0) {
            return stringName;
        } else {
            // get the max number amound insances found
            let max: number = null;
            found.forEach((k) => {
                // if "_" then there is a number
                const numberIndex = k.indexOf("_");
                if (numberIndex !== -1) {
                    const num: number = Number(k.substring(k.length, numberIndex + 1));
                    if (num > max) {
                        max = num;
                    }
                }
            });
            // found an instance without number
            if (max === null) {
                return stringName + "_" + 1;
            } else {
                max += 1;
                return stringName + "_" + max;
            }
        }
    }

    protected getListOfSystemId(className: string): string[] {
        const res: string[] = [];
        // find all instance name
        this.fixedTimeStepSystems.keys.forEach((s, k) => {
            // if already an instance of this system
            if (k.indexOf(className) === 0) {
                res.push(k);
            }
        });
        this.nonFixedTimeStepSystems.keys.forEach((s, k) => {
            // if already an instance of this system
            if (k.indexOf(className) === 0) {
                res.push(k);
            }
        });
        return res;
    }
    protected orderSystem() {

    }
}
