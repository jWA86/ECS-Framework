export { ISystem, IComponent, IPool, IComponentFactory, IEntityFactory, IFrameEvent};

interface IFrameEvent {
    /* The number of times the frame event was fired */
    count: number;
    /* The time passed in seconds since the last frame event */
    delta: number;
    loopCount: number;
    reverse: boolean;
    /* The total amount of time passed since the first frame event in seconds */
    time: number;
}

interface ISystem {
    setFactories(... args: Array<IComponentFactory<IComponent>>);
    process();
    execute(... args: any[]);
}

interface IComponent {
    entityId: number;
    active: boolean;
}

interface IPool {
    /* return the length to iterate created components and avoid iterate maximum number of zeored components
    */
    iterationLength: number;
    /* nb of created active components */
    nbActive: number;
    /* Nb actives and inactives created components */
    nbCreated: number;
    /* Nb of zeroed components ( free slot for creating components) */
    nbFreeSlot: number;
    /* Nb of created inactive components */
    nbInactive: number;
    /* Return the size of the pool */
    size: number;
    /* Set the active proprety of all component in the pool */
    activateAll(value: boolean);
    /* Create a component with the provided values*/
    create(entityId: number, active: boolean);
    /* Delete a component by its id if it's in the pool */
    delete(entityId: number): boolean;
    /* Get a component by its id */
    get(entityId: number);
    /* Does the pool contain a component with this id */
    has(entityId: number): boolean;
    /* Resize the pool, either add zeroed components or delete last components (created or zeroed indistinctly) */
    resize(size: number);
}

interface IComponentFactory<T extends IComponent> extends IPool {
    /* Return keys of all created components and their index in the values array */
    keys: Map<number, number>;
    /* Same as size */
    length: number;
    /* Hold components, use for iteration in Systems. */
    values: T[];
    /* Add components but instanciated outside the pool (should probably not be used) */
    push(key: number, value: T);
    /* Same as push */
    set(key: number, value: T);
    /* Set the ative proprety of a component */
    activate(entityId: number, value: boolean);
    /* Empty the pool from zeroed and created components */
    clear();
}

interface IEntityFactory extends IPool {
    addFactory(name: string, factory: IComponentFactory<IComponent>);
    getComponent(entityId: number, factoryName: string): IComponent;
    /* get components by providing the entityId and the factory */
    getFactory(name: string): IComponentFactory<IComponent>;
}
