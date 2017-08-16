/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {VendorjobsService} from "../Services/VendorJob.service";
import {AppStore} from "../Services/appStore";
import { vendorJob} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'VendorJobs-list',
    template: require("./VendorJobsList.component.html"),
    styles: [require("./VendoJobsList.component.css")],
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

        this.router.navigate(["/Vendor/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
    onShowVendorjob(row){
        console.log("vendor", row);
       this.router.navigate(["/VendorJob/show", row.id]);
    }
}
