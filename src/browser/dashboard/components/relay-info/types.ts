import { RiotComponentExport } from "riot";

export interface Props {}

export interface State {
  relayName: string;
}

export interface RelayInfoComponent extends RiotComponentExport<Props, State> {
  state: State;
}
