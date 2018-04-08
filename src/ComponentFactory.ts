import { FastIterationMap } from "FastIterationMap";
export { ComponentFactory, IComponent, IComponentFactory, IPool };

/* Components have to implement this interface in order to be processed by systems */
interface IComponent {
    entityId: number;
    active: boolean;
}

interface IPool {
    /* the length to iterate on created components,
    * use to avoid iterating on a maximum number of zeored components which are at the queue of the pool
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
    /* Create a component with the provided values*/
    create(entityId: number, active: boolean);
    /* free a component by its id if it's in the pool */
    free(entityId: number): boolean;
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
    swap(key1: number, key2: number);
}

class ComponentFactory<T extends IComponent> extends FastIterationMap<number, T> implements IComponentFactory<T> {
    protected _iterationLength: number = 0; // use by the system for iteration, avoid iterate over zeroed components
    protected _zeroedRef: T;
    protected _nbActive: number = 0;
    protected _nbInactive: number = 0;
    protected _nbCreated: number = 0;

    constructor(protected _size: number, componentType: { new(entityId: number, active: boolean, ...args: any[]): T }, ...args: any[]) {
        super();
        this._zeroedRef = new componentType(0, false, ...args);
        this._values.length = this._size;
        for (let i = 0; i < _size; ++i) {
            this.createZeroedComponentAt(i);
        }
    }

    public activate(entityId: number, value: boolean) {
        const c = this.get(entityId);
        if (c.active !== value) {
            c.active = value;
            if (value) {
                this._nbActive += 1;
                this._nbInactive -= 1;
            } else {
                this._nbActive -= 1;
                this._nbInactive += 1;
            }
        }
    }

    /* Set the active proprety of all component in the pool */
    public activateAll(value: boolean) {
        for (let i = 0; i < this.size; ++i) {
            this._values[i].active = value;
        }
        if (value) {
            this._nbActive = this._nbCreated;
            this._nbInactive = 0;
        } else {
            this._nbActive = 0;
            this._nbInactive = this._nbCreated;
        }
    }

    public clear(): void {
        super.clear();
        this._nbActive = 0;
        this._nbInactive = 0;
        this._nbCreated = 0;
        this._iterationLength = 0;
    }

    public create(entityId: number, active: boolean, ...args: any[]): T {
        let index: number;
        let toReplaceComp: T;
        // if the key doesn't exist yet
        if (!this.has(entityId)) {
            // get the key and index of the first zeroed component in the values array
            index = this.getIndexOfFirstAvailableSpot();
            if (index === -1) {
                throw new Error("no free slot available, please resize the pool");
            } else {
                // add the key of our newly created component and
                this._keys.set(entityId, index);
                this._nbCreated += 1;
                if (active) {
                    this._nbActive += 1;
                } else {
                    this._nbInactive += 1;
                }
                // replace all propreties value from the zeroed component
                toReplaceComp = this._values[index];
            }
        } else {
            index = this._keys.get(entityId);
            // replace all propreties value from the component to update
            toReplaceComp = this._values[index];
            if (toReplaceComp.active !== active) {
                if (active) {
                    this._nbActive += 1;
                    this._nbInactive -= 1;
                } else {
                    this._nbActive -= 1;
                    this._nbInactive += 1;
                }
            }
        }
        toReplaceComp.entityId = entityId;
        toReplaceComp.active = active;

        // lastly increment the lastActiveIndex
        this.updateIterationLengthWhenAddingComponent(index);
        return this._values[index];
    }

    /* Set entityId back to 0 and desactivate the component
    * note : when the component is reuse it still has the old values
    */
    public free(entityId: number): boolean {
        const index = this._keys.get(entityId);
        if (index === undefined) { return false; }
        // update nbActive/Inactive counter
        if (this._values[index].active) {
            this._nbActive -= 1;
        } else {
            this._nbInactive -= 1;
        }
        // zeroed the component
        // note : removed while a solution is found to deep clone an object
        // this.mapObject(this._values[index], this._zeroedRef);
        this._values[index].entityId = 0;

        this._keys.delete(entityId);

        this.updateIterationLengthWhenRemovingComponent(index);

        this._nbCreated -= 1;

        return true;
    }
    /**
     * Alias for free()
     * @param entityId
     */
    public delete(entityId: number): boolean {
        return this.free(entityId);
    }

