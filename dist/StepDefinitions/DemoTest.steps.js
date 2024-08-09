"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
const FestivalsPage_1 = require("../pageobjects/FestivalsPage");
const axios_1 = __importDefault(require("axios"));
const chai_1 = require("chai");
const festivalsPage = new FestivalsPage_1.FestivalsPage();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
cucumber_1.Given('I navigate to Julimer website', { timeout: 15 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get('http://localhost:4200/festivals');
        let title = yield protractor_1.browser.getTitle();
        console.log('The title of the page is:' + title);
        let festivalData = [];
        let actRecordLabelName = [];
        yield sleep(5000);
        // Actual Festival Names
        let actualRecordLabels = yield protractor_1.element.all(protractor_1.by.xpath('//app-festivals//ol/li'));
        // assert actual list is not empty
        chai_1.expect(actualRecordLabels, 'The record labels displayed on UI').to.be.an('array').that.is.not.empty;
        console.log('Count of RecordLabels:' + actualRecordLabels.length);
        for (const ele of actualRecordLabels) {
            let recordLabelName = yield festivalsPage.getTextFromCurrentNode(ele);
            console.log('this is test: ' + recordLabelName);
            actRecordLabelName.push(recordLabelName);
        }
        // await sleep(5000);
        console.log('actualRecordLabelNames' + actRecordLabelName);
        console.log('Count XXX: ' + actRecordLabelName);
        chai_1.expect(actRecordLabelName).to.have.lengthOf(actualRecordLabels.length);
        console.log('*****************************************************************************');
        //****************************************************************************************************
        // All the festival api to get the expected data for verification
        yield sleep(5000);
        const response = yield axios_1.default.get('http://localhost:4200/api/v1/festivals')
            .then(response => {
            chai_1.expect(response.status).equals(200);
            festivalData = response.data;
        });
        // assert the api response is not empty
        console.log('festivals data:' + festivalData.length);
        chai_1.expect(festivalData).to.be.an('array').that.is.not.empty;
        let festivalNames = [];
        let recordLabels = [];
        // build FestivalNames and RecordLabels List
        festivalData.forEach(element => {
            festivalNames.push(element.name);
            element.bands.forEach(b => {
                if (b.recordLabel === '') {
                    b.recordLabel = 'Un Labelled Troops';
                }
                console.log(b.recordLabel);
                recordLabels.push(b.recordLabel);
                recordLabels.sort();
            });
            festivalNames.sort();
        });
        //#region Logic to convert API object Type to UI Object Type for verification
        let uniqueRecordLabels = recordLabels.filter((item, index) => recordLabels.indexOf(item) === index);
        let actualDataCont = [];
        // Create a new PortalData
        uniqueRecordLabels.forEach(rl => {
            let newRecordData = {
                recordLabel: rl,
                bands: []
            };
            actualDataCont.push(newRecordData);
            // Iterate by festival names (sorted in ascending order)
            for (let i = 0; i < festivalNames.length; i++) {
                let f = festivalData.filter(x => x.name === festivalNames[i])[0];
                //Sorts the bands object in ascending order
                f.bands.sort((a, b) => a.name.localeCompare(b.name));
                //iterate trough each band
                for (let j = 0; j < f.bands.length; j++) {
                    //Add/update band if the band object has record label
                    if (f.bands[j].recordLabel === rl) {
                        // Add just festival name if the band name aleardy exists
                        if (newRecordData.bands.some(b => b.name === f.bands[j].name)) {
                            newRecordData.bands.filter(b => b.name === f.bands[j].name)[0].festivals.push(festivalNames[i]);
                        }
                        //Add band object including festival name
                        else {
                            let newband = {
                                name: f.bands[j].name,
                                festivals: [festivalNames[i]]
                            };
                            newRecordData.bands.push(newband);
                        }
                    }
                }
            }
        });
        //#endregion
        // console.log('Data to be watched' + JSON.stringify(actualDataCont))
        chai_1.expect(recordLabels).to.be.an('array').that.is.not.empty;
        //console.log('ExpectedRecordLabels:' + recordLabels);
        // // console.log('Actual festivals data:' + actFest.length);
        // // console.log('festivals data:' + actRecordLabelName);
        // await sleep(5000);
    });
});
