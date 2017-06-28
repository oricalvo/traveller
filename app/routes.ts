import {DevicesHomeComponent} from "./devices/home.component";
import {AppComponent} from "./layout/app.component";
import {NullComponent} from "./components/null.component";
import {DevicesListComponent} from "./devices/devicesList.component";
import {AdminComponent} from "./admin/admin.component";
import {EditDeviceComponent} from "./devices/editDevice.component";

import {DebugDatasHomeComponent} from "./Debugdatas/home.component";

import {DebugDataComponent} from "./Debugdatas/DebugData.component";

import {StressTestHomeComponent} from "./StressTests/home.component";
import {StressTestsListComponent} from "./StressTests/StressTestsList.component";
import {EditStressTestComponent} from "./StressTests/editStressTest.component";

import {TravelerObjectHomeComponent} from "./travelerobjects/home.component";
import {TravelerObjectsListComponent} from "./travelerobjects/TravelerObjectsList.component";
import {EditTravelerObjectComponent} from "./travelerobjects/editTravelerObject.component";
//import {ShowImageComponent} from "./travelerobjects/showImage.component";

import {ImagesHomeComponent} from "./images/home.component";
import {ImagesListComponent} from "./images/imagesList.component";
import {EditImageComponent} from "./images/editImage.component";
import {ShowImageComponent} from "./images/showImage.component";

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

import {BinHomeComponent} from "./bins/home.component";
import {BinsListComponent} from "./bins/binsList.component"
import {EditBinComponent} from "./bins/editBin.component";

import {AdminMenuComponent} from "./Menus/AdminMenu";
import {MenusHomeComponent} from "./Menus/home.component";

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
        path: 'menus',
        component: MenusHomeComponent,
        children: [
            { path: 'admin', component: AdminMenuComponent },

        ]
    },
    {
        path: 'images',
        component: ImagesHomeComponent,
        children: [
            { path: '', component: ImagesListComponent },
            { path: 'edit/:id', component: EditImageComponent },
            { path: 'show/:id', component: ShowImageComponent },
        ]

    },
    {
        path: 'travelerobjects',
        component: TravelerObjectHomeComponent,
        children: [
            { path: '', component: TravelerObjectsListComponent },
            { path: 'edit/:id', component: EditTravelerObjectComponent },

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
        path: 'bins',
        component: BinHomeComponent,
        children: [
            { path: '', component: BinsListComponent},
            { path: 'edit/:id', component: EditBinComponent},

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
