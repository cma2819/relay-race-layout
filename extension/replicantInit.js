"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var fs = require("fs");
var path = require("path");
exports.replicantInit = function (nodecg) {
    var jsonAssetsRep = nodecg.Replicant("assets:initial-data", {
        defaultValue: []
    });
    var relayRep = nodecg.Replicant("relay");
    var teamListRep = nodecg.Replicant("team-list");
    var setInitialData = function (assetIdx, cb) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var nodecgRoot, jsonFile, jsonReplicant, defaultRelay, defaultTeamList;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nodecgRoot = process.cwd();
                    return [4 /*yield*/, fs.readFileSync(path.join(nodecgRoot, jsonAssetsRep.value[assetIdx].url))];
                case 1:
                    jsonFile = _a.sent();
                    jsonReplicant = JSON.parse(jsonFile.toString()).replicants;
                    defaultRelay = {
                        name: "",
                        runs: [],
                        color: ""
                    };
                    defaultTeamList = [];
                    relayRep.value = jsonReplicant["relay"] || defaultRelay;
                    teamListRep.value = jsonReplicant["team-list"] || defaultTeamList;
                    cb(null, "イベント情報を初期化しました.");
                    return [2 /*return*/];
            }
        });
    }); };
    var getInitialData = function (_, cb) {
        var initialData = {
            replicants: {
                relay: relayRep.value || {},
                "team-list": teamListRep.value || {}
            }
        };
        cb(null, initialData);
    };
    nodecg.listenFor("setInitialData", setInitialData);
    nodecg.listenFor("getInitialData", getInitialData);
};
