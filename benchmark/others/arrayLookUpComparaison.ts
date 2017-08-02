//simple benchmark for comparing collection lookup and iteration
import * as b from "../benchLib";

//size of collections
//fetch random same number of elements in fetch benchmark
const l = 100;

const generateUniqueId = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let sArray = [];
for (let i = 0; i < l; ++i) {
    sArray.push({ "id": generateUniqueId(), "index": i, "prop": 0 });
}

let objArray = [];
for (let i = 0; i < l; ++i) {
    let id = sArray[i].id;
    let o = { "index": i, "prop": 0 };
    objArray[id] = o;
}

let myMap = new Map();
for (let i = 0; i < l; ++i) {
    let id = sArray[i].id;
    let o = { "index": i, "prop": 0 };
    myMap.set(id, o);
}

let idToLookUp1 = [];
for (let i = 0; i < l; ++i) {
    idToLookUp1.push(sArray[Math.floor(Math.random() * l)].id);
}

function benchFind() {    
    let start = process.hrtime();
    for (let i = 0; i < l; ++i) {
        sArray.find((e) => {
            return e.id === idToLookUp1[i];
        }).prop += 1;
    }
    return process.hrtime(start);
}

function benchById() {
    let start = process.hrtime();
    for (let i = 0; i < l; ++i) {
        objArray[idToLookUp1[i]].prop += 1;
    }
    return process.hrtime(start);
}

function benchMap() {
   let start = process.hrtime();
    for (let i = 0; i < l; ++i) {
        myMap.get(idToLookUp1[i]).prop += 1;
    }
    return process.hrtime(start);
}

function IterateOject() {
    let start = process.hrtime();
    for (var property in objArray) {
        if (objArray.hasOwnProperty(property)) {
            objArray[property].prop += 1;
        }
    }
    return process.hrtime(start);
}

function IterateObject2() {
    let start = process.hrtime();
    Object.keys(objArray).forEach(function (key, index) {
        objArray[key].prop += 1;
    });
    return process.hrtime(start);
}

function iterateArray() {
    let start = process.hrtime();
    for (let i = 0; i < l; ++i) {
        sArray[i].prop += 1;
    }
    return process.hrtime(start);
}

function iterateMapForEach() {
    let start = process.hrtime();
    myMap.forEach((v, k)=>{
        v.prop +=1;
    });
    return process.hrtime(start);
}

function iterateMapIterator(){
    let start = process.hrtime();
    let it = myMap.entries();
    for(let i=0;i<l;++i){
        it.next().value.prop+=1;
    }
    return process.hrtime(start);
}

//warm up
for (let i = 0; i < l; ++i) {
    sArray[i];
}

let fbyId = [];
let ffind = [];
let fmap = [];
console.log("fetch "+l+" elements");
for (let i=0;i<10;++i){
    
    ffind.push(benchFind());
    fmap.push(benchMap());
    fbyId.push(benchById());
}
console.log("mean fetch with Id : "+(b.mean(fbyId)/b.NS_PER_MS).toFixed(4)+"ms");
console.log("mean fetch with find() : "+(b.mean(ffind)/b.NS_PER_MS).toFixed(4)+"ms");
console.log("mean fetch with hashMap : "+(b.mean(fmap)/b.NS_PER_MS).toFixed(4)+"ms");

//fastest : lookup byId (object)

console.log("iteration over "+l+" elements");
let rIArray = [];
let rIMapIterator =[];
let rIMapForEach = [];
let rIObject = [];
let rIObject2 = [];

for (let i = 0; i<10; ++i) {
    rIArray.push(iterateArray());
    rIMapIterator.push(iterateMapIterator());
    rIMapForEach.push(iterateMapForEach());
    rIObject.push(IterateObject2());
    rIObject2.push(IterateOject());
}

console.log("mean iteration array : "+(b.mean(rIArray)/b.NS_PER_MS).toFixed(4)+"ms");
console.log("mean iteration Map with iterator : "+(b.mean(rIMapIterator)/b.NS_PER_MS).toFixed(4)+"ms");
console.log("mean iteration map with forEach : "+(b.mean(rIMapForEach)/b.NS_PER_MS).toFixed(4)+"ms");
console.log("mean iteration object hasOwnProperty : "+(b.mean(rIObject)/b.NS_PER_MS).toFixed(4)+"ms");
console.log("mean iteration object Object.keys() : "+(b.mean(rIObject2)/b.NS_PER_MS).toFixed(4)+"ms");

//fastest for 100+: array iteration then iterate Map with ForEach 
// fastest for < 50 c/system : array then object.keys() then iter by hasOwnProperty

//insertion at a given positon (based on an element id)
function benchInsertionMap() {
    let id = sArray[Math.floor(Math.random()*sArray.length)].id;
    let start = process.hrtime();
    let nMap = new Map();
    myMap.forEach((v, k)=>{
        nMap.set(k, v);
        if(k===id){
            nMap.set("inserted", "inserted");
        }
    });
    return process.hrtime(start);
}

console.log("insertion at position");
let rInsertionMap = [];
for(let i = 0; i<100; ++i) {
    rInsertionMap.push(benchInsertionMap());
}
console.log("mean insertion of 1 element in Map by forEach & new Map: "+(b.mean(rInsertionMap)/b.NS_PER_MS).toFixed(4)+"ms");
//iteration after multi insert ?