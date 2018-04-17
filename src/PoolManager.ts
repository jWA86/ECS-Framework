import { FastIterationMap } from "FastIterationMap";
import { IPool } from "./interfaces";
import { IPoolManager } from "./IPoolManager";
import { RANDOM } from "./pollyFill";

export class PoolManager implements IPoolManager {
    protected _pools: FastIterationMap<string, IPool>;
    constructor() {
        this._pools = new FastIterationMap();
    }

    public get(poolId: string): IPool {
        return this._pools.get(poolId);
    }

    public pushPool(pool: IPool): string {
        const id = this.generateId(pool);
        this._pools.set(id, pool);
        return id;
    }

    public remove(poolId: string): boolean {
        return this._pools.delete(poolId);
    }

    protected generateId(pool: IPool): string {
        return pool.type + RANDOM.integer(100000);
    }
}
