interface IComponent {
    id: string;
}

interface IComponentFactory {
    pool;
    getComponent(string):IComponent;
    createComponent(IComponent):IComponent;
    createComponentBefore(IComponent, string):IComponent;
    createComponentAfter(IComponent, string):IComponent;
    removeComponent(string):boolean;
    removeAll();
    size:number;
}
export {IComponent, IComponentFactory}