export { RANDOM, TIMESTAMP };
declare const TIMESTAMP: Performance | DateConstructor;
declare const RANDOM: {
    decimal: (max: number) => number;
    integer: (max: number) => number;
};
