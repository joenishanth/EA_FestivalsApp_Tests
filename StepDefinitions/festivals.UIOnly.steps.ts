import { Given, When, Then } from 'cucumber';
import { browser, element, by, ElementFinder } from 'protractor';
import { FestivalsPage } from '../pageobjects/FestivalsPage'

import * as chai from 'chai';
import chaiSorted from 'chai-sorted';
import { hasDuplicates } from '../utils/assertion.utils';
import axios from 'axios';
import { FestivalObjectMapper } from '../Helpers/ObjectMapper';

chai.use(chaiSorted);
const expect = chai.expect;

const festivalsPage = new FestivalsPage();
let bandNameEleLst: ElementFinder[];
let festivalData: festivals[];
let expUIData: UIDataFormat[];

Given('I navigate to EAFestivals  website', { timeout: 15 * 1000 }, async function () {
    await browser.get('http://localhost:4200/festivals')
    bandNameEleLst = await festivalsPage.bandNameEleLst();

    //Fail the test if the page is bank
    expect(bandNameEleLst).to.be.not.empty
})

Given('I have retrieved the Festival API payload', async function () {
    const response = await axios.get('http://localhost:4200/api/v1/festivals')
        .then(response => {
            expect(response.status).equals(200);
            festivalData = response.data
        })
    //Fail the test if the payload is empty
    expect(festivalData).to.be.an('array').that.is.not.empty

    //Contruct the Data as per it is displayed on the UI
    expUIData = FestivalObjectMapper(festivalData);
})

Then('I should see Band Names in Alphabetical Order', async function () {
    let BandNames: string[] = [];

    // Get the names of the Bands in the order as displayed
    for (const bandNameEle of bandNameEleLst) {
        let bandName = await festivalsPage.getTextFromCurrentNode(bandNameEle);
        BandNames.push(bandName);
    }

    //Assert the Bands are sorted in ascending order
    expect(BandNames).to.be.sorted();
});

Then('I should not see duplicate Band Names', async function () {
    let BandNames: string[] = [];

    // Get the names of the Bands in the order as displayed
    for (const bandNameEle of bandNameEleLst) {
        let bandName = await festivalsPage.getTextFromCurrentNode(bandNameEle);
        BandNames.push(bandName);
    }

    //Assert the Bands are not repeated in the list
    expect(hasDuplicates(BandNames)).to.be.false;
})

Then('I should not see Bands with blank festival locations', { timeout: 15 * 1000 }, async function () {
    let bandWithEmptyFestivalRows: string[] = [];

    //Get the list of Festival Names for each band
    for (const ele of bandNameEleLst) {
        let bandName = await festivalsPage.getTextFromCurrentNode(ele);
        let FestivalNameEleLst = await ele.all(by.xpath('.//li'));

        for (const festivalNameEle of FestivalNameEleLst) {
            let festivalName = await festivalNameEle.getText();

            //Add the band in the bandWithEmptyFestivalRows if it has got an blank festival row
            if (festivalName === '') {
                bandWithEmptyFestivalRows.push(bandName);
            }
        }
    }

    //Assert the there are no bands with blank festival row
    expect(bandWithEmptyFestivalRows, `The Bands: "${bandWithEmptyFestivalRows}" dont have any Festival location`).to.be.empty;
})

Then('I should see Festival Names sorted in Alphabetical Order', async function () {

    let bandsWithUnsortedFestivals: string[] = [];

    //Get the list of Festival Names for each band
    for (const ele of bandNameEleLst) {
        let festivalNames = [];

        let bandName = await festivalsPage.getTextFromCurrentNode(ele);
        let FestivalNamesEleLst = await ele.all(by.xpath('.//li'));

        for (const fn of FestivalNamesEleLst) {
            let festivalName = await fn.getText();
            festivalNames.push(festivalName);
        }

        //Create an of BandNames that don't have festival names  sorted
        try {
            expect(festivalNames).to.be.sorted();
        } catch (error) {
            bandsWithUnsortedFestivals.push(bandName)
        }
    }
    expect(bandsWithUnsortedFestivals, `The Bands: "${bandsWithUnsortedFestivals}" dont have Festival Names sorted`).to.be.empty;

});

Then('I should see the count of Band names matching', async function () {
    expect(bandNameEleLst.length).to.be.equal(expUIData.length);
});
