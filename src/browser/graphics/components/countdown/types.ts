import { RiotComponentExport } from "riot";

// Props of this component
export interface Props {}

// State of this component
export interface State {}

// Interface of this component
export interface CountdownComponent extends RiotComponentExport<Props, State> {
  state: State;
}
