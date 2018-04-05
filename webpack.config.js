const path = require('path');

module.exports = {
    entry: ["./src/entry.ts"],
    watch: false,
    output: {
        path: path.resolve('./dist'),
        filename: "index.js",
        libraryTarget: 'umd',
        library: 'ecs'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                // exclude:/\.spec.ts?$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts']
    },
};