import { FastIterationMap } from "FastIterationMap";
import { IPool } from "./interfaces";
import { IPoolManager } from "./IPoolManager";
export declare class PoolManager implements IPoolManager {
    protected _pools: FastIterationMap<string, IPool>;
    constructor();
    get(poolId: string): IPool;
    pushPool(pool: IPool): string;
    remove(poolId: string): boolean;
    protected generateId(pool: IPool): string;
}