    public recycle(indexComponentToReplace: number, componentRef) {
        // parsing Date ?
        // parsing Function ?
        const prop = JSON.parse(JSON.stringify(componentRef));
        this._values[indexComponentToReplace] = Object.create(componentRef);
        Object.keys(componentRef).forEach((p) => {
            this._values[indexComponentToReplace][p] = prop[p];
        });
    }

    public resize(size: number) {
        let dif = size - this.size;
        if (dif > 0) {
            const oldL = this._values.length;
            this._values.length += dif;
            for (let i = 0; i < dif; ++i) {
                this.createZeroedComponentAt(oldL + i);
            }
        } else if (dif < 0) {
            dif = Math.abs(dif);
            for (let i = 0; i < dif; ++i) {
                const toDelete = this._values[this._values.length - 1];
                this._keys.delete(toDelete.entityId);
                this._values.pop();
            }
        }
        this._size += dif;
    }

    // overwrite fastIterationMap method we don't want to use
    public insertAfter(key: number, value: T, keyRef: number): boolean {
        return false;
    }
    public insertBefore(key: number, value: T, keyRef: number): boolean {
        return false;
    }

    /**
     * Delete range of components from a component key and its successors in reverse order so iterationLength doesn't need to be re-computed if range comprise the last created element.
     * @param fromKey key of the first component to start freeing
     * @param nbComponents number of components to free
     */
    public freeRangeComponents(fromKey: number, nbComponents: number ): boolean {
        const startingIndex = this._keys.get(fromKey);
        if (startingIndex === undefined) { return false; }
        let endingIndex = startingIndex + nbComponents;
        if (endingIndex > this._iterationLength) {
            endingIndex = this._iterationLength - 1;
        }
        for (let i = endingIndex; i >= startingIndex ; --i) {
            this.free(this._values[i].entityId);
        }
    }

    public updateIterationLength() {
        let lastCreatedIndex = 0;
        const l = this._values.length;
        for (let i = 0; i < l; ++i) {
            // zeroed components have an entityId of 0
            if (this._values[i].entityId !== 0) {
                lastCreatedIndex = i;
            }
        }
        this._iterationLength = lastCreatedIndex + 1;
    }

    protected createZeroedComponentAt(index: number) {
        this.recycle(index, this._zeroedRef);
        this._values[index].entityId = 0;
        this._values[index].active = false;
    }

    protected getIndexOfFirstAvailableSpot(): number {
        const l = this._values.length;
        for (let i = 0; i < l; ++i) {
            if (this._values[i].entityId === 0) {
                return i;
            }
        }
        return - 1;
    }

    protected mapObject(oldC: T, newC: T) {
        for (const i in newC) {
            if (oldC.hasOwnProperty(i)) {
                oldC[i] = newC[i];
            }
        }
    }

    protected updateIterationLengthWhenRemovingComponent(inputIndex: number) {
        if (inputIndex >= this._iterationLength - 1) {
            this._iterationLength -= 1;
        }
    }

    protected updateIterationLengthWhenAddingComponent(inputIndex: number) {
        if (inputIndex >= this._iterationLength) {
            this._iterationLength += 1;
        }
    }

    get iterationLength(): number {
        return this._iterationLength;
    }

    get nbActive(): number {
        return this._nbActive;
    }

    get nbInactive(): number {
        return this._nbInactive;
    }

    get nbCreated(): number {
        return this._nbCreated;
    }

    get nbFreeSlot(): number {
        return this._size - this._nbActive - this._nbInactive;
    }
}
