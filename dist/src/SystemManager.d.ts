import { FastIterationMap } from "FastIterationMap";
import { ISystem } from "./interfaces";
import { ISystemManager } from "./ISystemManager";
export { SystemManager };
declare class SystemManager implements ISystemManager {
    protected fixedTimeStepSystems: FastIterationMap<string, ISystem<any>>;
    protected nonFixedTimeStepSystems: FastIterationMap<string, ISystem<any>>;
    constructor();
    pushSystem(system: ISystem<any>, fixedTimeStep?: boolean): string;
    insertAround(systemMiddleId: string, systemBefore: ISystem<any>, systemAfter: ISystem<any>): [string, string];
    insertAfter(systemRefId: string, systemToInsert: ISystem<any>): string;
    insertBefore(systemRefId: string, systemToInsert: ISystem<any>): string;
    remove(systemId: string): boolean;
    getFixedTSSystems(): Array<ISystem<any>>;
    getNonFixedTSSystems(): Array<ISystem<any>>;
    get(systemId: string): ISystem<any>;
    protected generateId(system: ISystem<any>): string;
    protected getListOfSystemId(className: string): string[];
}
