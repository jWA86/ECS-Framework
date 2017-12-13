import { FastIterationMap } from "FastIterationMap";
import { ISystem } from "../src/System";

export { SystemManager };
// ECS should get interfaces from the file that implements it
// interfaces.ts is for external project convenience
class SystemManager {
    protected fixedTimeStepSystems: FastIterationMap<string, ISystem>;
    protected nonFixedTimeStepSystems: FastIterationMap<string, ISystem>;
    constructor() {
        this.fixedTimeStepSystems = new FastIterationMap();
        this.nonFixedTimeStepSystems = new FastIterationMap();
    }
    public addSystem(system: ISystem, fixedTimeStep: boolean): number {
        const id = this.generateId(system);
        if (fixedTimeStep) {
            this.fixedTimeStepSystems.push(id, system);
        } else {
            this.nonFixedTimeStepSystems.push(id, system);
        }
        return id;
    }
    /* Generate an Id with the System class name + a number if more than one instance in the SystemManager.
    /* i.e : System, System_1, System_2
    */
    protected generateId(system: ISystem): string {
        const stringName: string = system.constructor.name;
        const nbChar = stringName.length;
        const found: string[] = [];
        // find all instance name
        this.fixedTimeStepSystems.keys.forEach((s, k) => {
            // if already an instance of this system
            if (k.indexOf(stringName) === 0) {
                found.push(k);
            }
        });
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
}
