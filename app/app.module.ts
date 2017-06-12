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
import {DevicesWebApi} from "./webApis/devices.webapi";
import {GridComponent} from "./grid/grid.component";
import {AdminComponent} from "./admin/admin.component";
import {EditDeviceComponent} from "./devices/editDevice.component";

import {ImagesHomeComponent} from "./images/home.component";
import {ImagesNavComponent} from "./images/nav.component";
import {ImagesListComponent} from "./images/imagesList.component";
import {ImageDebugDataListTestComponent} from "./images/imageDebugDataListTest.component";
import {ImagesService} from "./services/images.service";
//import {ImagesWebApiMock} from "./mocks/images.webapi.mock";
import {EditImageComponent} from "./images/editImage.component";
import {ShowImageComponent} from "./images/showImage.component";


import {DebugDatasHomeComponent} from "./Debugdatas/home.component";
import {DebugDatasNavComponent} from "./Debugdatas/nav.component";
import {DebugDatasListComponent} from "./Debugdatas/DebugDatasList.component";
import {DebugDatasService} from "./services/DebugDatas.service";
import {debugdatasWebApiMock} from "./mocks/debugdatas.webapi.mock";
import {DebugDataComponent} from "./Debugdatas/DebugData.component"
import {EditDebugDataComponent} from "./Debugdatas/editDebugData.component";

import {ImageComponent} from "./images/TravelerImage.component";

import {StressTestHomeComponent} from "./StressTests/home.component";
import {StressTestNavComponent} from "./StressTests/nav.component";
import {StressTestsListComponent} from "./StressTests/StressTestsList.component";
import {StressTestsWebApiMock} from "./mocks/stresstests.webapi.mock";
import {EditStressTestComponent} from "./StressTests/editStressTest.component";
import {DebugDataWebApi} from "./webApis/debugdatas.webapi";
import {StressTestsWebApi} from "./webApis/stresstests.webapi";
import {stresstestComponent} from "./StressTests/stresstest.component";

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

import {TravelerObjectHomeComponent} from "./travelerobjects/home.component";
import {TravelerObjectsNavComponent} from "./travelerobjects/nav.component";
import {TravelerObjectsListComponent} from "./travelerobjects/TravelerObjectsList.component";
import {EditTravelerObjectComponent} from "./travelerobjects/editTravelerObject.component";
import {TravelerObjectsService} from "./services/travelerobjects.service";
import {TravelerObjectsWebApi} from "./webApis/travelerobjects.webapi";


import {BinHomeComponent} from "./bins/home.component";
import {BinsNavComponent} from "./bins/nav.component";
import {BinsListComponent} from "./bins/binsList.component";
import {EditBinComponent} from "./bins/editBin.component";
import {BinsService} from "./services/bins.service";
import {BinsWebApi} from "./webApis/bins.webapi";


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

import {TestProgramsService} from "./services/testprograms.service";
import {TestProgramsWebApi} from "./webApis/testprograms.webapi";

import {NickNamesService} from "./services/nicknames.service";
import {NickNamesWebApi} from "./webApis/nicknames.webapi";

import {LotsService} from "./services/lots.service";
import {LotsWebApi} from "./webApis/lots.webapi";


import {TaskDatasService} from "./services/taskdatas.service";
import {TaskDatasWebApi} from "./webApis/taskdatas.webapi";

import {StressDatasService} from "./services/stressdatas.service";
import {StressDatasWebApi} from "./webApis/stressdatas.webapi";

import {LocationsService} from "./services/locations.service";
import {LocationsWebApi} from "./webApis/locations.webapi";


import {TestProgramTravelersService} from "./services/testprogramtravelers.service";
import {TestProgramsTravelerWebApi} from "./webApis/testprogramtraveler.webapi";
import {SearchFilterPipe} from "./Filters/Pipe";
import {FilterTecnologies} from "./Filters/FilterTecnologies";
import {FilterDevice} from "./Filters/FilterDevices";

import {AdminMenuComponent} from "./Menus/AdminMenu";
import {MenusHomeComponent} from "./Menus/home.component";

require("node_modules/@angular/material/core/theming/prebuilt/indigo-pink.css!css");

const webApis = [
    {provide: "loginWebApi", useClass: LoginWebApiMock},
     {provide: "devicesWebApi", useClass: DevicesWebApi},
   // {provide: "imagesWebApi", useClass: ImagesWebApiMock},
    {provide: "imagesWebApi", useClass: ImagesWebApi},
    //{ provide: "debugdatasWebApi", useClass: debugdatasWebApiMock },
    {provide: "debugdatasWebApi", useClass: DebugDataWebApi},
    {provide: "stresstestsWebApi", useClass: StressTestsWebApi},
    {provide: "vendorsWebApi", useClass: VendorsWebApi},
    {provide: "vendorjobsWebApi", useClass: VendorjobsWebApi},
    {provide: "fabricatorsWebApi", useClass: FabricatorsWebApi},
    {provide: "technologysWebApi", useClass: TechnologysWebApi},
    {provide: "packagesWebApi", useClass: PackagesWebApi},
    {provide: "binsWebApi", useClass: BinsWebApi},
    {provide: "testprogramsWebApi", useClass: TestProgramsWebApi},
    {provide: "lotsWebApi", useClass: LotsWebApi},
    {provide: "taskdatasWebApi", useClass: TaskDatasWebApi},
    {provide: "stressdatasWebApi", useClass: StressDatasWebApi},
    {provide: "travelerobjectsWebApi", useClass: TravelerObjectsWebApi},
    {provide: "nicknamesWebApi", useClass: NickNamesWebApi},
    {provide: "locationsWebApi" ,useClass:LocationsWebApi},
    {provide: "testprogramtravelerWebApi" ,useClass:TestProgramsTravelerWebApi}



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
        AdminMenuComponent,
        MenusHomeComponent,

        SearchFilterPipe,
        FilterTecnologies,
        FilterDevice,
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
        ImageDebugDataListTestComponent,
        ImageComponent,

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

        BinHomeComponent,
        BinsNavComponent,
        BinsListComponent,
        EditBinComponent,

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
        DebugDataComponent,

        StressTestHomeComponent,
        StressTestNavComponent,
        StressTestsListComponent,
        EditStressTestComponent,
        stresstestComponent,

        TravelerObjectHomeComponent,
        TravelerObjectsNavComponent,
        TravelerObjectsListComponent,
        EditTravelerObjectComponent,
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
        BinsService,
        TestProgramsService,
        LotsService,
        TaskDatasService,
        StressDatasService,
        TravelerObjectsService,
        NickNamesService,
        TestProgramTravelersService,
        LocationsService,
        ...webApis,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
