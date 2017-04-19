/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
//import { Component } from '@angular/core';
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {StressTest, DebugData, vendorJob, Vendor, TaskData} from "../reducers/AppState";
import {StressTestService} from "../services/stresstests.service";
import {VendorsService} from "../services/vendors.service";
import {AppStore} from "../services/appStore";
import {AfterViewInit} from '@angular/core';

@Component({
    selector: 'edit-StressTests',
    template: require("./editStressTest.component.html"),
    styles: [require("./editStressTest.component.css")],
})
export class EditStressTestComponent {
     StressTest:StressTest;
     id:  number;
     qtyIn:  number;
     stressDuration:  number;
     stressCycleIn:  number;
     stressDateIn:  string; //Date
     stressDateOut:  string; //Date
     stressReject:  number;
     stressQtyOut:  number;
     testQtyIn:  number;
     testDuration:  number;
     testDateIn:  string; //Date
     testDateOut:  string; //Date
     testRejects:  number;
     testQtyOut:  number;
     clips:  string;
     reballingNumber:  number;
     faNumber:  string;
     box:  string;
     zone:  string;
     faDiscription:  string;
     updatedByPersonId:  number;
     comments:  string;
     updateDate:  string; //Date
     debugData: DebugData[];
     VendorJob:vendorJob;
     Vendors:Vendor[];
     taskData:TaskData[];

    constructor(route: ActivatedRoute,private StressTestService:StressTestService,private appStore: AppStore,private vendorsService: VendorsService)
    {
        this.id =  route.snapshot.params["id"]*1;
        this.StressTestService.select(this.id);
        this.VendorJob=null;

        appStore.subscribe(()=> {
            this.StressTest = appStore.state.stresstests.selected;
            this.id=this.StressTest.id;
            this.qtyIn=this.StressTest.qtyIn;
            this.stressDuration=this.StressTest.stressDuration;
            this.stressCycleIn=this.StressTest.stressCycleIn;
            this.stressDateIn=this.StressTest.stressDateIn;
            this.stressDateOut=this.StressTest.stressDateOut;
            this.stressReject=this.StressTest.stressReject;
            this.stressQtyOut=this.StressTest.stressQtyOut;
            this.testQtyIn=this.StressTest.testQtyIn;
            this.testDuration=this.StressTest.testDuration;
            this.testDateIn=this.StressTest.testDateIn;
            this.testDateOut=this.StressTest.testDateOut;
            this.testRejects=this.StressTest.testRejects;
            this.testQtyOut=this.StressTest.testQtyOut;
            this.clips=this.StressTest.clips;
            this.reballingNumber=this.StressTest.reballingNumber;
            this.faNumber=this.StressTest.faNumber;
            this.box=this.StressTest.box;
            this.zone=this.StressTest.zone;
            this.faDiscription=this.StressTest.faDiscription;
            this.updatedByPersonId=this.StressTest.updatedByPersonId;
            this.comments=this.StressTest.comments;
            this.updateDate=this.StressTest.updateDate;
            this.VendorJob=this.StressTest.vendorJob;
            this.debugData = this.StressTest.debugData || [];
            this.taskData = this.StressTest.taskData || [];
        });

       // this.StressTestService.select(this.id);


    }
    ngOnInit()
    {
        this.appStore.subscribe(()=>{
            this.Vendors = this.appStore.state.vendors.data;
        });

        this.vendorsService.loadAll();
    }
}
