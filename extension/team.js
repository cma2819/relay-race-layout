"use strict";
exports.__esModule = true;
exports.team = function (nodecg) {
    var MAX_TEAM_NUM = nodecg.bundleConfig.maxTeamCount || 4;
    var teamListRep = nodecg.Replicant("team-list", {
        defaultValue: []
    });
    var addTeam = function (team, cb) {
        if (teamListRep.value.length === MAX_TEAM_NUM) {
            if (cb) {
                cb("設定可能なチーム数の上限です.");
            }
            return;
        }
        team.players = removeHasEmptyName(team.players);
        if (!validateTeam(team)) {
            if (cb) {
                cb("追加されたチーム情報が不正です.");
            }
            return;
        }
        teamListRep.value.push(team);
        if (cb) {
            cb(null, "チーム情報を追加しました.");
        }
        return;
    };
    var removeTeam = function (idx, cb) {
        if (!(idx < teamListRep.value.length)) {
            if (cb) {
                cb("不正なインデックスが指定されました.");
            }
            return;
        }
        teamListRep.value.splice(idx, 1);
        if (cb) {
            cb(null, "チーム情報を削除しました.");
        }
    };
    var editTeam = function (_a, cb) {
        var idx = _a.idx, newTeam = _a.newTeam;
        if (!(idx < teamListRep.value.length)) {
            if (cb) {
                cb("設定可能なチーム数の上限です.");
            }
            return;
        }
        if (!validateTeam(newTeam)) {
            if (cb) {
                cb("設定されたチーム情報が不正です.");
            }
            return;
        }
        teamListRep.value[idx] = newTeam;
        if (cb) {
            cb(null, "チーム情報を編集しました.");
        }
        return;
    };
    var removeHasEmptyName = function (players) {
        return players.filter(function (player) { return player.name !== ""; });
    };
    var validateTeam = function (team) {
        if (team.name === "" || team.players.length === 0) {
            return false;
        }
        return true;
    };
    nodecg.listenFor("addTeam", addTeam);
    nodecg.listenFor("removeTeam", removeTeam);
    nodecg.listenFor("editTeam", editTeam);
};
