import { Run } from "./run";
import { Team } from "./team";
import { PlayerInfoStatus } from "../extension/graphics";

export type MessageMap = {
  startCountdown: {};
  stopCountdown: {};
  editCountdown: {
    data: string;
    result: string;
    error: string;
  };

  split: {
    data: number;
  };
  resumeSplit: {
    data: number;
  };
  editSplit: {
    data: {
      idx: number;
      runIndex: number;
      segIndex: number;
      time: string;
    };
    error: string;
  };
  resetSplit: {};

  setRelayName: {
    data: string;
  };
  addRun: {
    data: Run;
    result: string;
    error: string;
  };
  removeRun: {
    data: number;
    result: string;
    error: string;
  };
  editRun: {
    data: {
      idx: number;
      newRun: Run;
    };
    result: string;
    error: string;
  };

  addTeam: {
    data: Team;
    result: string;
    error: string;
  };
  removeTeam: {
    data: number;
    result: string;
    error: string;
  };
  editTeam: {
    data: {
      idx: number;
      newTeam: Team;
    };
    result: string;
    error: string;
  };

  setInitialData: {
    data: number;
    result: string;
  };
  getInitialData: {
    result: object;
  };

  startTimer: {
    data: boolean;
  };
  stopTimer: {};
  resetTimer: {};
  editTimer: {
    data: string;
    result: string;
    err: string;
  };

  "graphics:playerInfoStatus": {
    data: PlayerInfoStatus;
  };
  "graphics:soundIndex": {
    data: number;
  };
  "graphics:logoUrl": {
    data: string;
  };
  "graphics:prevCp": {};
  "graphics:nextCp": {};

  /** Send to Graphics from Extension */
  "event:showSplit": {
    data: {
      teamIdx: number;
      segment: string;
      time: string;
    };
  };
};
