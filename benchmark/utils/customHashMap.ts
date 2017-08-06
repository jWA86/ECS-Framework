interface IFastHashMap<K, V> {
    clear();
    delete(key: K): boolean;
    forEach(callBack:Function);
    get(key: K): V
    has(key: K): boolean;
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    keys(): Map<number>;
    set(key: K, value: V);
    size: number;
    values(): Array<V>;
}

class FastHashMap<K, V> implements IFastHashMap<K, V> {
    //_keys store the index of the element which is stored in the _values array
    //keys are not in the same order as values, therefore it shouldn't be iterate
    protected _keys: Map<number>;
    protected _values: V[];
    constructor() {
        this._values = [];
        this._keys = new Map<number>();
    }
    clear() {
        this._keys.clear();
        this._values = [];
    }
    delete(key: K) {
        let i = this._keys.get(key);
        let r = this._keys.delete(key);
        this.offsetIndexInKeys(i, -1);
        let r2 = this._values.splice(i, 1);
        if (r2.length > 0 && r) {
            return true;
        }
        else {
            return false;
        }
    }
    forEach(callBack:Function){
        let l = this._values.length;
        for(let i=0; i<l; ++i){
            callBack(this._values[i]);
        }
    }
    get(key: K): V {
        return this._values[this._keys.get(key)];
    }
    has(key: K): boolean {
        return this._keys.has(key);
    }
    protected insertValue(key:K, value:V, index:number) {
        return this._values.splice(index, 0, value);
    }
    protected offsetIndexInKeys(after:number, offsetVal:number){
        var mapIter = this._keys.entries();
        let l = this._keys.size;
        for (let i = 0; i < l; ++i) {
            let e = mapIter.next().value;
            if (e[1] > after) {
                this._keys.set(e[0], e[1]+=offsetVal);
            }
        }
    }
    insertAfter(key: K, value: V, keyRef: K): boolean {
        let i = this._keys.get(keyRef);
        this.insertValue(key, value, i+1);
        if(i === undefined) {
            return false;
        }else{
            this.offsetIndexInKeys(i, 1);
            this._keys.set(key, i+1);
            return true;
        }
    }
    insertBefore(key: K, value: V, keyRef: K): boolean {
        let i = this._keys.get(keyRef);
        this.insertValue(key, value, i);
        if(i === undefined) {
            return false;
        }else{
            this.offsetIndexInKeys(i-1, 1);
            this._keys.set(key, i);
            return true;
        }
    }
    keys(): Map<number> {
        return this._keys;
    }
    set(key: K, value: V) {
        let l = this._values.push(value);
        this._keys.set(key, l - 1);
    }

    get size(): number {
        return this._values.length;
    }
    values(): V[] {
        return this._values;
    }
}

export { FastHashMap, IFastHashMap }