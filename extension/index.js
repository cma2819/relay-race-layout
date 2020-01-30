"use strict";
var countdown_1 = require("./countdown");
var progress_1 = require("./progress");
var relay_1 = require("./relay");
var team_1 = require("./team");
var replicantInit_1 = require("./replicantInit");
var timekeeping_1 = require("./timekeeping");
var graphics_1 = require("./graphics");
var gas_1 = require("./gas");
module.exports = function (nodecg) {
    countdown_1.countdown(nodecg);
    relay_1.relay(nodecg);
    team_1.team(nodecg);
    progress_1.progress(nodecg);
    replicantInit_1.replicantInit(nodecg);
    timekeeping_1.timekeeping(nodecg);
    graphics_1.graphics(nodecg);
    gas_1.gas(nodecg);
};
