import { RiotComponentExport } from "riot";

// Props of this component
export interface Props {}

// State of this component
export interface State {}

// Interface of this component
export interface VideoViewComponent extends RiotComponentExport<Props, State> {
  state: State;
}

// Props of this component
export interface PanelProps {}

// State of this component
export interface PanelState {}

// Interface of this component
export interface VideoPanelComponent extends RiotComponentExport<Props, State> {
  state: PanelState;
}
