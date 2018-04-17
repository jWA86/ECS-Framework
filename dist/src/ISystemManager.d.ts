import { ISystem } from "./ISystem";
export { ISystemManager };
interface ISystemManager {
    get(systemId: string): ISystem<any>;
    insertAfter(systemRefId: string, systemToInsert: ISystem<any>): any;
    insertAround(systemMiddleId: string, systemBefore: ISystem<any>, systemAfter: ISystem<any>): any;
    insertBefore(systemRefId: string, systemToInsert: ISystem<any>): any;
    pushSystem(system: ISystem<any>): string;
    remove(systemId: string): boolean;
}
