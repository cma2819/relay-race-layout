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
  Ready = "Ready",
  Running = "Running",
  Stop = "Stop"
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

export interface EditProps {
  submitRelayInfoHandler: Function | null;
  closeRelayInfoHandler: Function | null;
}

export interface EditState {}

export interface TimeEditComponent
  extends RiotComponentExport<EditProps, EditState> {
  state: EditState;
}
