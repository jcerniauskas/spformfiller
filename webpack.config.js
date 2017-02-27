var webpack = require('webpack');

module.exports = {
    entry: {
        "background": "./app/scripts.ts/Chrome/background.ts",
        "chromereload": "./app/scripts.ts/Chrome/chromereload.ts",
        "contentscript": "./app/scripts.ts/Chrome/contentscript.ts"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/app/scripts",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.ts$/, use: ["awesome-typescript-loader"] },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, enforce: "pre", use: ["source-map-loader"] },
            // Linter for TS
            { test: /\.ts$/, enforce: "pre", use: ["tslint-loader"] }
        ]
    },

    // tslint: {
    //     emitErrors: true,
    //     failOnHint: true
    // }
};