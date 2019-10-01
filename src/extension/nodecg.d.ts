import { CreateNodecgInstance } from "ts-nodecg/server";

import { ReplicantMap } from "../nodecg/replicants";
import { MessageMap } from "../nodecg/messages";

export type NodeCG = CreateNodecgInstance<
  "relay-race-layout",
  Object,
  ReplicantMap,
  MessageMap
>;
