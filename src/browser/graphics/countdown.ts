import "@riotjs/hot-reload";
import * as riot from "riot";
import Countdown from "./components/countdown/countdown.riot";

riot.component(Countdown)(document.getElementById("root") || document.body, {});
