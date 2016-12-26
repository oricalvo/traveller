/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {DebugDatasService} from "../services/DebugDatas.service";
import {AppStore} from "../services/appStore";
import {DebugData} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'DebugDatas-list',
    template: require("./DebugDatasList.component.html"),
    styles: [require("./DebugDatasList.component.css")],
})
export class DebugDatasListComponent {
    columns: GridColumn[];
    debugdatas: DebugData[];

    constructor(private DebugDatasService: DebugDatasService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.columns = [
            {title: "ID", field: "id"},
            {title: "Description", field: "desc"},
        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
     ngOnInit(){
              this.appStore.subscribe(()=>{
              this.debugdatas = this.appStore.state.debugdatas.data;
       });

         this.DebugDatasService.loadAll();
   }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/DebugData/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
}
