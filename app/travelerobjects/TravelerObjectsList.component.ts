/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {TravelerObjectsService} from "../services/travelerobjects.service";
import {AppStore} from "../services/appStore";
import {StressTest, TravelerObject} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'travelerobjects-list',
    template: require("./TravelerObjectsList.component.html"),
    styles: [require("./TravelerObjectsList.component.css")],
})
export class TravelerObjectsListComponent {
    columns: GridColumn[];
    travelerobjects: TravelerObject[];

    constructor(private travelerobjectsService: TravelerObjectsService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.columns = [
               {title:"ID",field:"id"},
               {title:"Name",field:"name"},
           // {title:"QTYIN",field:"qtyIn"},
          //  {title:"STRESSDURATION",field:"stressDuration"},
            // {title:"STRESSCYCLEIN",field:"stressCycleIn"},
            // {title:"STRESSDATEIN",field:"stressDateIn"},
            // {title:"STRESSDATEOUT",field:"stressDateOut"},
            // {title:"STRESSREJECT",field:"stressReject"},
            // {title:"STRESSQTYOUT",field:"stressQtyOut"},
            // {title:"TESTQTYIN",field:"testQtyIn"},
            // {title:"TESTDURATION",field:"testDuration"},
            // {title:"TESTDATEIN",field:"testDateIn"},
            // {title:"TESTDATEOUT",field:"testDateOut"},
            // {title:"TESTREJECTS",field:"testRejects"},
            // {title:"TESTQTYOUT",field:"testQtyOut"},
            // {title:"CLIPS",field:"clips"},
            // {title:"REBALLINGNUMBER",field:"reballingNumber"},
            // {title:"FANUMBER",field:"faNumber"},
            // {title:"BOX",field:"box"},
            // {title:"ZONE",field:"zone"},
            // {title:"FADISCRIPTION",field:"faDiscription"},
            // {title:"UPDATEDBYPERSONID",field:"updatedByPersonId"},
            // {title:"COMMENTS",field:"comments"},
            // {title:"UPDATEDATE",field:"updateDate"},

        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.travelerobjects= this.appStore.state.travelerobjects.data;
        });

        this.travelerobjectsService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/travelerobjects/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
}
