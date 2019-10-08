import { RiotComponentExport } from "riot";

export interface Props {}

export interface State {
  time: string;
  state: TimeState;
}

export interface TimekeeperComponent extends RiotComponentExport<Props, State> {
  state: State;
}

export enum TimeState {
  Ready,
  Running,
  Stop
}

export interface RunnerProps {}

export interface RunnerState {}

export interface RunnerComponent
  extends RiotComponentExport<RunnerProps, RunnerState> {
  state: {};
}
