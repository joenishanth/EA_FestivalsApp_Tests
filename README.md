# The framework was built using Protractor and Cucumberjs

#Prerequsite:
1. Nodejs V.12 is required to compile and run the tests
2. Chromedriver V.127 is referenced. If your system has a different please download the correct version of Chromedriver and place it inside the browserDrivers folder
3. Install the vscode extension: Cucumber (Gherkin) Full Support
4. Add the following properties in the vscode settings
        "cucumberautocomplete.steps": [
        "stepDefinitions/*.ts",
        "node_modules/qa-lib/src/step_definitions/*.js"]

## Steps to run the tests:
1. npm install
2. npm run compile
3. nom run webdriver
4. npm run start-webdriver
5. npm run test

## Framework setup:
1. Tests/scenarios can be found inside "features" folder
2. Implementation of steps can be found in "stepDefinitions" folder

