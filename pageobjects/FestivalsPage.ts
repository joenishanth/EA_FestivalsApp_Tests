import { by, element, ElementFinder } from "protractor";

export class FestivalsPage {

    public async bandNameEleLst() { return await element.all(by.xpath('//app-festivals/ol/li')) }

    public async getTextFromCurrentNode(ele: ElementFinder): Promise<string> {
        let rn = await ele.getText();
        let rn1:string = rn.replace(await ele.element(by.xpath('./*')).getText(),'');
        return rn1;
    }


}