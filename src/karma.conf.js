// Karma configuration file, see link for more information
// https://karma-runner.github.io/3.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-tfs-reporter')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      client: {
        jasmine: {
          random: false
        }
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly', 'tfs'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'tfs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true,
    retryLimit: 3,
    browserDisconnectTimeout: 120000,
    browserDisconnectTolerance: 10,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,
    customLaunchers: {
      'ChromeHeadless': {
        base: 'Chrome',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222']
      }
    },
    tfsReporter: {
      outputDir: 'test_results',
      outputFile: 'test_results-${date}.xml'
    },
    singleRun: false
  });
};
