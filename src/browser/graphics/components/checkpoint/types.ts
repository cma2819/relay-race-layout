import { RiotComponentExport } from "riot";

// Props of this component
export interface Props {}

// State of this component
export interface State {}

// Interface of this component
export interface CheckpointComponent extends RiotComponentExport<Props, State> {
  state: State;
}

// Props of this component
export interface SegmentProps {}

// State of this component
export interface SegmentState {}

// Interface of this component
export interface SegmentComponent
  extends RiotComponentExport<SegmentProps, SegmentState> {
  state: SegmentState;
}
