module.exports = function(config) {
  config.set({
      frameworks: ["mocha", "karma-typescript"],
      files: [
          { pattern: "src/**/*.ts" },
          "node_modules/es6-shim/es6-shim.js"
      ],
      preprocessors: {
          "**/*.ts": ["karma-typescript"]
          
      },
      reporters: ["dots", "karma-typescript"],

      browsers: ["Chrome", "Firefox", "IE", "PhantomJS"],

      singleRun: false,
      concurrency: Infinity
  });
};