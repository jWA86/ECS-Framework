interface IComponent {
    id: string;
}

interface IComponentFactory<T extends IComponent> {
    pool;
    getComponent(string):T;
    createComponent(IComponent, ...args:any[]):T;
    createComponentBefore(IComponent, string, ...args:any[]):T;
    createComponentAfter(IComponent, string, ...args:any[]):T;
    removeComponent(string):boolean;
    removeAll();
    size:number;
}
export {IComponent, IComponentFactory}