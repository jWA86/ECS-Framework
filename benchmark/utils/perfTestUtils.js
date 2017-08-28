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
    for (var i_1 = 0; i_1 < l; ++i_1) {
        var t = hrToNanoSec(ar[i_1]);
        m += t;
    }
    return m / l;
}
exports.mean = mean;
function max(ar) {
    var m = 0;
    var index = 0;
    var l = ar.length;
    for (var i_2 = 0; i_2 < l; ++i_2) {
        if (ar[i_2][1] > m) {
            m = hrToNanoSec(ar[i_2]);
            index = i_2;
        }
    }
    return { "value": m, "index": index, "of": l };
}
exports.max = max;
function min(ar) {
    var m = Number.MAX_VALUE;
    var index = 0;
    var l = ar.length;
    for (var i_3 = 0; i_3 < l; ++i_3) {
        if (ar[i_3][1] < m) {
            m = hrToNanoSec(ar[i_3]);
            index = i_3;
        }
    }
    return { "value": m, "index": index, "of": l };
}
exports.min = min;
function variance(ar, m) {
    var v = 0;
    var l = ar.length;
    for (var i_4 = 0; i_4 < l; ++i_4) {
        v += Math.pow(hrToNanoSec(ar[i_4]) - m, 2);
    }
    return v / (l - 1);
}
exports.variance = variance;
