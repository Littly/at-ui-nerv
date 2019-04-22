const webpack = require('webpack')
const path = require('path')
const ES3 = require('es3ify-webpack-plugin')
const autoprefixer = require('autoprefixer')
const coverage = String(process.env.COVERAGE) !== 'false'
const ci = String(process.env.CI).match(/^(1|true)$/gi)
const realBrowser = String(process.env.BROWSER).match(/^(1|true)$/gi)
const sauceLabs = realBrowser && ci
// const sauceLabsLaunchers = {
//   sl_win_chrome: {
//     base: 'SauceLabs',
//     browserName: 'chrome',
//     platform: 'Windows 10'
//   }
// }
const travisLaunchers = {
  chrome_travis: {
    base: 'Chrome',
    flags: ['--no-sandbox']
  }
}

const localBrowsers = /* realBrowser ? */ Object.keys(travisLaunchers) // : ['Chrome']

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-matchers'],

    // list of files / patterns to load in the browser
    files: [
      // 'browsers/karma.js',
      // './node_modules/es6-promise/dist/es6-promise.auto.min.js',
      './node_modules/babel-polyfill/dist/polyfill.js',
      // 'browsers/ie8.js',
      // 'browsers/polyfill.js',
      'src/**/__test__/**/*test.ts?(x)'
    ],

    specReporter: {
      failFast: false,
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: true, // do not print information about passed tests
      suppressSkipped: true // do not print information about skipped tests
    },

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/__test__/**/*test.ts?(x)': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'jasmine-diff'].concat(coverage ? ['coverage-istanbul'] : [], sauceLabs ? 'saucelabs' : []),
    coverageIstanbulReporter: {
      reports: [ 'text-summary', 'lcov', 'html' ],
      fixWebpackSourcePaths: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'lcov', subdir: '.' },
        {type: 'html'},
        { type: 'text-summary' }
      ]
    },
    browserLogOptions: { terminal: true },
    browserConsoleLogOptions: { terminal: true },

    browserNoActivityTimeout: 15 * 60 * 1000,
    browserDisconnectTimeout: 30 * 1000,
    browserDisconnectTolerance: 2,

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
    browsers: /* sauceLabs ? Object.keys(sauceLabsLaunchers) : */ localBrowsers,

    customLaunchers: /* sauceLabs ? sauceLabsLaunchers : */ travisLaunchers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1,

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        alias: {
          react: 'nervjs',
          'react-dom': 'nervjs',
          '@lib': path.resolve(__dirname, 'libs/')
          // nervjs: resolve('nerv'),
          // 'nerv-devtools': resolve('nerv-devtools'),
          // 'nerv-shared': resolve('nerv-shared'),
          // 'nerv-utils': resolve('nerv-utils'),
          // 'nerv-server': resolve('nerv-server'),
          // 'nerv-redux': resolve('nerv-redux')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        mainFields: ['main', 'module']
      },
      module: {
        rules: [
          {
            test: /\.(jsx|tsx)$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            },
            enforce: 'post',
            exclude: /node_modules|\.test\.tsx$/
          },
          {
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(ts|tsx)$/,
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  compilerOptions: {
                    target: 'es6',
                    module: 'es6'
                  }
                }
              }
            ]
          },
          {
            test: /\.(css|scss|sass)(\?.*)?$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    autoprefixer({
                      browsers: ['ie >= 9', 'Chrome >= 21', 'Firefox >= 1', 'Edge >= 13', 'last 3 versions'],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              },
              'sass-loader'
            ]
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          coverage: coverage,
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || ''),
          DISABLE_FLAKEY: !!String(process.env.FLAKEY).match(/^(0|false)$/gi)
        }),
        new ES3()
      ]
    },
    stats: 'errors-only',
    webpackMiddleware: {
      noInfo: true,
      stats: {
        errorDetails: true
      }
    }
  })
}
