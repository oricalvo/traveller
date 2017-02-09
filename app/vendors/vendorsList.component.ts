/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {VendorsService} from "../services/vendors.service";
import {AppStore} from "../services/appStore";
import {Vendor} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'vendors-list',
    template: require("./vendorsList.component.html"),
    styles: [require("./vendorsList.component.css")],
})
export class VendorsListComponent {
    columns: GridColumn[];
    vendors: Vendor[];

    constructor(private vendorsService: VendorsService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.columns = [
            {title: "ID", field: "id"},
            {title: "Name", field: "name"},


        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.vendors = this.appStore.state.vendors.data;
        });

        this.vendorsService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/vendors/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
    onShowVendor(row){
        console.log("vendor", row);
       this.router.navigate(["/vendors/show", row.id]);
    }
}
