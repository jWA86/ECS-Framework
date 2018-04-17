import { IPool } from "./interfaces";
export { IPoolManager };

interface IPoolManager {
    get: (poolId: string) => IPool;
    pushPool(pool: IPool): string;
    remove(poolId: string): boolean;
}
