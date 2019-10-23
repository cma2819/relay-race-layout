import { Run } from "./run";
import { Team } from "./team";

export type MessageMap = {
  startCountdown: {
    data: string;
  };
  stopCountdown: {};

  split: {
    data: number;
  };
  resumeSplit: {
    data: number;
  };
  editSplit: {
    data: {
      idx: number;
      seg: number;
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
  };

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
};
