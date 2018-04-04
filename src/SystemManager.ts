import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory, ISystem } from "./interfaces";
export { SystemManager  };

// interface ISystemWithStates {
//     id: string;
//     active: boolean;
//     measureTime: boolean;
//     system: ISystem;
//     perfMeasure: TimeMeasure;
//     setFactories(...args: Array<IComponentFactory<IComponent>>);
//     process(args?: any[]);
// }

// class SystemWithStates implements ISystemWithStates {
//     public active: boolean = true;
//     public perfMeasure: TimeMeasure;
//     public process: (args?: any[]) => void;
//     protected _system: ISystem;
//     protected _id: string;
//     protected _measureTime: boolean = false;
//     constructor(id: string, system: ISystem) {
//         this._id = id;
//         this.perfMeasure = new TimeMeasure(id);
//         this.system = system;
//         this.process = this.processDefault;
//     }
//     public setFactories(...args: Array<IComponentFactory<IComponent>>) {
//         this._system.setFactories(...args);
//     }
//     protected processWithTimeMeasure(args?: any[]) {
//         this.perfMeasure.placeStartMark();
//         this._system.process(args);
//         this.perfMeasure.placeEndingMark();
//         // measure and compute then clear data so we don't use memory since it's run in infinit loop
//         this.perfMeasure.measure();
//         this.perfMeasure.computeData();
//         this.perfMeasure.clearData();
//     }
//     protected processDefault(args?: any[]) {
//         this._system.process(args);
//     }
//     get id(): string {
//         return this._id;
//     }
//     get system(): ISystem {
//         return this._system;
//     }
//     set system(system: ISystem) {
//         this._system = system;
//         this.perfMeasure.buildMark(this._id);
//     }
//     set measureTime(val: boolean) {
//         this._measureTime = val;
//         if (val) {
//             this.process = this.processWithTimeMeasure;
//         } else {
//             this.process = this.processDefault;
//         }
//     }
// }
// renomage necessaire fixed et non fixedTimeStep
// en realité les 2 sont executés en fixedTimeSteps
// seulement l'un est executer plusieurs fois si possible
class SystemManager {
    protected fixedTimeStepSystems: FastIterationMap<string, ISystem>;
    protected nonFixedTimeStepSystems: FastIterationMap<string, ISystem>;
    constructor() {
        this.fixedTimeStepSystems = new FastIterationMap();
        this.nonFixedTimeStepSystems = new FastIterationMap();
    }
    /* Add a system to be processed in fixed time step or at render speed*/
    public pushSystem(system: ISystem, fixedTimeStep: boolean = false): string {
        const id = this.generateId(system);
        // const sysWState = new SystemWithStates(id, system);
        if (fixedTimeStep) {
            this.fixedTimeStepSystems.push(id, system);
        } else {
            this.nonFixedTimeStepSystems.push(id, system);
        }
        return id;
    }

    public insertAround(systemMiddleId: string, systemBefore: ISystem, systemAfter: ISystem): [string, string] {
        if (this.fixedTimeStepSystems.has(systemMiddleId)) {

            const id1 = this.generateId(systemBefore);
            const id2 = this.generateId(systemAfter);

            this.fixedTimeStepSystems.insertAround(systemMiddleId, id1, systemBefore, id2, systemAfter);
            return [id1, id2];
        } else if (this.nonFixedTimeStepSystems.has(systemMiddleId)) {
            const id1 = this.generateId(systemBefore);
            const id2 = this.generateId(systemAfter);

            if (this.nonFixedTimeStepSystems.insertAround(systemMiddleId, id1, systemBefore, id2, systemAfter)) {
                return [id1, id2];
            } else {
                return ["", ""];
            }
        }
    }

    public remove(systemId: string): boolean {
        if (!this.fixedTimeStepSystems.delete(systemId)) {
            if (!this.nonFixedTimeStepSystems.delete(systemId)) {
                return false;
            }
        }
        return true;
    }
    public getFixedTSSystems(): ISystem[] {
        return this.fixedTimeStepSystems.values;
    }
    public getNonFixedTSSystems(): ISystem[] {
        return this.nonFixedTimeStepSystems.values;
    }
    /* Get a system by its id.
    /*  return undefined if not found.
    */
    public get(systemId: string): ISystem {
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
        const stringName: string = system.constructor["name"];
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
            // if there is already an instance of this system
            if (k.indexOf(className) === 0) {
                res.push(k);
            }
        });
        this.nonFixedTimeStepSystems.keys.forEach((s, k) => {
            // if there is already an instance of this system
            if (k.indexOf(className) === 0) {
                res.push(k);
            }
        });
        return res;
    }
    protected orderSystem() {

    }
}
