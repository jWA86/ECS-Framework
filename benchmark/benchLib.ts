var fs = require('fs');

const NS_PER_SEC = 1e9;
const NS_PER_MS = 1e6;

interface IResult {
    unit: number;
    mean: number;
    max: number;
    min: number;
    SD: number;
    first: number;
    raw: Array<any>;
}

function hrToNanoSec(hrtime) {
    return hrtime[0] * NS_PER_SEC + hrtime[1];
}

function mean(ar) {
    let m = 0;
    let l = ar.length;
    for (let i = 0; i < l; ++i) {
        let t = hrToNanoSec(ar[i]);
        m += t;
    }
    return m / l;
}
function max(ar) {
    let m = 0;
    let index = 0;
    let l = ar.length;
    for (let i = 0; i < l; ++i) {
        if (ar[i][1] > m) {
            m = hrToNanoSec(ar[i]);
            index = i;
        }
    }
    return { "value": m, "index": index, "of": l };
}
function min(ar) {
    let m = Number.MAX_VALUE;
    let index = 0;
    let l = ar.length;
    for (let i = 0; i < l; ++i) {
        if (ar[i][1] < m) {
            m = hrToNanoSec(ar[i]);
            index = i;
        }
    }
    return { "value": m, "index": index, "of": l };
}
function variance(ar, m) {
    let v = 0;
    let l = ar.length;
    for (let i = 0; i < l; ++i) {
        v += Math.pow(hrToNanoSec(ar[i]) - m, 2);
    }
    return v / (l - 1);
}

// const printRes = function (res:IResult) {
//     console.log(res.nb + " components, " + res.easingMethod + " easing");
//     console.log("mean : " + res.mean.toFixed(6) + res.unit);
//     console.log("max : " + res.max.toFixed(6) + res.unit);
//     console.log("min : " + res.min.toFixed(6) + res.unit);
//     console.log("standard deviation : " + res.SD.toFixed(6) + res.unit);
//     console.log("first : " + res.first.toFixed(6) + res.unit);
// }

function writeRes(res, path) {
    let p = path + "/" + Date.now() + ".json";
    let buffer = new Buffer(JSON.stringify(res));

    // fs.open(p, 'w', function (err, fd) {
    //     if (err) {
    //         throw 'error opening file: ' + err;
    //     }

        fs.writeFile(p, buffer, 0, buffer.length, null, function (err) {
            if (err) throw 'error writing file: ' + err;
            else{console.log("results written in /res")}
        });
    //});
}


export { NS_PER_SEC, NS_PER_MS, IResult, hrToNanoSec, mean, max, min, variance, writeRes }