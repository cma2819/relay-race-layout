import "@riotjs/hot-reload";
import * as riot from "riot";
import Timekeeper from "./components/timekeeper/timekeeper.riot";
import Countdown from "./components/countdown/countdown.riot";
import SplitList from "./components/split-list/split-list.riot";
import NotifyDialog from "./components/notify-dialog/notify-dialog.riot";
import ViewControl from "./components/view-control/view-control.riot";
import { DialogTypes } from "./components/notify-dialog/types";

riot.install(component => {
  component.notify = (message: string, type: DialogTypes) => {
    riot.component(NotifyDialog)(
      document.getElementById("notification") || document.body,
      {
        type: type,
        message: message
      }
    );
  };
  return component;
});

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
