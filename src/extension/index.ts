import { NodeCG } from "./nodecg";
import { countdown } from "./countdown";
import { progress } from "./progress";
import { relay } from "./relay";
import { team } from "./team";
import { replicantInit } from "./replicantInit";

export = (nodecg: NodeCG) => {
  countdown(nodecg);
  progress(nodecg);
  relay(nodecg);
  team(nodecg);
  replicantInit(nodecg);
};
