import {IComponent, ComponentFactory} from "./ComponentFactory";
interface IHierarchicalComponent extends IComponent {
    children: string[];
}

class HierarchicalComponentFactory<T extends IHierarchicalComponent> extends ComponentFactory<T> {

    createChildComponent(type: { new(id: string): T }, parentId: string): T {
        let index = this.getComponentIndex(parentId);
        let id = this.generateUniqueId();
        let t = new type(id);
        if (index > -1) {
            let nbChild = this.pool[index].children.length;
            this.pool[index].children.push(id);
            //insert as last child
            this.insertComponent(t, index + nbChild + 1);
        }
        else {
            this.insertComponent(t, index + 1);
        }
        return t;
    }

    removeComponent(id: string, removeChildren = false): boolean {
        let parentC = this.getComponent(id);
        if (parentC) {
            //remove children first
            if (removeChildren) {
                for (let i = 0; i < parentC.children.length; ++i) {
                    this.removeComponent(parentC.children[i], true);
                }
            }
            super.removeComponent(parentC.id);
            return true;
        }
        return false;
    }
}

export  {HierarchicalComponentFactory, IHierarchicalComponent}