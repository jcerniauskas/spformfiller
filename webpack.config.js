var webpack = require('webpack');

module.exports = {
    entry: {
        "background": "./app/scripts.ts/Chrome/background.ts",
        "chromereload": "./app/scripts.ts/Chrome/chromereload.ts",
        "contentscript": "./app/scripts.ts/Chrome/contentscript.ts",
        "options": "./app/scripts.ts/Chrome/options.ts",
        "popup": "./app/scripts.ts/Chrome/popup.ts"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/app/scripts",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.ts$/, loader: "awesome-typescript-loader" },
            { test: /\.json$/, loader: 'json' }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" },
            // Linter for TS
            { test: /\.ts$/, loader: "tslint" }
        ]
    },

    // tslint: {
    //     emitErrors: true,
    //     failOnHint: true
    // }
};