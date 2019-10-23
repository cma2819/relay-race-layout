import "@riotjs/hot-reload";
import * as riot from "riot";
import Timekeeper from "./components/timekeeper/timekeeper.riot";
import Countdown from "./components/countdown/countdown.riot";
import SplitList from "./components/split-list/split-list.riot";
import ViewControl from "./components/view-control/view-control.riot";

window.onload = () => {
  riot.component(Timekeeper)(
    document.getElementById("timekeeper") || document.body,
    {}
  );

  riot.component(Countdown)(
    document.getElementById("countdown") || document.body,
    {}
  );

  riot.component(SplitList)(
    document.getElementById("split-list") || document.body,
    {}
  );

  riot.component(ViewControl)(
    document.getElementById("view-control") || document.body,
    {}
  );
};
