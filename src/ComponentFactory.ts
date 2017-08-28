import { IComponent, IComponentFactory, ITogglableComponent, ITogglableComponentFactory } from "./interfaces";
import { FastIterationMap } from "../lib/fastIterationMap/src/FastIterationMap";

export { ComponentFactory, TogglableComponentFactory }

class ComponentFactory<T extends IComponent> extends FastIterationMap<string, T> implements IComponentFactory<T> {
    constructor() { super(); }

    createComponent(componentType: { new(entityId: string, ...args: any[]): T }, entityId: string, ...args: any[]): T {
        let t = new componentType(entityId, ...args);
        this.set(t.entityId, t);
        return t;
    }

    createComponentAfter(componentType: { new(entityId: string, ...args: any[]): T }, entityId: string, afterEId: string, ...args: any[]): T {
        let t = new componentType(entityId, ...args);
        this.insertAfter(t.entityId, t, afterEId);
        return t;
    }

    createComponentBefore(componentType: { new(entityId: string, ...args: any[]): T }, entityId: string, beforeEId: string, ...args: any[]): T {
        let t = new componentType(entityId, ...args);
        this.insertBefore(t.entityId, t, beforeEId);
        return t;
    }

    getComponent(entityId: string): T {
        return this.get(entityId);
    }

    removeComponent(entityId: string): boolean {
        return this.delete(entityId);
    }

    removeAll() {
        this.clear();
    }
}

class TogglableComponentFactory<T extends ITogglableComponent> extends ComponentFactory<T> implements ITogglableComponentFactory<T> {
    constructor() {
        super();
    }
    activate(entityId: string, value: boolean) {
        this.get(entityId).active = value;
    }
}