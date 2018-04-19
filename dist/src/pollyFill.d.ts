/// <reference types="node" />
export { GLOBAL, RANDOM, TIMESTAMP };
declare const TIMESTAMP: Performance | DateConstructor;
declare const RANDOM: {
    decimal: (max: number) => number;
    integer: (max: number) => number;
};
declare const GLOBAL: Window | Error | NodeJS.Global;
