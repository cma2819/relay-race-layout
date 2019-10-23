import { RiotComponentExport } from "riot";

// Props of this component
export interface Props {}

// State of this component
export interface State {}

// Interface of this component
export interface SplitListComponent extends RiotComponentExport<Props, State> {
  state: State;
}

export interface EditProps {
  submitRelayInfoHandler: Function | null;
  closeRelayInfoHandler: Function | null;
}

export interface EditState {}

export interface SplitEditComponent
  extends RiotComponentExport<EditProps, EditState> {
  state: {};
}
