import { NodeCG } from "./nodecg";
import { countdown } from "./countdown";
import { progress } from "./progress";
import { relay } from "./relay";
import { team } from "./team";
import { replicantInit } from "./replicantInit";
import { timekeeping } from "./timekeeping";
import { graphics } from "./graphics";
import { gas } from "./gas";

export = (nodecg: NodeCG) => {
  countdown(nodecg);
  relay(nodecg);
  team(nodecg);
  progress(nodecg);
  replicantInit(nodecg);
  timekeeping(nodecg);
  graphics(nodecg);
  gas(nodecg);
};
