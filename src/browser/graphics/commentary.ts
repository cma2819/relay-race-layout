import "@riotjs/hot-reload";
import * as riot from "riot";
import Commentary from "./components/commentary/commentary.riot";

riot.component(Commentary)(
  document.getElementById("root") || document.body,
  {}
);
