import { Assets } from "./asset";

import { Countdown } from "./generated/countdown";
import { Graphics } from "./generated/graphics";
import { Progress } from "./generated/progress";
import { Relay } from "./generated/relay";
import { Stopwatch } from "./generated/stopwatch";
import { TeamList } from "./generated/team-list";

type ReplicantMap = {
  countdown: Countdown;
  graphics: Graphics;
  progress: Progress;
  relay: Relay;
  stopwatch: Stopwatch;
  "team-list": TeamList;

  "assets:initial-data": Assets;
};

export {
  Countdown,
  ReplicantMap,
  Graphics,
  Progress,
  Relay,
  Stopwatch,
  TeamList
};
