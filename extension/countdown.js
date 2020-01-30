"use strict";
exports.__esModule = true;
var time_1 = require("./lib/time");
var countdownTimer;
exports.countdown = function (nodecg) {
    var countdownRep = nodecg.Replicant("countdown", {
        defaultValue: {
            time: time_1.createTimeStruct(0),
            running: false
        }
    });
    var logger = new nodecg.Logger("Countdown");
    var start = function () {
        if (countdownRep.value.running || !countdownRep.value.time) {
            return;
        }
        countdownRep.value.running = true;
        if (countdownTimer) {
            countdownTimer.stop();
            countdownTimer.removeAllListeners();
        }
        countdownTimer = new time_1.CountdownTimer(Date.now() + countdownRep.value.time.raw);
        countdownTimer.on("tick", function (remainingTimeStruct) {
            countdownRep.value.time = remainingTimeStruct;
        });
        logger.info("start");
    };
    var stop = function () {
        if (!countdownRep.value.running) {
            return;
        }
        countdownRep.value.running = false;
        if (countdownTimer) {
            countdownTimer.stop();
        }
        logger.info("stop");
    };
    var edit = function (editTime, cb) {
        try {
            var durationMs = time_1.parseTimeString(editTime);
            stop();
            countdownRep.value.time = time_1.createTimeStruct(durationMs);
            cb(null, "タイムを編集しました.");
            logger.info("edit to " + editTime);
        }
        catch (_a) {
            cb("文字列をタイムに変換できません.");
            return;
        }
    };
    nodecg.listenFor("startCountdown", start);
    nodecg.listenFor("stopCountdown", stop);
    nodecg.listenFor("editCountdown", edit);
};
