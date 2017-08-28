export { IComponent, ITogglableComponent, IComponentFactory, ITogglableComponentFactory}

interface IComponent {
    entityId: string;
}

interface ITogglableComponent extends IComponent {
    active: boolean;
}

interface IComponentFactory<T extends IComponent> {
    getComponent(entityId: string): T;
    createComponent(componentType: { new(entityId: string, ...args: any[]): T }, ...args: any[]): T;
    createComponentBefore(componentType: { new(entityId: string, ...args: any[]): T }, entityId: string, ...args: any[]): T;
    createComponentAfter(componentType: { new(entityId: string, ...args: any[]): T }, entityId: string, ...args: any[]): T;
    removeComponent(entityId: string): boolean;
    removeAll();
    values:T[];
    size: number;
}

//Factory is used when we need to activate or desactivate component
interface ITogglableComponentFactory<T extends ITogglableComponent> extends IComponentFactory<T> {
    activate(entityId: string, value: boolean);
}
