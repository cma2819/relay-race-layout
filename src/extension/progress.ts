import { NodeCG } from "./nodecg";

export const progress = (nodecg: NodeCG) => {
  const progressRep = nodecg.Replicant("progress", {
    defaultValue: []
  });

  const split = (idx: number): void => {
    if (!(idx < progressRep.value.length)) {
      return;
    }

    const time = nodecg.readReplicant("stopwatch").time;
    progressRep.value[idx].segment++;
    progressRep.value[idx].splits.push({
      hour: time.hours,
      minute: time.minutes,
      second: time.seconds
    });
  };

  const resume = (idx: number): void => {
    if (
      !(idx < progressRep.value.length) &&
      progressRep.value[idx].segment > 0
    ) {
      return;
    }

    progressRep.value[idx].segment--;
    progressRep.value[idx].splits.pop();
  };

  const edit = ({
    idx,
    seg,
    time
  }: {
    idx: number;
    seg: number;
    time: { hour: number; minute: number; second: number };
  }): void => {
    if (
      !(idx < progressRep.value.length) &&
      !(seg < progressRep.value[idx].splits.length)
    ) {
      return;
    }

    progressRep.value[idx].splits[seg] = time;
  };

  nodecg.listenFor("split", split);
  nodecg.listenFor("resumeSplit", resume);
  nodecg.listenFor("editSplit", edit);
};
