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
import {ShowImageComponent} from "./images/showImage.component";


import {DebugDatasHomeComponent} from "./Debugdatas/home.component";
import {DebugDatasNavComponent} from "./Debugdatas/nav.component";
import {DebugDatasListComponent} from "./Debugdatas/DebugDatasList.component";
import {DebugDatasService} from "./services/DebugDatas.service";
import {debugdatasWebApiMock} from "./mocks/debugdatas.webapi.mock";
import {EditDebugDataComponent} from "./Debugdatas/editDebugData.component";

import {StressTestHomeComponent} from "./StressTests/home.component";
import {StressTestNavComponent} from "./StressTests/nav.component";
import {StressTestsListComponent} from "./StressTests/StressTestsList.component";
import {StressTestsWebApiMock} from "./mocks/stresstests.webapi.mock";
import {EditStressTestComponent} from "./StressTests/editStressTest.component";
import {DebugDataWebApi} from "./webApis/debugdatas.webapi";
import {StressTestsWebApi} from "./webApis/stresstests.webapi";

import {StressTestService} from "./services/stresstests.service";
import {ImagesWebApi} from "./webApis/images.webapi";

import {VendorHomeComponent} from "./vendors/home.component";
import {VendorsNavComponent} from "./vendors/nav.component";
import {VendorsListComponent} from "./vendors/vendorsList.component";
import {VendorsService} from "./services/vendors.service";
import {VendorsWebApi} from "./webApis/vendors.webapi";

import {TechnologyHomeComponent} from "./technologys/home.component";
import {TechnologysNavComponent} from "./technologys/nav.component";
import {TechnologysListComponent} from "./technologys/technologysList.component";
import {EditTechnologyComponent} from "./technologys/editTechnology.component";
import {TechnologysService} from "./services/technologys.service";
import {TechnologysWebApi} from "./webApis/technologys.webapi";

import {PackageHomeComponent} from "./packages/home.component";
import {PackagesNavComponent} from "./packages/nav.component";
import {PackagesListComponent} from "./packages/packagesList.component";
import {EditPackageComponent} from "./packages/editPackage.component";
import {PackagesService} from "./services/packages.service";
import {PackagesWebApi} from "./webApis/packages.webapi";


import {VendorjobsHomeComponent} from "./vendorjobs/home.component";
import {VendorjobsNavComponent} from "./vendorjobs/nav.component";
import {VendorjobsListComponent} from "./vendorjobs/vendorjobsList.component";
import {VendorjobsService} from "./services/vendorjobs.service";
import {VendorjobsWebApi} from "./webApis/vendorjobs.webapi";

import {FabricatorsWebApi} from "./webApis/fabricators.webapi";
import {FabricatorHomeComponent} from "./fabricators/home.component";
import {FabricatorsNavComponent} from "./fabricators/nav.component";
import {FabricatorsListComponent} from "./fabricators/fabricatorsList.component";
import {FabricatorsService} from "./services/fabricators.service";

require("node_modules/@angular/material/core/theming/prebuilt/indigo-pink.css!css");

const webApis = [
    {provide: "loginWebApi", useClass: LoginWebApiMock},
    {provide: "devicesWebApi", useClass: DevicesWebApiMock},
   // {provide: "imagesWebApi", useClass: ImagesWebApiMock},
    {provide: "imagesWebApi", useClass: ImagesWebApi},
    //{ provide: "debugdatasWebApi", useClass: debugdatasWebApiMock },
    {provide: "debugdatasWebApi", useClass: DebugDataWebApi},
    {provide: "stresstestsWebApi", useClass: StressTestsWebApi},
    {provide: "vendorsWebApi", useClass: VendorsWebApi},
    {provide: "vendorjobsWebApi", useClass: VendorjobsWebApi},
    {provide: "fabricatorsWebApi", useClass: FabricatorsWebApi},
    {provide: "technologysWebApi", useClass: TechnologysWebApi},
    {provide: "packagesWebApi", useClass: PackagesWebApi}
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
        ShowImageComponent,

        VendorHomeComponent,
        VendorsNavComponent,
        VendorsListComponent,

        TechnologyHomeComponent,
        TechnologysNavComponent,
        TechnologysListComponent,
        EditTechnologyComponent,

        PackageHomeComponent,
        PackagesNavComponent,
        PackagesListComponent,
        EditPackageComponent,

        FabricatorHomeComponent,
        FabricatorsNavComponent,
        FabricatorsListComponent,

        VendorjobsHomeComponent,
        VendorjobsNavComponent,
        VendorjobsListComponent,

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
        FabricatorsService,
        VendorsService,
        VendorjobsService,
        TechnologysService,
        PackagesService,
        ...webApis,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
