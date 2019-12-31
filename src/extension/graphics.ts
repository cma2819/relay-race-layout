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
      soundEnableIndex: -1,
      logoUrl: null,
      checkpointIndex: 0
    }
  });

  const relayRep = nodecg.Replicant("relay");

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

  const setLogoUrl = (url: string) => {
    graphicRep.value.logoUrl = url;
  };

  const prevCheckpoint = () => {
    if (graphicRep.value.checkpointIndex > 0) {
      graphicRep.value.checkpointIndex--;
    }
    if (relayRep.value) {
      let checkpointCount = 0;
      relayRep.value.runs.forEach(run => {
        checkpointCount += run.segments.length;
      });

      if (checkpointCount < graphicRep.value.checkpointIndex) {
        graphicRep.value.checkpointIndex = checkpointCount - 1;
      }
    }
  };

  const nextCheckpoint = () => {
    graphicRep.value.checkpointIndex++;
  };

  nodecg.listenFor("graphics:playerInfoStatus", setPlayerInfoStatus);
  nodecg.listenFor("graphics:soundIndex", setSoundEnableIndex);
  nodecg.listenFor("graphics:logoUrl", setLogoUrl);
  nodecg.listenFor("graphics:prevCp", prevCheckpoint);
  nodecg.listenFor("graphics:nextCp", nextCheckpoint);
};
