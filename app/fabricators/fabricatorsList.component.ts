/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {FabricatorsService} from "../services/fabricators.service";
import {AppStore} from "../services/appStore";
import {Fabricator} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'fabricators-list',
    template: require("./fabricatorsList.component.html"),
    styles: [require("./fabricatorsList.component.css")],
})
export class FabricatorsListComponent {
    columns: GridColumn[];
    fabricators: Fabricator[];

    constructor(private fabricatorsService: FabricatorsService,
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
            this.fabricators = this.appStore.state.fabricators.data;
        });

        this.fabricatorsService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/fabricators/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
    onShowFabricator(row){
        console.log("fabricator", row);
       this.router.navigate(["/fabricators/show", row.id]);
    }
}
