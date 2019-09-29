import '@riotjs/hot-reload'
import * as riot from 'riot'
import Timekeeper from './components/timekeeper/timekeeper.riot'
import { Red, Green, Purple, Yellow } from './components/lib/colors'

riot.install(component => {

    component.colorSet = {
        red: Red(),
        green: Green(),
        purple: Purple(),
        yellow: Yellow()
    };
    return component;
});

window.onload = () => {
    riot.component(Timekeeper)(document.getElementById('timekeeper') || document.body, {});
};