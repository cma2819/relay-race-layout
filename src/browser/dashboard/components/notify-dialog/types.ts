import { RiotComponentExport } from "riot";

// Props of this component
export interface Props {
  type: DialogTypes;
  message: string;
}

export enum DialogTypes {
  Primary = "is-primary",
  Link = "is-link",
  Success = "is-success",
  Warning = "is-warning",
  Danger = "is-danger"
}

// State of this component
export interface State {}

// Interface of this component
export interface NotifyDialogComponent
  extends RiotComponentExport<Props, State> {
  state: State;
}
