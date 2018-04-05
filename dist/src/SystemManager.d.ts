import { FastIterationMap } from "FastIterationMap";
import { ISystem } from "./interfaces";
export { SystemManager };
declare class SystemManager {
    protected fixedTimeStepSystems: FastIterationMap<string, ISystem>;
    protected nonFixedTimeStepSystems: FastIterationMap<string, ISystem>;
    constructor();
    pushSystem(system: ISystem, fixedTimeStep?: boolean): string;
    insertAround(systemMiddleId: string, systemBefore: ISystem, systemAfter: ISystem): [string, string];
    remove(systemId: string): boolean;
    getFixedTSSystems(): ISystem[];
    getNonFixedTSSystems(): ISystem[];
    get(systemId: string): ISystem;
    protected generateId(system: ISystem): string;
    protected getListOfSystemId(className: string): string[];
    protected orderSystem(): void;
}
