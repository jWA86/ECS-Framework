import { IComponent, IComponentFactory } from "./interfaces";
import { FastHashMap } from "../../benchmark/utils/customHashMap";

class ComponentFactoryFastMap<T extends IComponent> implements IComponentFactory<IComponent> {
    pool:FastHashMap<string, T>;
    constructor() {
        this.pool = new FastHashMap<string, T>();
    }
    createComponent(type: { new(id: string, ...args: any[]): T }, ...args: any[]): T {
        let id = this.generateUniqueId();
        let t = new type(id, ...args);
        this.pool.set(t.id, t);
        return t;
    }

    createComponentAfter(type: { new(id: string, ...args: any[]): T }, cId: string, ...args: any[]): T {
        let id = this.generateUniqueId();
        let t = new type(id, ...args);
        this.pool.insertAfter(t.id, t, cId);
        return t;
    }

    createComponentBefore(type: { new(id: string, ...args: any[]): T }, cId: string, ...args: any[]): T {
        let id = this.generateUniqueId();
        let t = new type(id, ...args);
        this.pool.insertBefore(t.id, t, cId);
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

    /*!
        Math.uuid.js (v1.4)
        http://www.broofa.com
        mailto:robert@broofa.com
        Copyright (c) 2010 Robert Kieffer
        Dual licensed under the MIT and GPL licenses.
    */
    protected generateUniqueId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export { IComponent, ComponentFactoryFastMap }