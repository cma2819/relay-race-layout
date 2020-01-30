"use strict";
exports.__esModule = true;
var liveSplitCore = require("livesplit-core");
var TimeUtils = require("./lib/time");
var LS_TIMER_PHASE = {
    NotRunning: 0,
    Running: 1,
    Ended: 2,
    Paused: 3
};
exports.timekeeping = function (nodecg) {
    // Logger
    var logger = new nodecg.Logger("Timekeeping");
    // Replicant
    var stopwatch = nodecg.Replicant("stopwatch", {
        defaultValue: {
            state: "not_started",
            time: TimeUtils.createTimeStruct(0)
        }
    });
    // Setting
    var lsRun = liveSplitCore.Run["new"]();
    var segment = liveSplitCore.Segment["new"]("finish");
    lsRun.pushSegment(segment);
    var timer = liveSplitCore.Timer["new"](lsRun);
    var start = function (force) {
        logger.info("start");
        if (!timer) {
            return;
        }
        if (!force && stopwatch.value.state === "running") {
            return;
        }
        stopwatch.value.state = "running";
        if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
            timer.start();
            initGameTime();
        }
        else {
            timer.resume();
        }
    };
    var initGameTime = function () {
        if (timer) {
            liveSplitCore.TimeSpan.fromSeconds(0)["with"](function (t) { return timer.setLoadingTimes(t); });
            timer.initializeGameTime();
            var existingSeconds = stopwatch.value.time.raw / 1000;
            liveSplitCore.TimeSpan.fromSeconds(existingSeconds)["with"](function (t) {
                return timer.setGameTime(t);
            });
        }
    };
    var tick = function () {
        if (!timer || stopwatch.value.state !== "running") {
            return;
        }
        var time = timer.currentTime();
        var gameTime = time.gameTime();
        if (!gameTime) {
            return;
        }
        stopwatch.value.time = TimeUtils.createTimeStruct(gameTime.totalSeconds() * 1000);
    };
    var pause = function () {
        if (timer) {
            logger.info("pause");
            timer.pause();
            stopwatch.value.state = "paused";
        }
    };
    var config = nodecg.bundleConfig;
    var reset = function () {
        // Disable reset when config set
        if (config.resetDisabled) {
            return;
        }
        if (timer) {
            logger.info("reset");
            pause();
            timer.reset(true);
            stopwatch.value.time = TimeUtils.createTimeStruct();
            stopwatch.value.state = "not_started";
        }
    };
    var edit = function (formatted, cb) {
        try {
            reset();
            stopwatch.value.time = TimeUtils.createTimeStruct(TimeUtils.parseTimeString(formatted));
            cb(null, "タイムを編集しました.");
        }
        catch (err) {
            cb("文字列をタイムに変換できません.");
        }
    };
    if (timer && stopwatch.value) {
        // Load the existing time and start the stopwatch at that.
        timer.start();
        timer.pause();
        initGameTime();
        if (stopwatch.value.state === "running") {
            var missedTime = Date.now() - stopwatch.value.time.timestamp;
            var previousTime = stopwatch.value.time.raw;
            var timeOffset = previousTime + missedTime;
            nodecg.log.info("Recovered %s seconds of lost time.", (missedTime / 1000).toFixed(2));
            start(true);
            liveSplitCore.TimeSpan.fromSeconds(timeOffset / 1000)["with"](function (t) {
                return timer.setGameTime(t);
            });
        }
    }
    nodecg.listenFor("startTimer", start);
    nodecg.listenFor("stopTimer", pause);
    nodecg.listenFor("resetTimer", reset);
    nodecg.listenFor("editTimer", edit);
    setInterval(tick, 100); // 10 times per second.
};
