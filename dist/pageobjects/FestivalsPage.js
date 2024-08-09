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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FestivalsPage = void 0;
const protractor_1 = require("protractor");
class FestivalsPage {
    bandNameEleLst() {
        return __awaiter(this, void 0, void 0, function* () { return yield protractor_1.element.all(protractor_1.by.xpath('//app-festivals/ol/li')); });
    }
    getTextFromCurrentNode(ele) {
        return __awaiter(this, void 0, void 0, function* () {
            let rn = yield ele.getText();
            let rn1 = rn.replace(yield ele.element(protractor_1.by.xpath('./*')).getText(), '');
            return rn1;
        });
    }
}
exports.FestivalsPage = FestivalsPage;
