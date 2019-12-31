import "@riotjs/hot-reload";
import * as riot from "riot";
import VideoView from "./components/video-view/video-view.riot";

riot.component(VideoView)(document.getElementById("root") || document.body, {});
