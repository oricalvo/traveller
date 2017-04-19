/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {BinsService} from "../services/bins.service";
import {AppStore} from "../services/appStore";
import {Bin} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'bins-list',
    template: require("./binsList.component.html"),
    styles: [require("./binsList.component.css")],
})
export class BinsListComponent {
    columns: GridColumn[];
    bins: Bin[];

    constructor(private binsService: BinsService,
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
            this.bins = this.appStore.state.bins.data;
        });

        this.binsService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/bins/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
    onShowBin(row){
        console.log("bin", row);
       this.router.navigate(["/bins/show", row.id]);
    }
}
