import { Z_VERSION_ERROR } from "zlib";

export { GLOBAL, RANDOM, TIMESTAMP };

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
const isNode = new Function("try {return this===global;}catch(e){return false;}");

const TIMESTAMP = window.performance && window.performance.now ? window.performance : Date;

const RANDOM = {
    decimal: (max: number) => Math.random() * max,
    integer: (max: number) => Math.floor(Math.random() * max),
 };

const GLOBAL = isBrowser() ? window : isNode() ? global : new Error("Unknow environment");
