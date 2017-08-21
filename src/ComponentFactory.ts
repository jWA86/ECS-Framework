import { IComponent, IComponentFactory, ITogglableComponent, ITogglableComponentFactory } from "./interfaces";
import { FastIterationMap } from "../lib/fastIterationMap/src/FastIterationMap";

export { ComponentFactory, TogglableComponentFactory }

class ComponentFactory<T extends IComponent> implements IComponentFactory<T> {
    pool: FastIterationMap<string, T> = new FastIterationMap<string, T>();
    constructor() {}

    createComponent(componentType: { new(entityId: string, ...args: any[]): T }, entityId: string, ...args: any[]): T {
        let t = new componentType(entityId, ...args);
        this.pool.set(t.entityId, t);
        return t;
    }

    getComponent(entityId: string): T {
        return this.pool.get(entityId);
    }

    removeComponent(entityId: string): boolean {
        return this.pool.delete(entityId);
    }

    removeAll() {
        this.pool.clear();
    }

    get size() {
        return this.pool.length;
    }
}

class TogglableComponentFactory<T extends ITogglableComponent> extends ComponentFactory<T> implements ITogglableComponentFactory<T> {
    constructor() {
        super();
    }
    activate(entityId: string, value: boolean){
        this.pool.get(entityId).active = value;
    }
}