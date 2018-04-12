export { IComponent, IComponentFactory, IPool};
/* Components have to implement this interface in order to be processed by systems */
interface IComponent {
    entityId: number;
    active: boolean;
}

interface IPool {
    /* the length to iterate on created components,
    * use to avoid iterating on a maximum number of zeored components which are at the queue of the pool
    */
    activeLength: number;
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
    /* Create a component with the provided values */
    create(entityId: number, active: boolean);
    /* free a component by its id if it's in the pool */
    free(entityId: number): boolean;
    /* Get a component by its id */
    get(entityId: number);
    /* Does the pool contain a component with this id */
    has(entityId: number): boolean;
    /* Resize the pool to a size */
    resizeTo(size: number);
}

interface IComponentFactory<T extends IComponent> extends IPool {
    /* Return keys of all created components and their index in the values array */
    keys: Map<number, number>;
    /* Same as size */
    length: number;
    /* Hold components, use for iteration in Systems. */
    values: T[];
    /* Create a component from the values of another component */
    createFromComponent(entityId: number, comp: T);
    /* Add components but instanciated outside the pool (should probably not be used) */
    push(key: number, value: T);
    /* Same as push */
    set(key: number, value: T);
    /* Set the ative proprety of a component */
    activate(entityId: number, value: boolean);
    /* Empty the pool from zeroed and created components */
    clear();
    /* swap positions of two components in the values array */
    swap(key1: number, key2: number);
}
