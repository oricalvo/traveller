import {DevicesHomeComponent} from "./Device/home.component";
import {NullComponent} from "./Components/null.component";
import {DevicesListComponent} from "./Device/DevicesList.component";
import {AdminComponent} from "./Admin/Admin.component";

import {TravelerObjectHomeComponent} from "./TravelerObject/home.component";
import {TravelerObjectsListComponent} from "./TravelerObject/TravelerObjectsList.component";
import {EditTravelerObjectComponent} from "./TravelerObject/EditTravelerObject.component";
import {VendorHomeComponent} from "./Vendor/home.component";
import {VendorsListComponent} from "./Vendor/vendorsList.component";
import {VendorjobsHomeComponent} from "./VendorJob/home.component";
import {VendorjobsListComponent} from "./VendorJob/vendorjobsList.component";
import {FabricatorHomeComponent} from "./Fabricator/home.component";
import {FabricatorsListComponent} from "./Fabricator/FabricatorsList.component";

import {TechnologyHomeComponent} from "./Technology/home.component";
import {TechnologysListComponent} from "./Technology/TechnologiesList.component";

import {PackageHomeComponent} from "./Package/home.component";
import {PackagesListComponent} from "./Package/PackagesList.component";

import {StressHomeComponent} from "./Stress/home.component";
import {StressesListComponent} from "./Stress/StressesList.component";



import {BinHomeComponent} from "./Bin/home.component";
import {BinsListComponent} from "./Bin/BinsList.component"

import {AdminMenuComponent} from "./Menus/AdminMenu";
import {MenusHomeComponent} from "./Menus/home.component";
import {TC_StressHomeComponent} from "./TC_Stress/home.component";
import {TC_StressesListComponent} from "./TC_Stress/TC_StressesList.component";

export const routes = [
    { path: '', component: NullComponent },
    {
        path: 'Devices',
        component: DevicesHomeComponent,
        children: [
            { path: '', component: DevicesListComponent },

        ]
    },
    {
        path: 'Menus',
        component: MenusHomeComponent,
        children: [
            { path: 'Admin', component: AdminMenuComponent },

        ]
    },

    {
        path: 'TravelerObject',
        component: TravelerObjectHomeComponent,
        children: [
            { path: '', component: TravelerObjectsListComponent },
            { path: 'edit/:id', component: EditTravelerObjectComponent },

        ]

    },
    {
        path: 'Vendors',
        component: VendorHomeComponent,
        children: [
            { path: '', component: VendorsListComponent },

        ]

    },
    {
        path: 'Stresses',
        component: StressHomeComponent,
        children: [
            { path: '', component: StressesListComponent },

        ]

    },
    {
        path: 'TC_Stresses',
        component: TC_StressHomeComponent,
        children: [
            { path: '', component: TC_StressesListComponent },

        ]

    },
    {
        path: 'VendorJobs',
        component: VendorjobsHomeComponent,
        children: [
            { path: '', component: VendorjobsListComponent },

        ]

    },
    {
        path: 'Fabricators',
        component: FabricatorHomeComponent,
        children: [
            { path: '', component: FabricatorsListComponent },

        ]

    },
    {
        path: 'Technologies',
        component: TechnologyHomeComponent,
        children: [
            { path: '', component: TechnologysListComponent},


        ]

    },
    {
        path: 'Packages',
        component: PackageHomeComponent,
        children: [
            { path: '', component: PackagesListComponent},


        ]

    },
    {
        path: 'Bins',
        component: BinHomeComponent,
        children: [
            { path: '', component: BinsListComponent},


        ]

    },


    {
        path: 'Admin',
        component: AdminComponent,
    },
];
