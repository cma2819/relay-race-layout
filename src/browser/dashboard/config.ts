import "@riotjs/hot-reload";
import * as riot from "riot";
import RelayInfo from "./components/relay-info/relay-info.riot";
import RunInfo from "./components/run-info/run-info.riot";
import TeamInfo from "./components/team-info/team-info.riot";
import NotifyDialog from "./components/notify-dialog/notify-dialog.riot";
import ReplicantFiles from "./components/replicant-files/replicant-files.riot";
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
  riot.component(RelayInfo)(
    document.getElementById("relay-info") || document.body,
    {}
  );
  riot.component(RunInfo)(
    document.getElementById("run-info") || document.body,
    {}
  );
  riot.component(TeamInfo)(
    document.getElementById("team-info") || document.body,
    {}
  );
  riot.component(ReplicantFiles)(
    document.getElementById("replicant-files") || document.body,
    {}
  );
};
