interface IComponent {
    id: string;
}

class ComponentFactory<T extends IComponent> {
    pool: T[] = [];
    constructor() {
    }
    createComponent(type: { new(id: string): T }): T {
        let id = this.generateUniqueId();
        let t = new type(id);
        this.insertComponent(t);
        return t;
    }
    createComponentAfter(type: { new(id: string): T }, cId: string): T {
        let index = this.getComponentIndex(cId);
        let id = this.generateUniqueId();
        let t = new type(id);
        this.insertComponent(t, index + 1);
        return t;
    }
    createComponentAt(type: { new(id: string): T }, cId: string): T {
        let index = this.getComponentIndex(cId);
        let id = this.generateUniqueId();
        let t = new type(id);
        this.insertComponent(t, index);
        return t;
    }

    getComponentIndex(id: string): number {
        return this.pool.findIndex((c) => {
            return c.id === id;
        });
    }

    getComponent(id: string): T {
        return this.pool.find((c) => {
            return c.id === id;
        });
    }

    removeComponent(id: string): boolean {
        let index = this.getComponentIndex(id);
        if (index > -1) {
            this.pool.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
    
    removeAll() {
        this.pool = [];
    }

    protected insertComponent(component: T, index = -1): number {
        if (index < 0 || index >= this.pool.length) {
            this.pool.push(component);
            return this.pool.length;
        } else {
            this.pool.splice(index, 0, component);
            return index;
        }
    };

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
export { IComponent, ComponentFactory }