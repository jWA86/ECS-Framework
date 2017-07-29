"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS_PER_SEC = 1e9;
exports.NS_PER_SEC = NS_PER_SEC;
var NS_PER_MS = 1e6;
exports.NS_PER_MS = NS_PER_MS;
function hrToNanoSec(hrtime) {
    return hrtime[0] * NS_PER_SEC + hrtime[1];
}
exports.hrToNanoSec = hrToNanoSec;
function mean(ar) {
    var m = 0;
    var l = ar.length;
    for (var i = 0; i < l; ++i) {
        var t = hrToNanoSec(ar[i]);
        m += t;
    }
    return m / l;
}
exports.mean = mean;
function max(ar) {
    var m = 0;
    var index = 0;
    var l = ar.length;
    for (var i = 0; i < l; ++i) {
        if (ar[i][1] > m) {
            m = hrToNanoSec(ar[i]);
            index = i;
        }
    }
    return { "value": m, "index": index, "of": l };
}
exports.max = max;
function min(ar) {
    var m = Number.MAX_VALUE;
    var index = 0;
    var l = ar.length;
    for (var i = 0; i < l; ++i) {
        if (ar[i][1] < m) {
            m = hrToNanoSec(ar[i]);
            index = i;
        }
    }
    return { "value": m, "index": index, "of": l };
}
exports.min = min;
function variance(ar, m) {
    var v = 0;
    var l = ar.length;
    for (var i = 0; i < l; ++i) {
        v += Math.pow(hrToNanoSec(ar[i]) - m, 2);
    }
    return v / (l - 1);
}
exports.variance = variance;
function writeRes(res, path) {
    var p = path + "/" + Date.now() + ".json";
    var buffer = new Buffer(JSON.stringify(res));
    fs.writeFile(p, buffer, 0, buffer.length, null, function (err) {
        if (err)
            throw 'error writing file: ' + err;
        else {
            console.log("results written in /res");
        }
    });
}
exports.writeRes = writeRes;
