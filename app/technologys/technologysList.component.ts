/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {TechnologysService} from "../services/technologys.service";
import {AppStore} from "../services/appStore";
import {Technology} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'technologys-list',
    template: require("./technologysList.component.html"),
    styles: [require("./technologysList.component.css")],
})
export class TechnologysListComponent {
    columns: GridColumn[];
    technologys: Technology[];

    constructor(private technologysService: TechnologysService,
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
            this.technologys = this.appStore.state.technologys.data;
        });

        this.technologysService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/technologys/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
    onShowTechnology(row){
        console.log("technology", row);
       this.router.navigate(["/technologys/show", row.id]);
    }
}
