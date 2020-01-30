"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var convertUnitToMs = require("milliseconds");
var parseMilliseconds = require("parse-ms");
var events_1 = require("events");
exports.createTimeStruct = function (milliseconds) {
    if (milliseconds === void 0) { milliseconds = 0; }
    var parsedTime = parseMilliseconds(milliseconds);
    return Object.assign({}, parsedTime, {
        formatted: exports.formatMilliseconds(milliseconds),
        raw: milliseconds,
        timestamp: Date.now()
    });
};
exports.formatMilliseconds = function (inputMs) {
    var _a = parseMilliseconds(inputMs), days = _a.days, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds, milliseconds = _a.milliseconds;
    var str = "";
    var dayHours = 0;
    if (days) {
        // str += `${days}d `;
        dayHours = days * 24;
    }
    if (hours + dayHours) {
        str += hours + dayHours + ":";
    }
    var paddedMinutes = String(minutes).padStart(2, "0");
    var paddedSeconds = String(seconds).padStart(2, "0");
    var tenths = milliseconds < 100 ? 0 : String(milliseconds).charAt(0);
    str += paddedMinutes + ":" + paddedSeconds + "." + tenths;
    return str;
};
exports.parseSeconds = function (seconds) {
    return parseMilliseconds(seconds * 1000);
};
exports.parseTimeString = function (timeString) {
    var ms = 0;
    var timeParts = timeString.split(":").filter(function (part) { return part.trim(); });
    if (timeParts.length === 3) {
        ms += convertUnitToMs.hours(parseInt(timeParts[0], 10));
        ms += convertUnitToMs.minutes(parseInt(timeParts[1], 10));
        ms += convertUnitToMs.seconds(parseFloat(timeParts[2]));
        return ms;
    }
    if (timeParts.length === 2) {
        ms += convertUnitToMs.minutes(parseInt(timeParts[0], 10));
        ms += convertUnitToMs.seconds(parseFloat(timeParts[1]));
        return ms;
    }
    if (timeParts.length === 1) {
        ms += convertUnitToMs.seconds(parseFloat(timeParts[0]));
        return ms;
    }
    throw new Error("Unexpected format of timeString argument: " + timeString);
};
var CountdownTimer = /** @class */ (function (_super) {
    tslib_1.__extends(CountdownTimer, _super);
    function CountdownTimer(endTime, tickRate) {
        if (tickRate === void 0) { tickRate = 100; }
        var _this = _super.call(this) || this;
        _this.interval = setInterval(function () {
            var currentTime = Date.now();
            var timeRemaining = Math.max(endTime - currentTime, 0);
            _this.emit("tick", exports.createTimeStruct(timeRemaining));
            if (timeRemaining <= 0) {
                _this.emit("done");
            }
        }, tickRate);
        return _this;
    }
    CountdownTimer.prototype.stop = function () {
        clearInterval(this.interval);
    };
    return CountdownTimer;
}(events_1.EventEmitter));
exports.CountdownTimer = CountdownTimer;
