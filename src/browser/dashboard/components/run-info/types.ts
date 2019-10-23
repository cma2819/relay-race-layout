import { RiotComponentExport } from "riot";
import { Run } from "../../../../nodecg/run";

// Props of this component
export interface Props {}

// State of this component
export interface State {
  runs: Run[];
}

// Interface of this component
export interface RunInfoComponent extends RiotComponentExport<Props, State> {
  state: State;
}

export interface EditProps {
  submitRelayInfoHandler: Function | null;
  closeRelayInfoHandler: Function | null;
}

export interface EditState {
  run: Run;
}

export interface RunInfoEditComponent
  extends RiotComponentExport<EditProps, EditState> {
  state: EditState;
}
