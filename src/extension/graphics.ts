import { NodeCG } from "./nodecg";

export enum PlayerInfoStatus {
  name = "name",
  nico = "nico",
  twitch = "twitch",
  twitter = "twitter"
}

export const graphics = (nodecg: NodeCG) => {
  const graphicRep = nodecg.Replicant("graphics", {
    defaultValue: {
      playerInfoStatus: "name",
      soundEnableIndex: -1
    }
  });

  const setPlayerInfoStatus = (value: PlayerInfoStatus) => {
    try {
      graphicRep.value.playerInfoStatus = value;
    } catch {
      nodecg.log.error("Cannot set value " + value + " to playerInfoStatus.");
    }
  };

  const setSoundEnableIndex = (index: number) => {
    graphicRep.value.soundEnableIndex = index;
  };

  nodecg.listenFor("graphics:playerInfoStatus", setPlayerInfoStatus);
  nodecg.listenFor("graphics:soundIndex", setSoundEnableIndex);
};
