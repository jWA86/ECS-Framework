import { FastIterationMap } from "FastIterationMap";
import { IComponent, IComponentFactory, IPool } from "./IComponentFactory";
export { ComponentFactory };

class ComponentFactory<T extends IComponent> extends FastIterationMap<number, T> implements IComponentFactory<T> {
    protected _activeLength: number = 0; // use by the system for iteration, avoid iterate over zeroed components
    protected readonly _zeroedRef: T;
    protected _nbActive: number = 0;
    protected _nbInactive: number = 0;
    protected _nbCreated: number = 0;

    constructor(protected _size: number, componentWithDefaultValue: T) {
        super();
        this._zeroedRef = Object.assign({}, componentWithDefaultValue);
        this._zeroedRef.entityId = 0;
        this._zeroedRef.active = false;

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
        this._activeLength = 0;
    }

    public create(entityId: number, active: boolean, insertFirstAvailableSpot = false): T {
        let index: number;
        if (entityId === 0) { throw Error("0 is a reserved id"); }
        if (this.has(entityId)) { throw Error("a component with this entityId already exists"); }
        if (insertFirstAvailableSpot) {
            // get the key and index of the first zeroed component in the values array
            index = this.getIndexOfFirstAvailableSpot();
        } else {
            index = this._activeLength;
        }
        if (index >= this._size) {
            throw Error("no free slot available, please resize the pool");
        } else {
            // add the key of our newly created component and
            this._keys.set(entityId, index);
            this._nbCreated += 1;
            if (active) {
                this._nbActive += 1;
            } else {
                this._nbInactive += 1;
            }

            this._values[index].entityId = entityId;
            this._values[index].active = active;
        }

        this.updateActiveLength(index, true);
        return this._values[index];
    }

    /* Set entityId back to 0 and desactivate the component
    * note : when the component is reuse it still has the old values
    */
    public free(entityId: number): boolean {
        const index = this.getIndex(entityId);

        if (index === undefined) { return false; }
        // update nbActive/Inactive counter
        if (this._values[index].active) {
            this._nbActive -= 1;
        } else {
            this._nbInactive -= 1;
        }

        this.createZeroedComponentAt(index);

        this._values[index].entityId = 0;

        this._keys.delete(entityId);

        this.updateActiveLength(index, false);

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
    /**
     * Resize the pool
     * if the size passed as parameter is inferior to the actual pool size, last components will be removed
     * @param size desired size of the pool
     */
    public resizeTo(size: number) {
        size = Math.floor(size);
        let diff = size - this.size;
        if (diff > 0) {
            const oldL = this._values.length;
            this._values.length += diff;
            for (let i = oldL; i < diff + oldL; ++i) {
                this.createZeroedComponentAt(i);
            }
        } else if (diff < 0) {
            diff = Math.abs(diff);
            for (let i = 0; i < diff; ++i) {
                const toDelete = this._values[this._values.length - 1];
                this._keys.delete(toDelete.entityId);
                this._values.pop();
            }
        }
        this._size += diff;
    }

    /**
     * Expand the pool's size by a given value
     * @param { number } amount the amount to resize to pool by (can be  a negative value)
     */
    public expand(amount: number) {
        amount = Math.floor(amount);
        const newSize = this.size + amount;
        this.resizeTo(newSize);
    }

    // overwrite fastIterationMap method we don't want to use
    public insertAfter(key: number, value: T, keyRef: number): boolean {
        return false;
    }
    public insertBefore(key: number, value: T, keyRef: number): boolean {
        return false;
    }

    /**
     * Delete range of components from a component key and its successors in reverse order so activeLength doesn't need to be re-computed if range comprise the last created element.
     * @param fromKey key of the first component to start freeing
     * @param nbComponents number of components to free
     */
    public freeRangeComponents(fromKey: number, nbComponents: number): boolean {
        const startingIndex = this.getIndex(fromKey);

        if (startingIndex === undefined) { return false; }
        let endingIndex = startingIndex + nbComponents;
        if (endingIndex > this._activeLength) {
            endingIndex = this._activeLength - 1;
        }
        for (let i = endingIndex; i >= startingIndex; --i) {
            this.free(this._values[i].entityId);
        }
    }

    public computeActiveLength() {
        let lastCreatedIndex = 0;
        const l = this._values.length;
        for (let i = 0; i < l; ++i) {
            // zeroed components have an entityId of 0
            if (this._values[i].entityId !== 0) {
                lastCreatedIndex = i;
            }
        }
        this._activeLength = lastCreatedIndex + 1;
    }

    public createFromComponent(entityId: number, comp: T): T {
        if (this._keys.has(entityId)) { throw Error("entityId already exists in the pool"); }
        const newComp = this.create(entityId, true);
        const index = this.getIndex(newComp.entityId);

        const prop = JSON.parse(JSON.stringify(comp));

        Object.keys(this._zeroedRef).forEach((p) => {
            if (this._values[index].hasOwnProperty(p)) {
                this._values[index][p] = prop[p];
            }
        });

        this._values[index].entityId = entityId;

        return this._values[index];
    }

    protected createZeroedComponentAt(index) {
        const prop = JSON.parse(JSON.stringify(this._zeroedRef));
        this._values[index] = Object.create(this._zeroedRef);
        Object.keys(this._zeroedRef).forEach((p) => {
            this._values[index][p] = prop[p];
        });
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

    protected mapValues(destination: T, source: T) {
        for (const i in source) {
            if (destination.hasOwnProperty(i)) {
                destination[i] = source[i];
            }
        }
    }

    protected updateActiveLength(inputIndex: number, adding: boolean) {
        if (!adding) {
            if (inputIndex >= this._activeLength - 1) {
                this._activeLength -= 1;
            }
        } else {
            if (inputIndex >= this._activeLength) {
                this._activeLength += 1;
            }
        }
    }

    get activeLength(): number {
        return this._activeLength;
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
