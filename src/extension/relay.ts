import { NodeCG } from "./nodecg";
import { Run } from "../nodecg/run";

import { removeEmpty } from "./lib/util";

export const relay = (nodecg: NodeCG) => {
  const relayRep = nodecg.Replicant("relay", {
    defaultValue: {
      name: "",
      runs: []
    }
  });

  const setRelayName = (name: string): void => {
    relayRep.value.name = name;
  };

  const addRun = (run: Run, cb: any): void => {
    run.segments = removeEmpty(run.segments);
    if (!validateRun(run)) {
      if (cb) {
        cb("追加されたゲーム情報が不正です.");
      }
      return;
    }

    relayRep.value.runs.push(run);
    if (cb) {
      cb(null, "ゲーム情報を追加しました.");
    }
    return;
  };

  const removeRun = (idx: number, cb: any): void => {
    if (!(idx < relayRep.value.runs.length)) {
      if (cb) {
        cb("不正なインデックスが指定されました.");
      }
      return;
    }
    relayRep.value.runs.splice(idx, 1);
    if (cb) {
      cb(null, "ゲーム情報を削除しました.");
    }
  };

  const editRun = (
    { idx, newRun }: { idx: number; newRun: Run },
    cb: any
  ): void => {
    if (!(idx < relayRep.value.runs.length)) {
      if (cb) {
        cb("不正なインデックスが指定されました.");
      }
      return;
    }
    newRun.segments = removeEmpty(newRun.segments);
    if (!validateRun(newRun)) {
      if (cb) {
        cb("設定されたゲーム情報が不正です.");
      }
      return;
    }

    relayRep.value.runs[idx] = newRun;
    if (cb) {
      cb(null, "ゲーム情報を編集しました.");
    }
    return;
  };

  const validateRun = (run: Run): boolean => {
    if (run.game === "" || run.category === "" || run.segments.length === 0) {
      return false;
    }
    return true;
  };

  nodecg.listenFor("setRelayName", setRelayName);
  nodecg.listenFor("addRun", addRun);
  nodecg.listenFor("removeRun", removeRun);
  nodecg.listenFor("editRun", editRun);
};
