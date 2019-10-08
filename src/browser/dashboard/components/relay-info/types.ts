import { RiotComponentExport } from "riot";

export interface Props {}

export interface State {
  relayName: string;
  showEdit: boolean;
}

export interface RelayInfoComponent extends RiotComponentExport<Props, State> {
  state: State;
}

export interface EditProps {
  submitRelayInfoHandler: Function | null;
}

export interface EditState {}

export interface RelayInfoEditComponent
  extends RiotComponentExport<EditProps, EditState> {
  state: {};
}
