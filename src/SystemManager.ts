import { FastIterationMap, IFastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory, ISystem } from "./interfaces";
import { ISystemManager } from "./ISystemManager";
import { RANDOM } from "./pollyFill";
export { SystemManager  };

// fixedTimeStep = frame independant // https://docs.unity3d.com/Manual/class-TimeManager.html
// nonFixedTimeStep = update as much as possible between frame
class SystemManager implements ISystemManager {
    protected fixedTimeStepSystems: FastIterationMap<string, ISystem<any>>;
    protected nonFixedTimeStepSystems: FastIterationMap<string, ISystem<any>>;
    constructor() {
        this.fixedTimeStepSystems = new FastIterationMap();
        this.nonFixedTimeStepSystems = new FastIterationMap();
    }
    /* Add a system to be processed in fixed time step or at render speed*/
    public pushSystem(system: ISystem<any>, fixedTimeStep: boolean = false): string {
        const id = this.generateId(system);
        // const sysWState = new SystemWithStates(id, system);
        if (fixedTimeStep) {
            this.fixedTimeStepSystems.push(id, system);
        } else {
            this.nonFixedTimeStepSystems.push(id, system);
        }
        return id;
    }

    public insertAround(systemMiddleId: string, systemBefore: ISystem<any>, systemAfter: ISystem<any>): [string, string] {
        let id1 = "";
        let id2 = "";
        id1 = this.generateId(systemBefore);
        id2 = this.generateId(systemAfter);
        // case the 2 sytems to insert are of the same class
        // generateId will be the same
        if (id1 === id2) {
            // add a random number to the id of id2
            // should be ok ...
            id2 = id2 + "_" + RANDOM.integer(100000);
        }
        if (this.fixedTimeStepSystems.has(systemMiddleId)) {

            this.fixedTimeStepSystems.insertAround(systemMiddleId, id1, systemBefore, id2, systemAfter);
            return [id1, id2];
        } else if (this.nonFixedTimeStepSystems.has(systemMiddleId)) {
            this.nonFixedTimeStepSystems.insertAround(systemMiddleId, id1, systemBefore, id2, systemAfter);
            return [id1, id2];
        } else {
            return ["", ""];
        }
    }

    public insertAfter(systemRefId: string, systemToInsert: ISystem<any>): string {
        let id = "";
        if (this.fixedTimeStepSystems.has(systemRefId)) {
            id = this.generateId(systemToInsert);
            this.fixedTimeStepSystems.insertAfter(id, systemToInsert, systemRefId);
        } else if (this.nonFixedTimeStepSystems.has(systemRefId)) {
            id = this.generateId(systemToInsert);
            this.nonFixedTimeStepSystems.insertAfter(id, systemToInsert, systemRefId);
        }
        return id;
    }

    public insertBefore(systemRefId: string, systemToInsert: ISystem<any>): string {
        let id = "";
        if (this.fixedTimeStepSystems.has(systemRefId)) {
            id = this.generateId(systemToInsert);
            this.fixedTimeStepSystems.insertBefore(id, systemToInsert, systemRefId);
        } else if (this.nonFixedTimeStepSystems.has(systemRefId)) {
            id = this.generateId(systemToInsert);
            this.nonFixedTimeStepSystems.insertBefore(id, systemToInsert, systemRefId);
        }
        return id;
    }

    public remove(systemId: string): boolean {
        if (!this.fixedTimeStepSystems.delete(systemId)) {
            if (!this.nonFixedTimeStepSystems.delete(systemId)) {
                return false;
            }
        }
        return true;
    }
    // public getFixedTSSystems(): IFastIterationMap<string, ISystem<any>> {
    //     return this.fixedTimeStepSystems;
    // }
    // public getNonFixedTSSystems(): IFastIterationMap<string, ISystem<any>>  {
    //     return this.nonFixedTimeStepSystems;
    // }

    public getFixedTSSystemsArray(): Array<ISystem<any>> {
        return this.fixedTimeStepSystems.values;
    }
    public getNonFixedTSSystemsArray(): Array<ISystem<any>> {
        return this.nonFixedTimeStepSystems.values;
    }
    /* Get a system by its id.
    /*  return undefined if not found.
    */
    public get(systemId: string): ISystem<any> {
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
    protected generateId(system: ISystem<any>): string {
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
}
