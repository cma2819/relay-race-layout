import {RiotComponentExport} from 'riot'

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