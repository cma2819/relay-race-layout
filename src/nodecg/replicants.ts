import { Graphics } from "./generated/graphics";
import { Progress } from "./generated/progress";
import { Relay } from "./generated/relay";
import { TeamList } from "./generated/team-list";

type ReplicantMap = {
  graphics: Graphics;
  progress: Progress;
  relay: Relay;
  teamList: TeamList;
};

export { ReplicantMap, Graphics, Progress, Relay, TeamList };
