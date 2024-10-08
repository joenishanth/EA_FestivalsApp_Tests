import {Config } from 'protractor'

export let config:Config = {
  directConnect: true,
      chromeDriver: '../browserDrivers/chromedriver.exe',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  },

  framework:'custom',

  frameworkPath: require.resolve('protractor-cucumber-framework'),

  // Spec patterns are relative to the configuration file location passed
  // to protractor (in this example conf.js).
  // They may include glob patterns.
  
  specs: [
    '../features/**/*.feature' // accepts a glob
  ],

  cucumberOpts: {
    // require step definitions
    require: [
      './StepDefinitions/DemoTest.steps.js', // accepts a glob
      './StepDefinitions/festivals.UIOnly.steps.js'
    ]
  }
  
};