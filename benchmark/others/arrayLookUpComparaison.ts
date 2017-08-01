//simple benchmark for comparing collection lookup and iteration

const generateUniqueId = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let l = 10000;
let myArray = [];
for (let i = 0; i < l; ++i) {
    myArray.push({ "id": generateUniqueId(), "index": i, "prop": 0 });
}

let myArray2 = [];
for (let i = 0; i < l; ++i) {
    let id = myArray[i].id;
    let o = { "index": i, "prop": 0 };
    myArray2[id] = o;
}

let myMap = new Map();
for (let i = 0; i < l; ++i) {
    let id = myArray[i].id;
    let o = { "index": i, "prop": 0 };
    myMap.set(id, o);
}

let idToLookUp1 = [];
for (let i = 0; i < l; ++i) {
    idToLookUp1.push(myArray[Math.floor(Math.random() * l)].id);
}

let lgth1 = idToLookUp1.length;
function benchFind() {
    console.time("find");
    for (let i = 0; i < lgth1; ++i) {
        myArray.find((e) => {
            return e.id === idToLookUp1[i];
        }).prop += 1;
    }
    console.timeEnd("find");
}

function benchById() {
    console.time("byId");
    for (let i = 0; i < lgth1; ++i) {
        myArray2[idToLookUp1[i]].prop += 1;
    }
    console.timeEnd("byId");
}

function benchMap() {
    console.time("map");
    for (let i = 0; i < lgth1; ++i) {
        myMap.get(idToLookUp1[i]).prop += 1;
    }
    console.timeEnd("map");
}

function benchIterateOject() {
    console.time("iterateObject");
    for (var property in myArray2) {
        if (myArray2.hasOwnProperty(property)) {
            myArray2[property].prop += 1;
        }

    }
    console.timeEnd("iterateObject");
}

function benchIterateObject2() {
    console.time("iterateObject2");
    Object.keys(myArray2).forEach(function (key, index) {
        myArray2[key].prop += 1;
    });
    console.timeEnd("iterateObject2");
}

function iterateArray() {
    console.time("iterateArray");
    for (let i = 0; i < l; ++i) {
        myArray[i].prop += 1;
    }
    console.timeEnd("iterateArray");
}

 function iterateMapForEach() {

     console.time("iterateMapForEach");
    myMap.forEach((v, k)=>{
        v.prop +=1;
    });
     console.timeEnd("iterateMapForEach");
 }


function iterateMapIterator(){
    console.time("iterateMapIterator");
    let it = myMap.entries();
    for(let i=0;i<l;++i){
        it.next().value.prop+=1;
    }
    console.timeEnd("iterateMapIterator");
}

//warm up
for (let i = 0; i < lgth1; ++i) {
    myArray[i];
}

console.log("fetch");
benchById();
benchFind();
benchMap();
benchFind();
benchMap();
benchById();

//fastest : lookup byId (object)
console.log("iteration0");
iterateArray();
benchIterateOject();
iterateMapForEach();
benchIterateObject2();
iterateMapIterator();


benchIterateOject();
iterateMapForEach();
iterateMapIterator();
iterateArray();
benchIterateObject2();

//fastest : array iteration then iterate Map with ForEach

//insert

function benchInsertionMap() {
    let id = myArray[Math.floor(Math.random()*myArray.length)].id;
    console.time("insertMap");
    let nMap = new Map();
    myMap.forEach((v, k)=>{
        nMap.set(k, v);
        if(k===id){
            nMap.set("inserted", "inserted");
        }
    });
    console.timeEnd("insertMap");
}

console.log("insertion at position");
benchInsertionMap();

//iteration after multi insert ?