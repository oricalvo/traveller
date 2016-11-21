import {DevicesHomeComponent} from "./devices/home.component";
import {AppComponent} from "./layout/app.component";
import {NullComponent} from "./components/null.component";
import {DevicesListComponent} from "./devices/devicesList.component";
import {AdminComponent} from "./admin/admin.component";
import {EditDeviceComponent} from "./devices/editDevice.component";

export const routes = [
    { path: '', component: NullComponent },
    {
        path: 'devices',
        component: DevicesHomeComponent,
        children: [
            { path: '', component: DevicesListComponent },
            { path: 'edit/:id', component: EditDeviceComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
    },
];
