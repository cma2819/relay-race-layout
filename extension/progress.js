"use strict";
exports.__esModule = true;
var time_1 = require("./lib/time");
exports.progress = function (nodecg) {
    var relayRep = nodecg.Replicant("relay");
    var teamListRep = nodecg.Replicant("team-list");
    var progressRep = nodecg.Replicant("progress", {
        defaultValue: []
    });
    var split = function (idx) {
        if (!relayRep.value) {
            return;
        }
        var beforeNext = progressRep.value[idx].segments.next || null;
        var currentSegments = beforeNext;
        var beforeCurrent = progressRep.value[idx].segments.current;
        if (beforeCurrent === null) {
            return;
        }
        var prevSegments = beforeCurrent;
        var nextSegments;
        if (beforeNext === null) {
            nextSegments = null;
        }
        else {
            var nextRun = relayRep.value.runs[beforeNext.runIndex];
            if (beforeNext.segIndex + 1 < nextRun.segments.length) {
                nextSegments = {
                    runIndex: beforeNext.runIndex,
                    segIndex: beforeNext.segIndex + 1
                };
            }
            else {
                if (beforeNext.runIndex + 1 < relayRep.value.runs.length) {
                    nextSegments = {
                        runIndex: beforeNext.runIndex + 1,
                        segIndex: 0
                    };
                }
                else {
                    nextSegments = null;
                }
            }
        }
        progressRep.value[idx].segments = {
            prev: prevSegments,
            current: currentSegments,
            next: nextSegments
        };
        var time = nodecg.readReplicant("stopwatch").time;
        if (!progressRep.value[idx].splits[beforeCurrent.runIndex]) {
            progressRep.value[idx].splits[beforeCurrent.runIndex] = [];
        }
        var totalTime = Object.assign({}, time);
        var runTime;
        if (beforeCurrent.runIndex > 0) {
            var beforeRunLastIdx = progressRep.value[idx].splits[beforeCurrent.runIndex - 1].length - 1;
            var beforeRunLastRaw = progressRep.value[idx].splits[beforeCurrent.runIndex - 1][beforeRunLastIdx].total.raw;
            var runTimeMs = time.raw - beforeRunLastRaw;
            runTime = time_1.createTimeStruct(runTimeMs);
        }
        else {
            runTime = Object.assign({}, time);
        }
        progressRep.value[idx].splits[beforeCurrent.runIndex][beforeCurrent.segIndex] = {
            total: totalTime,
            run: runTime
        };
        nodecg.sendMessage("event:showSplit", {
            teamIdx: idx,
            segment: relayRep.value.runs[beforeCurrent.runIndex].segments[beforeCurrent.segIndex],
            time: runTime.formatted
        });
        var timestampDate = new Date(runTime.timestamp);
        nodecg.sendMessage("gas:split", {
            teamId: idx + 1,
            runId: beforeCurrent.runIndex + 1,
            segmentId: beforeCurrent.segIndex + 1,
            formatted: runTime.formatted,
            raw: runTime.raw,
            timestamp: timestampDate.getFullYear() +
                "-" +
                (timestampDate.getMonth() + 1) +
                "-" +
                timestampDate.getDate() +
                " " +
                timestampDate.getHours() +
                ":" +
                timestampDate.getMinutes() +
                ":" +
                timestampDate.getSeconds() +
                "." +
                timestampDate.getMilliseconds()
        });
    };
    var resume = function (idx) {
        if (!relayRep.value) {
            return;
        }
        var beforePrev = progressRep.value[idx].segments.prev || null;
        if (beforePrev === null) {
            return;
        }
        var currentSegments = beforePrev;
        var beforeCurrent = progressRep.value[idx].segments.current;
        var nextSegments = beforeCurrent;
        var prevSegments;
        if (beforePrev.segIndex - 1 >= 0) {
            prevSegments = {
                runIndex: beforePrev.runIndex,
                segIndex: beforePrev.segIndex - 1
            };
        }
        else {
            if (beforePrev.runIndex - 1 >= 0) {
                var prevRun = relayRep.value.runs[beforePrev.runIndex - 1];
                prevSegments = {
                    runIndex: beforePrev.runIndex - 1,
                    segIndex: prevRun.segments.length - 1
                };
            }
            else {
                prevSegments = null;
            }
        }
        progressRep.value[idx].segments = {
            prev: prevSegments,
            current: currentSegments,
            next: nextSegments
        };
        progressRep.value[idx].splits[currentSegments.runIndex].splice(currentSegments.segIndex, 1);
    };
    var edit = function (_a, cb) {
        var idx = _a.idx, runIndex = _a.runIndex, segIndex = _a.segIndex, time = _a.time;
        try {
            var ms = time_1.parseTimeString(time);
            var newTime = time_1.createTimeStruct(ms);
            progressRep.value[idx].splits[runIndex][segIndex].total = newTime;
            if (runIndex > 0) {
                var beforeRunLastIdx = progressRep.value[idx].splits[runIndex - 1].length - 1;
                var beforeRunLastRaw = progressRep.value[idx].splits[runIndex - 1][beforeRunLastIdx].total
                    .raw;
                var runTimeMs = ms - beforeRunLastRaw;
                progressRep.value[idx].splits[runIndex][segIndex].run = time_1.createTimeStruct(runTimeMs);
            }
            else {
                progressRep.value[idx].splits[runIndex][segIndex].run = newTime;
            }
        }
        catch (_b) {
            cb("文字列をタイムに変換できません.");
        }
    };
    var config = nodecg.bundleConfig;
    var reset = function () {
        // Disable reset when config set
        if (config.resetDisabled) {
            return;
        }
        if (!relayRep.value || !teamListRep.value) {
            return;
        }
        var teamLength = teamListRep.value.length;
        var prev = null;
        var current = {
            runIndex: 0,
            segIndex: 0
        };
        var next;
        if (relayRep.value.runs[0].segments.length > 1) {
            next = {
                runIndex: 0,
                segIndex: 1
            };
        }
        else if (relayRep.value.runs.length > 1) {
            next = {
                runIndex: 1,
                segIndex: 0
            };
        }
        else {
            next = null;
        }
        var newProgress = [];
        for (var i = 0; i < teamLength; i++) {
            newProgress.push(Object.assign({}, {
                segments: Object.assign({}, {
                    prev: prev,
                    current: current,
                    next: next
                }),
                splits: []
            }));
        }
        progressRep.value = newProgress;
    };
    nodecg.listenFor("split", split);
    nodecg.listenFor("resumeSplit", resume);
    nodecg.listenFor("editSplit", edit);
    nodecg.listenFor("resetSplit", reset);
};
