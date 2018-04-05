export { TIMESTAMP };

const TIMESTAMP = window.performance && window.performance.now ? window.performance : Date;
