"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//simple benchmark for comparing collection lookup and iteration
var b = require("../utils/perfTestUtils");
var FastIterationMap_1 = require("../../lib/fastIterationMap/src/FastIterationMap");
//size of collections
//fetch random same number of elements in fetch benchmark
var l = 1200;
var generateUniqueId = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
var ob = (function () {
    function ob() {
    }
    return ob;
}());
var sArray = [];
for (var i_1 = 0; i_1 < l; ++i_1) {
    sArray.push({ "id": generateUniqueId(), "index": i_1, "prop": 0 });
}
var objArray = [];
for (var i_2 = 0; i_2 < l; ++i_2) {
    var id = sArray[i_2].id;
    var o_1 = { "index": i_2, "prop": 0 };
    objArray[id] = o_1;
}
var myMap = new Map();
for (var i_3 = 0; i_3 < l; ++i_3) {
    var id = sArray[i_3].id;
    var o_2 = { "index": i_3, "prop": 0 };
    myMap.set(id, o_2);
}
var myCustomMap = new FastIterationMap_1.FastIterationMap();
for (var i_4 = 0; i_4 < l; ++i_4) {
    var id = sArray[i_4].id;
    var o_3 = { "index": i_4, "prop": 0 };
    myCustomMap.set(id, o_3);
}
var idToLookUp1 = [];
for (var i_5 = 0; i_5 < l; ++i_5) {
    idToLookUp1.push(sArray[Math.floor(Math.random() * l)].id);
}
//instead of using keys
function benchObjArrayFetchByIndex() {
    var start = process.hrtime();
    for (var i_6 = 0; i_6 < l; ++i_6) {
        objArray[Object.keys(objArray)[i_6]].prop += 1;
    }
    return process.hrtime(start);
}
function benchFind() {
    var start = process.hrtime();
    var _loop_1 = function (i_7) {
        sArray.find(function (e) {
            return e.id === idToLookUp1[i_7];
        }).prop += 1;
    };
    for (var i_7 = 0; i_7 < l; ++i_7) {
        _loop_1(i_7);
    }
    return process.hrtime(start);
}
function benchById() {
    var start = process.hrtime();
    for (var i_8 = 0; i_8 < l; ++i_8) {
        objArray[idToLookUp1[i_8]].prop += 1;
    }
    return process.hrtime(start);
}
function benchMap() {
    var start = process.hrtime();
    for (var i_9 = 0; i_9 < l; ++i_9) {
        myMap.get(idToLookUp1[i_9]).prop += 1;
    }
    return process.hrtime(start);
}
function benchMyCustomMap() {
    var start = process.hrtime();
    for (var i_10 = 0; i_10 < l; ++i_10) {
        myCustomMap.get(idToLookUp1[i_10]).prop += 1;
    }
    return process.hrtime(start);
}
function IterateOject() {
    var start = process.hrtime();
    for (var property in objArray) {
        if (objArray.hasOwnProperty(property)) {
            objArray[property].prop += 1;
        }
    }
    return process.hrtime(start);
}
function IterateObject2() {
    var start = process.hrtime();
    Object.keys(objArray).forEach(function (key, index) {
        objArray[key].prop += 1;
    });
    return process.hrtime(start);
}
function iterateArray() {
    var start = process.hrtime();
    for (var i_11 = 0; i_11 < l; ++i_11) {
        sArray[i_11].prop += 1;
    }
    return process.hrtime(start);
}
function iterateMapForEach() {
    var start = process.hrtime();
    myMap.forEach(function (v, k) {
        v.prop += 1;
    });
    return process.hrtime(start);
}
function iterateMapIterator() {
    var start = process.hrtime();
    var it = myMap.entries();
    for (var i_12 = 0; i_12 < l; ++i_12) {
        it.next().value.prop += 1;
    }
    return process.hrtime(start);
}
function iterateCustomMapForEach() {
    var start = process.hrtime();
    myCustomMap.values.forEach(function (v, k) {
        v.prop += 1;
    });
    return process.hrtime(start);
}
function iterateCustomMapForLoop() {
    var start = process.hrtime();
    for (var i_13 = 0; i_13 < l; ++i_13) {
        myCustomMap.values[i_13].prop += 1;
    }
    return process.hrtime(start);
}
//warm up
for (var i_14 = 0; i_14 < l; ++i_14) {
    sArray[i_14];
}
var fbyId = [];
var ffind = [];
var fmap = [];
var fcMap = [];
var fByIndex = [];
console.log("fetch " + l + " elements");
for (var i_15 = 0; i_15 < 10; ++i_15) {
    ffind.push(benchFind());
    fmap.push(benchMap());
    fbyId.push(benchById());
    fcMap.push(benchMyCustomMap());
    fByIndex.push(benchObjArrayFetchByIndex());
}
console.log("mean fetch with Id : " + (b.mean(fbyId) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean fetch with find() : " + (b.mean(ffind) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean fetch with hashMap : " + (b.mean(fmap) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean fetch with customHashMap : " + (b.mean(fcMap) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean fetch with index in Object Array: " + (b.mean(fByIndex) / b.NS_PER_MS).toFixed(4) + "ms");
//fastest : lookup byId (object)
console.log("iteration over " + l + " elements");
var rIArray = [];
var rICMapForEach = [];
var rICMapForLoop = [];
var rIMapForEach = [];
var rIMapIterator = [];
var rIObject = [];
var rIObject2 = [];
for (var i_16 = 0; i_16 < 10; ++i_16) {
    rIArray.push(iterateArray());
    rICMapForEach.push(iterateCustomMapForEach());
    rIMapForEach.push(iterateMapForEach());
    rIMapIterator.push(iterateMapIterator());
    rIObject.push(IterateObject2());
    rIObject2.push(IterateOject());
    rICMapForLoop.push(iterateCustomMapForLoop());
}
console.log("mean iteration array : " + (b.mean(rIArray) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean iteration Map with iterator : " + (b.mean(rIMapIterator) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean iteration map with forEach : " + (b.mean(rIMapForEach) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean iteration customMap with forEach : " + (b.mean(rICMapForEach) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean iteration customMap with for loop : " + (b.mean(rICMapForLoop) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean iteration object hasOwnProperty : " + (b.mean(rIObject) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean iteration object Object.keys() forEach: " + (b.mean(rIObject2) / b.NS_PER_MS).toFixed(4) + "ms");
//fastest for 100+: array iteration then iterate Map with ForEach 
// fastest for < 50 c/system : array then object.keys() then iter by hasOwnProperty
//insertion at a given positon (based on an element id)
function benchInsertionMap() {
    var id = sArray[Math.floor(Math.random() * sArray.length)].id;
    var start = process.hrtime();
    var nMap = new Map();
    myMap.forEach(function (v, k) {
        nMap.set(k, v);
        if (k === id) {
            nMap.set("inserted", "inserted");
        }
    });
    return process.hrtime(start);
}
function benchInsertionFastMap() {
    var id = sArray[Math.floor(Math.random() * sArray.length)].id;
    var start = process.hrtime();
    myCustomMap.insertAfter("inserted", { "index": -1, "prop": 0 }, id);
    return process.hrtime(start);
}
console.log("insertion at position");
var rInsertionMap = [];
var rInsertionFastMap = [];
for (var i_17 = 0; i_17 < 100; ++i_17) {
    rInsertionMap.push(benchInsertionMap());
    rInsertionFastMap.push(benchInsertionFastMap());
}
console.log("mean insertion of 1 element in Map by forEach & new Map: " + (b.mean(rInsertionMap) / b.NS_PER_MS).toFixed(4) + "ms");
console.log("mean insertion of 1 element in FastMap : " + (b.mean(rInsertionFastMap) / b.NS_PER_MS).toFixed(4) + "ms");
//iteration after multi insert ? 
