import { RiotComponentExport } from "riot";

export interface AppComponent extends RiotComponentExport<{}, {}> {}

export interface TimekeeperComponent
  extends RiotComponentExport<{}, { time: String; state: TimeState }> {}

export enum TimeState {
  Ready,
  Running,
  Stop
}
