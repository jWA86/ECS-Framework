import { IComponent, IComponentFactory } from "./../interfaces";
import { FastIteMap } from "../../../lib/fastIterationMap/src/fastIteMap";

class ComponentFactory<T extends IComponent> implements IComponentFactory<IComponent> {
    pool:FastIteMap<string, T>;
    constructor() {
        this.pool = new FastIteMap<string, T>();
    }
    createComponent(type: { new(id: string, ...args: any[]): T }, id:string, ...args: any[]): T {
        let t = new type(id, ...args);
        this.pool.set(t.id, t);
        return t;
    }

    createComponentAfter(type: { new(id: string, ...args: any[]): T }, id:string, afterEId: string, ...args: any[]): T {
        let t = new type(id, ...args);
        this.pool.insertAfter(t.id, t, afterEId);
        return t;
    }

    createComponentBefore(type: { new(id: string, ...args: any[]): T }, id:string, beforeEId: string, ...args: any[]): T {
        let t = new type(id, ...args);
        this.pool.insertBefore(t.id, t, beforeEId);
        return t;
    }

    getComponent(id: string): T {
        return this.pool.get(id);
    }

    removeComponent(id: string): boolean {
       return this.pool.delete(id);
    }

    removeAll() {
        this.pool.clear();
    }

    get size() {
        return this.pool.length;
    }
}

export { IComponent, ComponentFactory}