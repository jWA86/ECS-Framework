import { IComponent, IComponentFactory } from "./interfaces";

class ComponentFactoryMap<T extends IComponent> implements IComponentFactory<IComponent> {
    pool: Map<T> = new Map<T>();
    constructor() {
    }

    createComponent(type: { new(id: string, ...args: any[]): T }, ...args: any[]): T {
        let id = this.generateUniqueId();
        let t = new type(id, args);
        this.insertComponent(t);
        return t;
    }

    createComponentAfter(type: { new(id: string, ...args: any[]): T }, cId: string, ...args: any[]): T {
        let id = this.generateUniqueId();
        let t = new type(id, args);
        this.insertComponent(t, cId, true);
        return t;
    }

    createComponentBefore(type: { new(id: string, ...args: any[]): T }, cId: string, ...args: any[]): T {
        let id = this.generateUniqueId();
        let t = new type(id, args);
        this.insertComponent(t, cId);
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
        return this.pool.size;
    }

    protected insertComponent(component: T, idOfPositionToInsert = "-1", insertAfter = false) {
        if (idOfPositionToInsert === "-1") {
            //if no id of the component to insert at position is provided, insert at the end
            this.pool.set(component.id, component);
        }
        else {
            if (this.pool.has(idOfPositionToInsert)) {
                //create a new map
                //slow
                let nMap = new Map();
                this.pool.forEach((v, k) => {
                    //if key == id of the ref component for position insertion 
                    if (k === idOfPositionToInsert) {
                        if (insertAfter) {
                            nMap.set(k, v);
                            nMap.set(component.id, component);
                        } else {
                            nMap.set(component.id, component);
                            nMap.set(k, v);
                        }
                    } else {
                        nMap.set(k, v);
                    }

                });
                this.pool.removeAll;
                this.pool = nMap;
            }
        }
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

export { IComponent, ComponentFactoryMap }