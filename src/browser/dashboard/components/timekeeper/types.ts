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

export interface RunnerProps {
  idx: number;
}

export interface RunnerState {
  prev: Segment;
  current: Segment;
  next: Segment;
}

export interface Segment {
  game: string;
  category: string;
  segment: string;
}

export interface RunnerComponent
  extends RiotComponentExport<RunnerProps, RunnerState> {
  state: RunnerState;
}
