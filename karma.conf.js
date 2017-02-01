// Karma configuration
// Generated on Fri Dec 30 2016 18:37:52 GMT+0200 (FLE Standard Time)

var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './app',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: '../node_modules/reflect-metadata/Reflect.js', included: true, watched: false }, // this is necessary for InversifyJS DI container to work
      { pattern: '../node_modules/jquery/dist/jquery.min.js', included: true, watched: false }, // this is necessary for jasmine-jquery fixtures in tests to work
      { pattern: '../node_modules/jasmine-jquery/lib/jasmine-jquery.js', included: true, watched: false }, // this is necessary for jasmine-jquery fixtures in tests to work
      { pattern: 'scripts.ts/test/FixtureSetup.ts', included: true, watched: true }, // this configures jasmine-jquery settings
      { pattern: 'scripts.ts/**/*.html', included: false, watched: true }, // this includes actual fixtures
      { pattern: 'scripts.ts/**/*.test.ts', included: true, watched: true }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "scripts.ts/test/FixtureSetup.ts": ["webpack"],
        "scripts.ts/**/*.test.ts": ["webpack"]
    },

    webpack: {
      devtool: 'source-map',
      resolve: {
        extensions: ['', '.ts', '.js']
      },
      module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.ts$/, loader: "awesome-typescript-loader" }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" },
        ]
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin({
          filename: null, // if no value is provided the sourcemap is inlined
          test: /\.(ts|js)($|\?)/i // process .js and .ts files only
        })
      ],
      node: {
        fs: 'empty'
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
