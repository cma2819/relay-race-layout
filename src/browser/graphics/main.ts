import "@riotjs/hot-reload";
import * as riot from "riot";
import App from "./components/app.riot";

riot.component(App)(document.getElementById("root") || document.body, {
  message: "Hi, there!"
});
