import { RiotComponentExport } from "riot";

export interface Props {}

export interface State {
  relayName: string;
  showEdit: boolean;
}

export interface RelayInfoComponent extends RiotComponentExport<Props, State> {
  state: State;
}

export interface RelayInfoEditComponent
  extends RiotComponentExport<{ submitRelayInfoHandler: Function | null }, {}> {
  state: {};
}
