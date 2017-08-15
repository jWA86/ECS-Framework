interface IPerfTest {
    //nbComponents per factories
    system;
    createSystem: Function;
    createFactories: Function;
    createComponents:Function;
    process: Function;
    clear: Function;
}

//hrtime : [seconds, nanosecondes]

interface IResult {
    unit: number;
    mean: number;
    max: number;
    min: number;
    SD: number;
    first: number;
    raw: Array<any>;
}

const NS_PER_SEC = 1e9;
const NS_PER_MS = 1e6;

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

export { NS_PER_SEC, NS_PER_MS, IResult, hrToNanoSec, mean, max, min, variance, IPerfTest }