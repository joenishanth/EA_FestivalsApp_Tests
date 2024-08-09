"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDuplicates = void 0;
function hasDuplicates(array) {
    return new Set(array).size !== array.length;
}
exports.hasDuplicates = hasDuplicates;
