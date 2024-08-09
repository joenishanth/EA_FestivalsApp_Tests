import {Config } from 'protractor'

export let config:Config = {
  directConnect: true,
      chromeDriver: 'C:/Users/joeni/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver.exe',
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