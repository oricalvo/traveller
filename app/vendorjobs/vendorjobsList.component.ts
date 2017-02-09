/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {VendorjobsService} from "../services/vendorjobs.service";
import {AppStore} from "../services/appStore";
import { vendorJob} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'vendorjobs-list',
    template: require("./vendorjobsList.component.html"),
    styles: [require("./vendorjobsList.component.css")],
})
export class VendorjobsListComponent {
    columns: GridColumn[];
    vendorjobs: vendorJob[];

    constructor(private vendorjobsService: VendorjobsService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.columns = [
            {title: "ID", field: "id"},
            {title: "Job Num", field: "jobNum"},
            {title: "cooments", field: "comments"},



        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.vendorjobs = this.appStore.state.vendorjobs.data;
        });

        this.vendorjobsService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/vendors/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
    onShowVendorjob(row){
        console.log("vendor", row);
       this.router.navigate(["/vendorjobs/show", row.id]);
    }
}
