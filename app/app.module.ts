import "reflect-metadata";
import 'hammerjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {AppComponent}   from './layout/app.component';
import {HeaderComponent} from './layout/header.component';
import {MainComponent} from './layout/main.component';
import {FooterComponent} from './layout/footer.component';
import {AppStore} from "./services/appStore";
import {LoginStatusComponent} from "./login/loginStatus.component";
import {LoginWebApiMock} from "./mocks/login.webapi.mock";
import {AuthService} from "./services/auth.service";
import {routes} from "./routes";
import {DevicesHomeComponent} from "./devices/home.component";
import {DevicesNavComponent} from "./devices/nav.component";
import {NullComponent} from "./components/null.component";
import {DevicesListComponent} from "./devices/devicesList.component";
import {DevicesService} from "./services/devices.service";
import {DevicesWebApiMock} from "./mocks/devices.webapi.mock";
import {GridComponent} from "./grid/grid.component";
import {AdminComponent} from "./admin/admin.component";
import {EditDeviceComponent} from "./devices/editDevice.component";

import {ImagesHomeComponent} from "./images/home.component";
import {ImagesNavComponent} from "./images/nav.component";
import {ImagesListComponent} from "./images/imagesList.component";
import {ImagesService} from "./services/images.service";
import {ImagesWebApiMock} from "./mocks/images.webapi.mock";
import {EditImageComponent} from "./images/editImage.component";

import {DebugDatasHomeComponent} from "./Debugdatas/home.component";
import {DebugDatasNavComponent} from "./Debugdatas/nav.component";
import {DebugDatasListComponent} from "./Debugdatas/DebugDatasList.component";
import {DebugDatasService} from "./services/DebugDatas.service";
import {debugdatasWebApiMock} from "./mocks/debugdatas.webapi.mock";
import {EditDebugDataComponent} from "./Debugdatas/editDebugData.component";

import {StressTestHomeComponent} from "./StressTests/home.component";
import {StressTestNavComponent} from "./StressTests/nav.component";
import {StressTestsListComponent} from "./StressTests/StressTestsList.component";
import {StressTestService} from "./services/StressTests.service";
import {StressTestsWebApiMock} from "./mocks/stresstests.webapi.mock";
import {EditStressTestComponent} from "./StressTests/editStressTest.component";
import {DebugDataWebApi} from "./webApis/debugdatas.webapi";

require("node_modules/@angular/material/core/theming/prebuilt/indigo-pink.css!css");

const webApis = [
    {provide: "loginWebApi", useClass: LoginWebApiMock},
    {provide: "devicesWebApi", useClass: DevicesWebApiMock},
    {provide: "imagesWebApi", useClass: ImagesWebApiMock},
    { provide: "debugdatasWebApi", useClass: debugdatasWebApiMock },
    //{provide: "debugdatasWebApi", useClass: DebugDataWebApi},
    {provide: "stresstestsWebApi", useClass: StressTestsWebApiMock}
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),
        MaterialModule.forRoot(),
        FormsModule,
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        MainComponent,
        FooterComponent,
        LoginStatusComponent,
        DevicesHomeComponent,
        DevicesNavComponent,
        DevicesListComponent,
        NullComponent,
        GridComponent,
        AdminComponent,
        EditDeviceComponent,
        ImagesHomeComponent,
        ImagesNavComponent,
        ImagesListComponent,
        EditImageComponent,

        DebugDatasHomeComponent,
        DebugDatasNavComponent,
        DebugDatasListComponent,
        EditDebugDataComponent,

        StressTestHomeComponent,
        StressTestNavComponent,
        StressTestsListComponent,
        EditStressTestComponent
    ],
    providers: [
        AppStore,
        AuthService,
        DevicesService,
        ImagesService,
        DebugDatasService,
        StressTestService,
        ...webApis,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
