//simple benchmark for comparing collection lookup and iteration
var generateUniqueId = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
var l = 10000;
var myArray = [];
for (var i = 0; i < l; ++i) {
    myArray.push({ "id": generateUniqueId(), "index": i, "prop": 0 });
}
var myArray2 = [];
for (var i = 0; i < l; ++i) {
    var id = myArray[i].id;
    var o = { "index": i, "prop": 0 };
    myArray2[id] = o;
}
var myMap = new Map();
for (var i = 0; i < l; ++i) {
    var id = myArray[i].id;
    var o = { "index": i, "prop": 0 };
    myMap.set(id, o);
}
var idToLookUp1 = [];
for (var i = 0; i < l; ++i) {
    idToLookUp1.push(myArray[Math.floor(Math.random() * l)].id);
}
var lgth1 = idToLookUp1.length;
function benchFind() {
    console.time("find");
    var _loop_1 = function (i) {
        myArray.find(function (e) {
            return e.id === idToLookUp1[i];
        }).prop += 1;
    };
    for (var i = 0; i < lgth1; ++i) {
        _loop_1(i);
    }
    console.timeEnd("find");
}
function benchById() {
    console.time("byId");
    for (var i = 0; i < lgth1; ++i) {
        myArray2[idToLookUp1[i]].prop += 1;
    }
    console.timeEnd("byId");
}
function benchMap() {
    console.time("map");
    for (var i = 0; i < lgth1; ++i) {
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
    for (var i = 0; i < l; ++i) {
        myArray[i].prop += 1;
    }
    console.timeEnd("iterateArray");
}
function iterateMapForEach() {
    console.time("iterateMapForEach");
    myMap.forEach(function (v, k) {
        v.prop += 1;
    });
    console.timeEnd("iterateMapForEach");
}
function iterateMapIterator() {
    console.time("iterateMapIterator");
    var it = myMap.entries();
    for (var i = 0; i < l; ++i) {
        it.next().value.prop += 1;
    }
    console.timeEnd("iterateMapIterator");
}
//warm up
for (var i = 0; i < lgth1; ++i) {
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
    var id = myArray[Math.floor(Math.random() * myArray.length)].id;
    console.time("insertMap");
    var nMap = new Map();
    myMap.forEach(function (v, k) {
        nMap.set(k, v);
        if (k === id) {
            nMap.set("inserted", "inserted");
        }
    });
    console.timeEnd("insertMap");
}
console.log("insertion at position");
benchInsertionMap();
//iteration after multi insert ? 
