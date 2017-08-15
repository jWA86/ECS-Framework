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

    createComponentAfter(componentType: { new(entityId: string, ...args: any[]): T }, entityId: string, afterEId: string, ...args: any[]): T {
        let t = new componentType(entityId, ...args);
        this.pool.insertAfter(t.entityId, t, afterEId);
        return t;
    }

    createComponentBefore(componentType: { new(entityId: string, ...args: any[]): T }, entityId: string, beforeEId: string, ...args: any[]): T {
        let t = new componentType(entityId, ...args);
        this.pool.insertBefore(t.entityId, t, beforeEId);
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

class paralleleComponentFactory<T extends ITogglableComponent> extends ComponentFactory<T> implements IComponentFactory<T> {
    
    constructor(public factories:ITogglableComponentFactory<T>[]){
        super();
    }
    // overwrite all methode so it make change to all children factories

    // sort pool ?
    // set active in one pool and move other in another pool
    // inactivePool: FastIteMap<string, T> = new FastIteMap<string, T>();
    // is it faster to iterate a pool and computer only when active comp are encounter (if(activate)then computer)
    // or computer only active component in a sorted array (active first, the stop when inactive are encounter)
    // or computer a array with only active component (inactive are moved in an other array) 
    activate() {

    }
}