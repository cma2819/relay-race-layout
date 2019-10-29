import * as liveSplitCore from "livesplit-core";
import * as TimeUtils from "./lib/time";
import { NodeCG } from "./nodecg";

const LS_TIMER_PHASE = {
  NotRunning: 0,
  Running: 1,
  Ended: 2,
  Paused: 3
};

export const timekeeping = (nodecg: NodeCG) => {
  // Logger
  const logger = new nodecg.Logger("Timekeeping");
  // Replicant
  const stopwatch = nodecg.Replicant("stopwatch", {
    defaultValue: {
      state: "not_started",
      time: TimeUtils.createTimeStruct(0)
    }
  });

  // Setting
  const lsRun = liveSplitCore.Run.new();
  const segment = liveSplitCore.Segment.new("finish");
  lsRun.pushSegment(segment);
  const timer = liveSplitCore.Timer.new(lsRun);

  const start = (force: boolean): void => {
    logger.info("start");
    if (!timer) {
      return;
    }
    if (!force && stopwatch.value.state === "running") {
      return;
    }
    stopwatch.value.state = "running";
    if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
      timer.start();
      initGameTime();
    } else {
      timer.resume();
    }
  };

  const initGameTime = (): void => {
    if (timer) {
      liveSplitCore.TimeSpan.fromSeconds(0).with(t => timer.setLoadingTimes(t));
      timer.initializeGameTime();
      const existingSeconds = stopwatch.value.time.raw / 1000;
      liveSplitCore.TimeSpan.fromSeconds(existingSeconds).with(t =>
        timer.setGameTime(t)
      );
    }
  };

  const tick = (): void => {
    if (!timer || stopwatch.value.state !== "running") {
      return;
    }
    const time = timer.currentTime();
    const gameTime = time.gameTime();
    if (!gameTime) {
      return;
    }
    stopwatch.value.time = TimeUtils.createTimeStruct(
      gameTime.totalSeconds() * 1000
    );
  };

  const pause = (): void => {
    if (timer) {
      logger.info("pause");
      timer.pause();
      stopwatch.value.state = "paused";
    }
  };

  const reset = (): void => {
    if (timer) {
      logger.info("reset");
      pause();
      timer.reset(true);
      stopwatch.value.time = TimeUtils.createTimeStruct();
      stopwatch.value.state = "not_started";
    }
  };

  const edit = (formatted: string, cb: any): void => {
    try {
      reset();
      stopwatch.value.time = TimeUtils.createTimeStruct(
        TimeUtils.parseTimeString(formatted)
      );
      cb(null, "タイムを編集しました.");
    } catch (err) {
      cb("文字列をタイムに変換できません.");
    }
  };

  if (timer && stopwatch.value) {
    // Load the existing time and start the stopwatch at that.
    timer.start();
    timer.pause();
    initGameTime();

    if (stopwatch.value.state === "running") {
      const missedTime = Date.now() - stopwatch.value.time.timestamp;
      const previousTime = stopwatch.value.time.raw;
      const timeOffset = previousTime + missedTime;
      nodecg.log.info(
        "Recovered %s seconds of lost time.",
        (missedTime / 1000).toFixed(2)
      );
      start(true);
      liveSplitCore.TimeSpan.fromSeconds(timeOffset / 1000).with(t =>
        timer.setGameTime(t)
      );
    }
  }

  nodecg.listenFor("startTimer", start);
  nodecg.listenFor("stopTimer", pause);
  nodecg.listenFor("resetTimer", reset);
  nodecg.listenFor("editTimer", edit);
  setInterval(tick, 100); // 10 times per second.
};
