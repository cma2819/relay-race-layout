import { RiotComponentExport } from "riot";

export interface Props {}

export interface Status {}

export interface CountdownComponent extends RiotComponentExport<Props, Status> {
  status: Status;
}

export interface EditProps {
  submitRelayInfoHandler: Function | null;
  closeRelayInfoHandler: Function | null;
}

export interface EditState {}

export interface CountdownEditComponent
  extends RiotComponentExport<EditProps, EditState> {
  state: {};
}
