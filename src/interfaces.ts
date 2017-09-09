export { IComponent, IComponentFactory, IEntityFactory }

interface IComponent {
    entityId: string;
    active: boolean;
}

interface IComponentFactory<T extends IComponent> {
    activate(entityId: string, value: boolean); // set the ative proprety of a component
    activateAll(value: boolean); // set the active proprety of all component in the pool
    clear(); // empty the pool from zeroed and created components 
    create(entityId: string, active: boolean): T; // create a component with the provided values
    delete(entityId: string): boolean; // delete a component by its id if it's in the pool 
    get(entityId: string): T; // get a component by its id 
    has(entityId: string): boolean; // does the pool contain a component with this id 
    iterationLength: number // return the length to iterate created components and avoid iterate maximum number of zeored components
    keys: Map<string, number>; // return keys of all created components and their index in the values array
    length: number; // same as size
    nbActive: number; // nb of created active components
    nbCreated: number; // nb actives and inactives created components
    nbFreeSlot: number; // nb of zeroed components ( free slot for creating components)
    nbInactive: number; // nb of created inactive components
    push(key: string, value: T); // add components but instanciated outside the pool (should probably not be used)
    resize(size: number); // resize the pool, either add zeroed components or delete last components (created or zeroed indistinctly)
    set(key: string, value: T); // same as push
    size: number; // return the size of the pool
    values: T[]; // hold components, use for iteration in Systems. 
}



interface IEntityFactory {
    create(entityId: string, active: boolean); // set a zeroed component entityId and active prop
    addFactory(name: string, factory:IComponentFactory<IComponent>);
    delete(entityId: string): boolean;
    getEntity(entityId: string): IComponent[] // return all components of the entity;
    getFactory(name: string);
    getComponent(entityId: string, factoryName: string): IComponent; // get components by providing the entityId and the factory
    has(entityId): boolean;
    resize(size: number);
    iterationLength: number;
    nbActive: number; // nb of created active components
    nbCreated: number; // nb actives and inactives created components
    nbFreeSlot: number; // nb of zeroed components ( free slot for creating components)
    nbInactive: number; // nb of created inactive components
    size: number; // return the size of the pool
}
