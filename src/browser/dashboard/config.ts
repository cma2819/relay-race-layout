import "@riotjs/hot-reload";
import * as riot from "riot";
import RelayInfo from "./components/relay-info/relay-info.riot";

window.onload = () => {
  riot.component(RelayInfo)(
    document.getElementById("relay-info") || document.body,
    {}
  );
};
