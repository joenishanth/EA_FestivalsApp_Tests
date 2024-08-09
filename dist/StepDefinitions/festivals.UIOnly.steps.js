"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai = __importStar(require("chai"));
const chai_sorted_1 = __importDefault(require("chai-sorted"));
const assertion_utils_1 = require("../utils/assertion.utils");
const axios_1 = __importDefault(require("axios"));
const ObjectMapper_1 = require("../Helpers/ObjectMapper");
chai.use(chai_sorted_1.default);
const expect = chai.expect;
const festivalsPage = new FestivalsPage_1.FestivalsPage();
let bandNameEleLst;
let festivalData;
let expUIData;
(0, cucumber_1.Given)('I navigate to EAFestivals  website', { timeout: 15 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get('http://localhost:4200/festivals');
        bandNameEleLst = yield festivalsPage.bandNameEleLst();
        //Fail the test if the page is bank
        expect(bandNameEleLst).to.be.not.empty;
    });
});
(0, cucumber_1.Given)('I have retrieved the Festival API payload', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get('http://localhost:4200/api/v1/festivals')
            .then(response => {
            expect(response.status).equals(200);
            festivalData = response.data;
        });
        //Fail the test if the payload is empty
        expect(festivalData).to.be.an('array').that.is.not.empty;
        //Contruct the Data as per it is displayed on the UI
        expUIData = (0, ObjectMapper_1.FestivalObjectMapper)(festivalData);
    });
});
(0, cucumber_1.Then)('I should see Band Names in Alphabetical Order', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let BandNames = [];
        // Get the names of the Bands in the order as displayed
        for (const bandNameEle of bandNameEleLst) {
            let bandName = yield festivalsPage.getTextFromCurrentNode(bandNameEle);
            BandNames.push(bandName);
        }
        //Assert the Bands are sorted in ascending order
        expect(BandNames).to.be.sorted();
    });
});
(0, cucumber_1.Then)('I should not see duplicate Band Names', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let BandNames = [];
        // Get the names of the Bands in the order as displayed
        for (const bandNameEle of bandNameEleLst) {
            let bandName = yield festivalsPage.getTextFromCurrentNode(bandNameEle);
            BandNames.push(bandName);
        }
        //Assert the Bands are not repeated in the list
        expect((0, assertion_utils_1.hasDuplicates)(BandNames)).to.be.false;
    });
});
(0, cucumber_1.Then)('I should not see Bands with blank festival locations', { timeout: 15 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        let bandWithEmptyFestivalRows = [];
        //Get the list of Festival Names for each band
        for (const ele of bandNameEleLst) {
            let bandName = yield festivalsPage.getTextFromCurrentNode(ele);
            let FestivalNameEleLst = yield ele.all(protractor_1.by.xpath('.//li'));
            for (const festivalNameEle of FestivalNameEleLst) {
                let festivalName = yield festivalNameEle.getText();
                //Add the band in the bandWithEmptyFestivalRows if it has got an blank festival row
                if (festivalName === '') {
                    bandWithEmptyFestivalRows.push(bandName);
                }
            }
        }
        //Assert the there are no bands with blank festival row
        expect(bandWithEmptyFestivalRows, `The Bands: "${bandWithEmptyFestivalRows}" dont have any Festival location`).to.be.empty;
    });
});
(0, cucumber_1.Then)('I should see Festival Names sorted in Alphabetical Order', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let bandsWithUnsortedFestivals = [];
        //Get the list of Festival Names for each band
        for (const ele of bandNameEleLst) {
            let festivalNames = [];
            let bandName = yield festivalsPage.getTextFromCurrentNode(ele);
            let FestivalNamesEleLst = yield ele.all(protractor_1.by.xpath('.//li'));
            for (const fn of FestivalNamesEleLst) {
                let festivalName = yield fn.getText();
                festivalNames.push(festivalName);
            }
            //Create an of BandNames that don't have festival names  sorted
            try {
                expect(festivalNames).to.be.sorted();
            }
            catch (error) {
                bandsWithUnsortedFestivals.push(bandName);
            }
        }
        expect(bandsWithUnsortedFestivals, `The Bands: "${bandsWithUnsortedFestivals}" dont have Festival Names sorted`).to.be.empty;
    });
});
(0, cucumber_1.Then)('I should see the count of Band names matching', function () {
    return __awaiter(this, void 0, void 0, function* () {
        expect(bandNameEleLst.length).to.be.equal(expUIData.length);
    });
});
