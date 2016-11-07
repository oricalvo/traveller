import {DevicesHomeComponent} from "./devices/home.component";
import {AppComponent} from "./layout/app.component";
import {NullComponent} from "./components/null.component";

export const routes = [
    { path: '', component: NullComponent },
    { path: 'devices', component: DevicesHomeComponent },
];
