export { ISystem, IComponent, IPool, IComponentFactory, IEntityFactory }

interface ISystem {
    process(factory:IComponentFactory<IComponent>, ...args: any[]);
    execute(...args: any[]);
}

interface IComponent {
    entityId: string;
    active: boolean;
}

interface IPool {
    activateAll(value: boolean); // set the active proprety of all component in the pool
    create(entityId: string, active: boolean); // create a component with the provided values
    delete(entityId: string): boolean; // delete a component by its id if it's in the pool     
    get(entityId: string); // get a component by its id 
    has(entityId: string): boolean; // does the pool contain a component with this id 
    iterationLength: number // return the length to iterate created components and avoid iterate maximum number of zeored components
    nbActive: number; // nb of created active components
    nbCreated: number; // nb actives and inactives created components
    nbFreeSlot: number; // nb of zeroed components ( free slot for creating components)
    nbInactive: number; // nb of created inactive components
    resize(size: number); // resize the pool, either add zeroed components or delete last components (created or zeroed indistinctly)    
    size: number; // return the size of the pool
}

interface IComponentFactory<T extends IComponent> extends IPool {
    activate(entityId: string, value: boolean); // set the ative proprety of a component
    clear(); // empty the pool from zeroed and created components 
    keys: Map<string, number>; // return keys of all created components and their index in the values array
    length: number; // same as size
    push(key: string, value: T); // add components but instanciated outside the pool (should probably not be used)
    set(key: string, value: T); // same as push
    values: T[]; // hold components, use for iteration in Systems. 
}

interface IEntityFactory extends IPool {
    addFactory(name: string, factory: IComponentFactory<IComponent>);
    getComponent(entityId: string, factoryName: string): IComponent; // get components by providing the entityId and the factory    
    getFactory(name: string): IComponentFactory<IComponent>;
}