import { RiotComponentExport } from "riot";

// Props of this component
export interface Props {}

// State of this component
export interface State {
  jsonFiles: string[];
  showDialog: boolean;
  importName: string;
}

// Interface of this component
export interface ReplicantFilesComponent
  extends RiotComponentExport<Props, State> {
  state: State;
}
