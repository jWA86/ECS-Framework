import { ISystem } from "./ISystem";

export { ISystemManager };

interface ISystemManager {
    get(systemId: string): ISystem;
    insertAfter(systemRefId: string, systemToInsert: ISystem);
    insertAround(systemMiddleId: string, systemBefore: ISystem, systemAfter: ISystem);
    insertBefore(systemRefId: string, systemToInsert: ISystem);
    pushSystem(system: ISystem);
    remove(systemId: string): boolean;
}
