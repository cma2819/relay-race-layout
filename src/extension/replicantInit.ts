import { NodeCG } from "./nodecg";
import * as fs from "fs";
import * as path from "path";
import { Relay, TeamList } from "../nodecg/replicants";

export const replicantInit = (nodecg: NodeCG) => {
  const jsonAssetsRep = nodecg.Replicant("assets:initial-data", {
    defaultValue: []
  });
  const relayRep = nodecg.Replicant("relay");
  const teamListRep = nodecg.Replicant("team-list");

  const setInitialData = async (assetIdx: number, cb: any) => {
    const nodecgRoot = process.cwd();
    const jsonFile = await fs.readFileSync(
      path.join(nodecgRoot, jsonAssetsRep.value[assetIdx].url)
    );
    const jsonReplicant = JSON.parse(jsonFile.toString()).replicants;
    nodecg.log.info(jsonFile.toString());

    const defaultRelay: Relay = {
      name: "",
      runs: []
    };
    const defaultTeamList: TeamList = [];
    relayRep.value = jsonReplicant["relay"] || defaultRelay;
    teamListRep.value = jsonReplicant["team-list"] || defaultTeamList;
    cb(null, "イベント情報を初期化しました.");
  };

  const getInitialData = (_: any, cb: any) => {
    const initialData = {
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
