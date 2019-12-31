import { NodeCG } from "./nodecg";
import { Segment } from "../nodecg/segment";
import { parseTimeString, createTimeStruct } from "./lib/time";

export const progress = (nodecg: NodeCG) => {
  const relayRep = nodecg.Replicant("relay");
  const teamListRep = nodecg.Replicant("team-list");

  const progressRep = nodecg.Replicant("progress", {
    defaultValue: []
  });

  const split = (idx: number): void => {
    if (!relayRep.value) {
      return;
    }

    const beforeNext: Segment | null =
      progressRep.value[idx].segments.next || null;
    const currentSegments = beforeNext;
    const beforeCurrent: Segment | null =
      progressRep.value[idx].segments.current;
    if (beforeCurrent === null) {
      return;
    }
    const prevSegments = beforeCurrent;

    let nextSegments: Segment | null;
    if (beforeNext === null) {
      nextSegments = null;
    } else {
      const nextRun = relayRep.value.runs[beforeNext.runIndex];

      if (beforeNext.segIndex + 1 < nextRun.segments.length) {
        nextSegments = {
          runIndex: beforeNext.runIndex,
          segIndex: beforeNext.segIndex + 1
        };
      } else {
        if (beforeNext.runIndex + 1 < relayRep.value.runs.length) {
          nextSegments = {
            runIndex: beforeNext.runIndex + 1,
            segIndex: 0
          };
        } else {
          nextSegments = null;
        }
      }
    }

    progressRep.value[idx].segments = {
      prev: prevSegments,
      current: currentSegments,
      next: nextSegments
    };

    const time = nodecg.readReplicant("stopwatch").time;
    if (!progressRep.value[idx].splits[beforeCurrent.runIndex]) {
      progressRep.value[idx].splits[beforeCurrent.runIndex] = [];
    }
    const totalTime = Object.assign({}, time);

    let runTime;
    if (beforeCurrent.runIndex > 0) {
      const beforeRunLastIdx =
        progressRep.value[idx].splits[beforeCurrent.runIndex - 1].length - 1;
      const beforeRunLastRaw =
        progressRep.value[idx].splits[beforeCurrent.runIndex - 1][
          beforeRunLastIdx
        ].total.raw;
      const runTimeMs = time.raw - beforeRunLastRaw;
      runTime = createTimeStruct(runTimeMs);
    } else {
      runTime = Object.assign({}, time);
    }

    progressRep.value[idx].splits[beforeCurrent.runIndex][
      beforeCurrent.segIndex
    ] = {
      total: totalTime,
      run: runTime
    };
  };

  const resume = (idx: number): void => {
    if (!relayRep.value) {
      return;
    }

    const beforePrev: Segment | null =
      progressRep.value[idx].segments.prev || null;
    if (beforePrev === null) {
      return;
    }
    const currentSegments = beforePrev;
    const beforeCurrent: Segment | null =
      progressRep.value[idx].segments.current;
    const nextSegments = beforeCurrent;

    let prevSegments: Segment | null;
    if (beforePrev.segIndex - 1 >= 0) {
      prevSegments = {
        runIndex: beforePrev.runIndex,
        segIndex: beforePrev.segIndex - 1
      };
    } else {
      if (beforePrev.runIndex - 1 >= 0) {
        const prevRun = relayRep.value.runs[beforePrev.runIndex - 1];
        prevSegments = {
          runIndex: beforePrev.runIndex - 1,
          segIndex: prevRun.segments.length - 1
        };
      } else {
        prevSegments = null;
      }
    }
    progressRep.value[idx].segments = {
      prev: prevSegments,
      current: currentSegments,
      next: nextSegments
    };

    progressRep.value[idx].splits[currentSegments.runIndex].splice(
      currentSegments.segIndex,
      1
    );
  };

  const edit = (
    {
      idx,
      runIndex,
      segIndex,
      time
    }: {
      idx: number;
      runIndex: number;
      segIndex: number;
      time: string;
    },
    cb: any
  ): void => {
    try {
      const ms = parseTimeString(time);
      const newTime = createTimeStruct(ms);
      progressRep.value[idx].splits[runIndex][segIndex].total = newTime;

      if (runIndex > 0) {
        const beforeRunLastIdx =
          progressRep.value[idx].splits[runIndex - 1].length - 1;
        const beforeRunLastRaw =
          progressRep.value[idx].splits[runIndex - 1][beforeRunLastIdx].total
            .raw;
        const runTimeMs = ms - beforeRunLastRaw;
        progressRep.value[idx].splits[runIndex][
          segIndex
        ].run = createTimeStruct(runTimeMs);
      } else {
        progressRep.value[idx].splits[runIndex][segIndex].run = newTime;
      }
    } catch {
      cb("文字列をタイムに変換できません.");
    }
  };

  const reset = () => {
    if (!relayRep.value || !teamListRep.value) {
      return;
    }
    const teamLength = teamListRep.value.length;
    const prev = null;
    const current: Segment = {
      runIndex: 0,
      segIndex: 0
    };

    let next: Segment | null;
    if (relayRep.value.runs[0].segments.length > 1) {
      next = {
        runIndex: 0,
        segIndex: 1
      };
    } else if (relayRep.value.runs.length > 1) {
      next = {
        runIndex: 1,
        segIndex: 0
      };
    } else {
      next = null;
    }

    const newProgress = [];
    for (let i = 0; i < teamLength; i++) {
      newProgress.push(
        Object.assign(
          {},
          {
            segments: Object.assign(
              {},
              {
                prev: prev,
                current: current,
                next: next
              }
            ),
            splits: []
          }
        )
      );
    }

    progressRep.value = newProgress;
  };

  nodecg.listenFor("split", split);
  nodecg.listenFor("resumeSplit", resume);
  nodecg.listenFor("editSplit", edit);
  nodecg.listenFor("resetSplit", reset);
};
