import { RiotComponentExport } from "riot";
import { ColorSet } from "../colors";

export interface Props {
  onclick: Function | null;
  colorSet: ColorSet;
  buttonProps: Object;
}

export interface State {
  disabled: boolean;
}

export interface FlatButtonComponent extends RiotComponentExport<Props, State> {
  state: State;
}
