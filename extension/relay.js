"use strict";
exports.__esModule = true;
var Color = require("color");
var util_1 = require("./lib/util");
exports.relay = function (nodecg) {
    var relayRep = nodecg.Replicant("relay", {
        defaultValue: {
            name: "",
            runs: [],
            color: "#bcbcff"
        }
    });
    var setRelayInfo = function (info, cb) {
        try {
            Color(info.color);
        }
        catch (e) {
            cb("設定されたテーマカラーが不正です.");
            return;
        }
        relayRep.value.name = info.name;
        relayRep.value.color = info.color;
        cb(null, "リレー情報を設定しました.");
    };
    var addRun = function (run, cb) {
        run.segments = util_1.removeEmpty(run.segments);
        if (!validateRun(run)) {
            if (cb) {
                cb("追加されたゲーム情報が不正です.");
            }
            return;
        }
        relayRep.value.runs.push(run);
        if (cb) {
            cb(null, "ゲーム情報を追加しました.");
        }
        return;
    };
    var removeRun = function (idx, cb) {
        if (!(idx < relayRep.value.runs.length)) {
            if (cb) {
                cb("不正なインデックスが指定されました.");
            }
            return;
        }
        relayRep.value.runs.splice(idx, 1);
        if (cb) {
            cb(null, "ゲーム情報を削除しました.");
        }
    };
    var editRun = function (_a, cb) {
        var idx = _a.idx, newRun = _a.newRun;
        if (!(idx < relayRep.value.runs.length)) {
            if (cb) {
                cb("不正なインデックスが指定されました.");
            }
            return;
        }
        newRun.segments = util_1.removeEmpty(newRun.segments);
        if (!validateRun(newRun)) {
            if (cb) {
                cb("設定されたゲーム情報が不正です.");
            }
            return;
        }
        relayRep.value.runs[idx] = newRun;
        if (cb) {
            cb(null, "ゲーム情報を編集しました.");
        }
        return;
    };
    var validateRun = function (run) {
        if (run.game === "" || run.category === "" || run.segments.length === 0) {
            return false;
        }
        return true;
    };
    nodecg.listenFor("setRelayInfo", setRelayInfo);
    nodecg.listenFor("addRun", addRun);
    nodecg.listenFor("removeRun", removeRun);
    nodecg.listenFor("editRun", editRun);
};
