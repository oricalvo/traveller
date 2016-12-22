/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {StressTestService} from "../services/stresstests.service";
import {AppStore} from "../services/appStore";
import {StressTest} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'stresstests-list',
    template: require("./StressTestsList.component.html"),
    styles: [require("./StressTestsList.component.css")],
})
export class StressTestsListComponent {
    columns: GridColumn[];
    stresstests: StressTest[];

    constructor(private stresstestsService: StressTestService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.columns = [
            {title:"ID",field:"id"},
            {title:"QTYIN",field:"qtyIn"},
            {title:"STRESSDURATION",field:"stressDuration"},
            {title:"STRESSCYCLEIN",field:"stressCycleIn"},
            {title:"STRESSDATEIN",field:"stressDateIn"},
            {title:"STRESSDATEOUT",field:"stressDateOut"},
            {title:"STRESSREJECT",field:"stressReject"},
            {title:"STRESSQTYOUT",field:"stressQtyOut"},
            {title:"TESTQTYIN",field:"testQtyIn"},
            {title:"TESTDURATION",field:"testDuration"},
            {title:"TESTDATEIN",field:"testDateIn"},
            {title:"TESTDATEOUT",field:"testDateOut"},
            {title:"TESTREJECTS",field:"testRejects"},
            {title:"TESTQTYOUT",field:"testQtyOut"},
            {title:"CLIPS",field:"clips"},
            {title:"REBALLINGNUMBER",field:"reballingNumber"},
            {title:"FANUMBER",field:"faNumber"},
            {title:"BOX",field:"box"},
            {title:"ZONE",field:"zone"},
            {title:"FADISCRIPTION",field:"faDiscription"},
            {title:"UPDATEDBYPERSONID",field:"updatedByPersonId"},
            {title:"COMMENTS",field:"comments"},
            {title:"UPDATEDATE",field:"updateDate"},

        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.stresstests= this.appStore.state.stresstests.data;
        });

        this.stresstestsService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/stresstests/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
}
