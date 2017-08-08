interface IFastHashMap<K, V> {
    clear();
    delete(key: K): boolean;
    forEach(callBack:Function);
    get(key: K): V
    has(key: K): boolean;
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    push(key: K, value: V);
    set(key: K, value: V);
    length: number;
    [index:number]:V;
}

class XArray<V> {
    constructor() {
        Array.apply(this, arguments);   
        return new Array();
    }
    length:number;
    push(val): number { return 0; };
}
//Adding Arrray to XArray prototype chain.
 XArray["prototype"] = new Array();

class FastHashMap<K, V> extends Array implements IFastHashMap<K, V>{
    //_keys store the index of the element which is stored in the _values array
    //keys are not in the same order as values, therefore it shouldn't be iterate
    protected _keys:Map<number>;
    // protected _values: V[];
    constructor() {
        super();
        this._keys = new Map<number>();     
    }
    test = function(){
         console.log("t");
     }
    clear = function() {
        this._keys.clear();
        while(this.length > 0) {
            this.pop();
        }
    }
    
    delete = function (key: K)   {
     
        let i = this._keys.get(key);
        let r = this._keys.delete(key);
        this.offsetIndexInKeys(i, -1);
        let r2 = this.splice(i, 1);
        if (r2.length > 0 && r) {
            return true;
        }
        else {
            return false;
        }
    }
    forEach = function(callBack:Function){
        let l = this.length;
        for(let i=0; i<l; ++i){
            callBack(this[i]);
        }
    }
    get = function(key: K): V {
        return this[this._keys.get(key)];
    }
    has = function(key: K): boolean {
        return this._keys.has(key);
    }
    protected insertValue = function(key:K, value:V, index:number) {
        return this.splice(index, 0, value);
    }
    protected offsetIndexInKeys = function(after:number, offsetVal:number){
 
        var mapIter = this._keys.entries();
        let l = this._keys.size;
        for (let i = 0; i < l; ++i) {
            let e = mapIter.next().value;
            if (e[1] > after) {
                this._keys.set(e[0], e[1]+=offsetVal);
            }
        }
    }
    insertAfter = function (key: K, value: V, keyRef: K): boolean {
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
    insertBefore = function (key: K, value: V, keyRef: K): boolean {
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
    keys = function(){
        return this._keys;
    }
    push = function(key: K, value:V):number{
        if(value === undefined){return;}
        arguments[0] = value;
        arguments.length = 1;
        let l = Array.prototype.push.apply(this,arguments);
        this._keys.set(key, l - 1);
        return this.length;
    }
    set = function(key: K, value: V):number {
         this.push(key, value);
         return this.length;
    }    
}


export { FastHashMap, IFastHashMap }