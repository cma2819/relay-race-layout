"use strict";
exports.__esModule = true;
var PlayerInfoStatus;
(function (PlayerInfoStatus) {
    PlayerInfoStatus["name"] = "name";
    PlayerInfoStatus["nico"] = "nico";
    PlayerInfoStatus["twitch"] = "twitch";
    PlayerInfoStatus["twitter"] = "twitter";
})(PlayerInfoStatus = exports.PlayerInfoStatus || (exports.PlayerInfoStatus = {}));
exports.graphics = function (nodecg) {
    var graphicRep = nodecg.Replicant("graphics", {
        defaultValue: {
            playerInfoStatus: "name",
            soundEnableIndex: -1,
            logoUrl: null,
            checkpointIndex: 0,
            checkpointIcons: {
                top: null,
                other: null
            }
        }
    });
    var relayRep = nodecg.Replicant("relay");
    var setPlayerInfoStatus = function (value) {
        try {
            graphicRep.value.playerInfoStatus = value;
        }
        catch (_a) {
            nodecg.log.error("Cannot set value " + value + " to playerInfoStatus.");
        }
    };
    var setSoundEnableIndex = function (index) {
        graphicRep.value.soundEnableIndex = index;
    };
    var setLogoUrl = function (url) {
        graphicRep.value.logoUrl = url;
    };
    var prevCheckpoint = function () {
        if (graphicRep.value.checkpointIndex > 0) {
            graphicRep.value.checkpointIndex--;
        }
        if (relayRep.value) {
            var checkpointCount_1 = 0;
            relayRep.value.runs.forEach(function (run) {
                checkpointCount_1 += run.segments.length;
            });
            if (checkpointCount_1 < graphicRep.value.checkpointIndex) {
                graphicRep.value.checkpointIndex = checkpointCount_1 - 1;
            }
        }
    };
    var nextCheckpoint = function () {
        graphicRep.value.checkpointIndex++;
    };
    var setCpIconTop = function (url) {
        graphicRep.value.checkpointIcons.top = url;
    };
    var setCpIconOther = function (url) {
        graphicRep.value.checkpointIcons.other = url;
    };
    nodecg.listenFor("graphics:playerInfoStatus", setPlayerInfoStatus);
    nodecg.listenFor("graphics:soundIndex", setSoundEnableIndex);
    nodecg.listenFor("graphics:logoUrl", setLogoUrl);
    nodecg.listenFor("graphics:prevCp", prevCheckpoint);
    nodecg.listenFor("graphics:nextCp", nextCheckpoint);
    nodecg.listenFor("graphics:cpIconTop", setCpIconTop);
    nodecg.listenFor("graphics:cpIconOther", setCpIconOther);
};
