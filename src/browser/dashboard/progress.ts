import "@riotjs/hot-reload";
import * as riot from "riot";
import Timekeeper from "./components/timekeeper/timekeeper.riot";
import Countdown from "./components/countdown/countdown.riot";

window.onload = () => {
  riot.component(Timekeeper)(
    document.getElementById("timekeeper") || document.body,
    {}
  );

  riot.component(Countdown)(
    document.getElementById("countdown") || document.body,
    {}
  );
};
