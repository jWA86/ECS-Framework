const fs = require('fs');
const os = require('os');

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

function writeRes(res, path) {
    let p = path + "/" + Date.now() + ".json";
    
    let date = JSON.stringify(new Date()+", ");
    let cpu = {"cpu":os.cpus(), "platform":os.platform() };
    let r = res;
    let o = {"date": date, "os": cpu, "data": r}
    let buffer = new Buffer(JSON.stringify(o));
        fs.writeFile(p, buffer, 0, buffer.length, null, function (err) {
            if (err) throw 'error writing file: ' + err;
            else{console.log("results written in "+path)}
        });
}

export { NS_PER_SEC, NS_PER_MS, IResult, hrToNanoSec, mean, max, min, variance, writeRes }