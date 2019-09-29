import '@riotjs/hot-reload'
import * as riot from 'riot'
import RelayInfo from './components/relay-info/relay-info.riot'
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
    riot.component(RelayInfo)(document.getElementById('relay-info') || document.body, {});
};