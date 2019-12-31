import "@riotjs/hot-reload";
import * as riot from "riot";
import Checkpoint from "./components/checkpoint/checkpoint.riot";

riot.component(Checkpoint)(
  document.getElementById("root") || document.body,
  {}
);
