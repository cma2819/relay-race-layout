import "@riotjs/hot-reload";
import * as riot from "riot";
import Timekeeper from "./components/timekeeper/timekeeper.riot";

window.onload = () => {
  riot.component(Timekeeper)(
    document.getElementById("timekeeper") || document.body,
    {}
  );
};
