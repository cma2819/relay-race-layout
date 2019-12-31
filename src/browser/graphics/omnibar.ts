import "@riotjs/hot-reload";
import * as riot from "riot";
import OmniBar from "./components/omni-bar/omni-bar.riot";

riot.component(OmniBar)(document.getElementById("root") || document.body, {});
