/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {PackagesService} from "../services/packages.service";
import {AppStore} from "../services/appStore";
import {Package} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'packages-list',
    template: require("./packagesList.component.html"),
    styles: [require("./packagesList.component.css")],
})
export class PackagesListComponent {
    columns: GridColumn[];
    packages: Package[];

    constructor(private packagesService: PackagesService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.columns = [
            {title: "ID", field: "id"},
            {title: "Name", field: "name"},
            {title: "Name", field: "fabricator.name"},



        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.packages = this.appStore.state.packages.data;
        });

        this.packagesService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/packages/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
    onShowPackage(row){
        console.log("package", row);
       this.router.navigate(["/packages/show", row.id]);
    }
}
