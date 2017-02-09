import {ImagesHomeComponent} from "./images/home.component";
import {ImagesListComponent} from "./images/imagesList.component";
import {EditImageComponent} from "./images/editImage.component";

import {DevicesHomeComponent} from "./devices/home.component";
import {DevicesListComponent} from "./devices/devicesList.component";
import {EditDeviceComponent} from "./devices/editDevice.component";

import {DebugDatasHomeComponent} from "./Debugdatas/home.component";
import {DebugDatasListComponent} from "./Debugdatas/DebugDatasList.component";
import {EditDebugDataComponent} from "./Debugdatas/editDebugData.component";

import {StressTestHomeComponent} from "./StressTests/home.component";
import {StressTestsListComponent} from "./StressTests/StressTestsList.component";
import {EditStressTestComponent} from "./StressTests/editStressTest.component";



import {AppComponent} from "./layout/app.component";
import {NullComponent} from "./components/null.component";
import {AdminComponent} from "./admin/admin.component";


import {VendorHomeComponent} from "./vendors/home.component";
import {VendorsListComponent} from "./vendors/vendorsList.component";

import {VendorjobsHomeComponent} from "./vendorjobs/home.component";
import {VendorjobsListComponent} from "./vendorjobs/vendorjobsList.component";

import {FabricatorHomeComponent} from "./fabricators/home.component";
import {FabricatorsListComponent} from "./fabricators/fabricatorsList.component";

import {TechnologyHomeComponent} from "./technologys/home.component";
import {TechnologysListComponent} from "./technologys/technologysList.component";
import {EditTechnologyComponent} from "./technologys/editTechnology.component";

import {PackageHomeComponent} from "./packages/home.component";
import {PackagesListComponent} from "./packages/packagesList.component";
import {EditPackageComponent} from "./packages/editPackage.component";

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
        path: 'images',
        component: ImagesHomeComponent,
        children: [
            { path: '', component: ImagesListComponent },
            { path: 'edit/:id', component: EditImageComponent },
        ]

    },
    {
        path: 'vendors',
        component: VendorHomeComponent,
        children: [
            { path: '', component: VendorsListComponent },
            { path: 'edit/:id', component: EditImageComponent },
            { path: 'show/:id', component: ShowImageComponent },
        ]

    },
    {
        path: 'vendorjobs',
        component: VendorjobsHomeComponent,
        children: [
            { path: '', component: VendorjobsListComponent },
            { path: 'edit/:id', component: EditImageComponent },
            { path: 'show/:id', component: ShowImageComponent },
        ]

    },
    {
        path: 'fabricators',
        component: FabricatorHomeComponent,
        children: [
            { path: '', component: FabricatorsListComponent },

        ]

    },
    {
        path: 'technologys',
        component: TechnologyHomeComponent,
        children: [
            { path: '', component: TechnologysListComponent},
            { path: 'edit/:id', component: EditTechnologyComponent},

        ]

    },
    {
        path: 'packages',
        component: PackageHomeComponent,
        children: [
            { path: '', component: PackagesListComponent},
            { path: 'edit/:id', component: EditPackageComponent},

        ]

    },
    {
        path: 'debugdatas',
        component: DebugDatasHomeComponent,
        children: [
            { path: '', component: DebugDatasListComponent },
            { path: 'edit/:id', component: EditDebugDataComponent },
        ]
    },
    {
        path: 'stresstests',
        component: StressTestHomeComponent,
        children: [
            { path: '', component: StressTestsListComponent },
            { path: 'edit/:id', component: EditStressTestComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
    },
];
