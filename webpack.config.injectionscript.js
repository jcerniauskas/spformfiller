var webpack = require('webpack');

module.exports = {
    entry: {
        "injectionscript": "./app/scripts.ts/Chrome/injectionscript.ts",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/app/scripts",
        library: ["SPFormFiller", "[name]"],
        libraryTarget: "var"
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
            { test: /\.js$/, enforce: "pre", use: ["source-map-loader"] }
        ]
    }
};