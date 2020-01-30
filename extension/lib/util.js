"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var fs = require("fs");
exports.removeEmpty = function (strs) {
    return strs.filter(function (str) { return str !== ""; });
};
exports.readFile = function (path) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.readFileSync(path)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
