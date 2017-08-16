import "reflect-metadata";
import 'hammerjs';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {AppComponent}   from './Layout/app.component';
import {HeaderComponent} from './Layout/header.component';
import {MainComponent} from './Layout/main.component';
import {FooterComponent} from './Layout/footer.component';
import {AppStore} from "./Services/appStore";
import {LoginStatusComponent} from "./Login/loginStatus.component";
import {LoginWebApiMock} from "./Mocks/login.webapi.mock";
import {AuthService} from "./Services/Auth.service";
import {routes} from "./routes";
import {DevicesHomeComponent} from "./Device/home.component";
import {NullComponent} from "./Components/null.component";
import {DevicesListComponent} from "./Device/DevicesList.component";
import {DevicesService} from "./Services/Device.service";
import {DevicesWebApi} from "./WebApis/devices.webapi";
import {GridComponent} from "./Grid/grid.component";
import {AdminComponent} from "./Admin/Admin.component";






import {DebugDataComponent} from "./DebugData/DebugData.component"


import {ImageComponent} from "./Image/TravelerImage.component";





import {DebugDataWebApi} from "./WebApis/debugdatas.webapi";
import {stresstestComponent} from "./StressTests/stresstest.component";
import {VendorHomeComponent} from "./Vendor/home.component";
import {VendorsListComponent} from "./Vendor/vendorsList.component";
import {VendorsService} from "./Services/Vendor.service";
import {VendorsWebApi} from "./WebApis/vendors.webapi";

import {TechnologyHomeComponent} from "./Technology/home.component";
import {TechnologysListComponent} from "./Technology/TechnologiesList.component";
import {TechnologysService} from "./Services/Technology.service";
import {TechnologysWebApi} from "./WebApis/technologys.webapi";

import {PackageHomeComponent} from "./Package/home.component";
import {PackagesListComponent} from "./Package/PackagesList.component";
import {PackagesService} from "./Services/Package.service";
import {PackagesWebApi} from "./WebApis/packages.webapi";

import {StressHomeComponent} from "./Stress/home.component";
import {StressesListComponent} from "./Stress/StressesList.component";
import {StressesService} from "./Services/Stress.service";
import {StressesWebApi} from "./WebApis/stresses.webapi";

import {TravelerObjectHomeComponent} from "./TravelerObject/home.component";
import {TravelerObjectsNavComponent} from "./TravelerObject/nav.component";
import {TravelerObjectsListComponent} from "./TravelerObject/TravelerObjectsList.component";
import {EditTravelerObjectComponent} from "./TravelerObject/EditTravelerObject.component";
import {TravelerObjectsService} from "./Services/TravelerObject.service";
import {TravelerObjectsWebApi} from "./WebApis/travelerobjects.webapi";


import {BinHomeComponent} from "./Bin/home.component";
import {BinsListComponent} from "./Bin/BinsList.component";
import {BinsService} from "./Services/Bin.service";
import {BinsWebApi} from "./WebApis/bins.webapi";


import {VendorjobsHomeComponent} from "./VendorJob/home.component";
import {VendorjobsListComponent} from "./VendorJob/vendorjobsList.component";
import {VendorjobsService} from "./Services/VendorJob.service";
import {VendorjobsWebApi} from "./WebApis/vendorjobs.webapi";

import {FabricatorsWebApi} from "./WebApis/fabricators.webapi";
import {FabricatorHomeComponent} from "./Fabricator/home.component";

import {FabricatorsListComponent} from "./Fabricator/FabricatorsList.component";
import {FabricatorsService} from "./Services/Fabricator.service";

import {TestProgramsService} from "./Services/TestProgram.service";
import {TestProgramsWebApi} from "./WebApis/testprograms.webapi";

import {NickNamesService} from "./Services/NickName.service";
import {NickNamesWebApi} from "./WebApis/nicknames.webapi";

import {LotsService} from "./Services/Lot.service";
import {LotsWebApi} from "./WebApis/lots.webapi";


import {TaskDatasWebApi} from "./WebApis/taskdatas.webapi";

import {StressDatasWebApi} from "./WebApis/stressdatas.webapi";

import {LocationsService} from "./Services/Location.service";
import {LocationsWebApi} from "./WebApis/locations.webapi";


import {TestProgramTravelersService} from "./Services/TestProgramTraveler.service";
import {TestProgramsTravelerWebApi} from "./WebApis/testprogramtraveler.webapi";
import {SearchFilterPipe} from "./Filters/Pipe";
import {FilterTecnologies} from "./Filters/FilterTecnologies";
import {FilterDevice} from "./Filters/FilterDevices";

import {TravelerConfigWebApi}from "./WebApis/travelerconfig.webapi"
import {travelerConfigService}from "./Services/TravelerConfig.service"


import {AdminMenuComponent} from "./Menus/AdminMenu";
import {MenusHomeComponent} from "./Menus/home.component";
import {MdInputContainer, MdOption} from '@angular/material';
import {LoadingComponent} from "./Components/Loading.component"
import {TC_StressesWebApi} from "./WebApis/tc_stresses.webapi";
import {TC_StressHomeComponent} from "./TC_Stress/home.component";
import {TC_StressesListComponent} from "./TC_Stress/TC_StressesList.component";
import {TC_StressesService} from "./Services/TC_Stress.service";

require("node_modules/@angular/material/core/theming/prebuilt/indigo-pink.css!css");

const webApis = [
    {provide: "loginWebApi", useClass: LoginWebApiMock},
     {provide: "devicesWebApi", useClass: DevicesWebApi},
    {provide: "debugdatasWebApi", useClass: DebugDataWebApi},
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
    {provide: "testprogramtravelerWebApi" ,useClass:TestProgramsTravelerWebApi},
    {provide: "TravelerConfigWebApi" ,useClass:TravelerConfigWebApi},
    {provide: "stressesWebApi" ,useClass:StressesWebApi},
    {provide: "tc_stressesWebApi" ,useClass:TC_StressesWebApi}



];

@NgModule({
    entryComponents: [LoadingComponent],
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
        DevicesListComponent,
        NullComponent,
        GridComponent,
        AdminComponent,
        ImageComponent,
        VendorHomeComponent,
        VendorsListComponent,
        StressHomeComponent,
        StressesListComponent,
        TC_StressHomeComponent,
        TC_StressesListComponent,
        TechnologyHomeComponent,
        TechnologysListComponent,
        PackageHomeComponent,
        PackagesListComponent,
        BinHomeComponent,
        BinsListComponent,
        FabricatorHomeComponent,
        FabricatorsListComponent,
        VendorjobsHomeComponent,
        VendorjobsListComponent,
        DebugDataComponent,
        stresstestComponent,
        TravelerObjectHomeComponent,
        TravelerObjectsNavComponent,
        TravelerObjectsListComponent,
        EditTravelerObjectComponent,
        LoadingComponent,
    ],
    providers: [
        AppStore,
        AuthService,
        DevicesService,
        FabricatorsService,
        VendorsService,
        VendorjobsService,
        TechnologysService,
        PackagesService,
        BinsService,
        TestProgramsService,
        LotsService,
        TravelerObjectsService,
        NickNamesService,
        TestProgramTravelersService,
        LocationsService,
        travelerConfigService,
        StressesService,
        TC_StressesService,

        ...webApis,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
