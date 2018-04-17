export { RANDOM, TIMESTAMP };

const TIMESTAMP = window.performance && window.performance.now ? window.performance : Date;

const RANDOM = {
    decimal: (max: number) => Math.random() * max,
    integer: (max: number) => Math.floor(Math.random() * max),
 };
