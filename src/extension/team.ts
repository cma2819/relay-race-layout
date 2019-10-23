import { NodeCG } from "./nodecg";
import { Team } from "../nodecg/team";

export const team = (nodecg: NodeCG) => {
  const MAX_TEAM_NUM = nodecg.bundleConfig.maxTeamCount || 4;

  const teamListRep = nodecg.Replicant("team-list", {
    defaultValue: []
  });

  const addTeam = (team: Team, cb: any): void => {
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

  const removeTeam = (idx: number, cb: any): void => {
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

  const editTeam = (
    { idx, newTeam }: { idx: number; newTeam: Team },
    cb: any
  ): void => {
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

  const removeHasEmptyName = (
    players: { name: string }[]
  ): { name: string }[] => {
    return players.filter(player => player.name !== "");
  };

  const validateTeam = (team: Team): boolean => {
    if (team.name === "" || team.players.length === 0) {
      return false;
    }
    return true;
  };

  nodecg.listenFor("addTeam", addTeam);
  nodecg.listenFor("removeTeam", removeTeam);
  nodecg.listenFor("editTeam", editTeam);
};
