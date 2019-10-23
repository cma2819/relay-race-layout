import { NodeCG } from "./nodecg";
import { parseTimeString, createTimeStruct, CountdownTimer } from "./lib/time";

let countdownTimer: CountdownTimer;

export const countdown = (nodecg: NodeCG) => {
  const countdownRep = nodecg.Replicant("countdown", {
    defaultValue: {
      time: createTimeStruct(0),
      running: false
    }
  });

  const start = (startTime: string) => {
    if (countdownRep.value.running) {
      return;
    }
    const durationMs = parseTimeString(startTime);
    if (durationMs <= 0) {
      return;
    }
    countdownRep.value.running = true;
    countdownRep.value.time = createTimeStruct(durationMs);
    if (countdownTimer) {
      countdownTimer.stop();
      countdownTimer.removeAllListeners();
    }
    countdownTimer = new CountdownTimer(Date.now() + durationMs);
    countdownTimer.on("tick", remainingTimeStruct => {
      countdownRep.value.time = remainingTimeStruct;
    });
  };

  nodecg.listenFor("startCountdown", start);

  const stop = (): void => {
    if (!countdownRep.value.running) {
      return;
    }
    countdownRep.value.running = false;
    if (countdownTimer) {
      countdownTimer.stop();
    }
  };

  nodecg.listenFor("stopCountdown", stop);
};
