/**
 * Created by eilamc on 3/13/2017.
 */
import {Input, Component,Output,EventEmitter,} from "@angular/core";
import {CommonModule} from "@angular/common"
import {DebugData, StressTest, TravelerTestProgram} from "../Reducer/AppState";
import {VendorsService} from "../Services/Vendor.service";
import { vendorJob, Vendor, TaskData} from "../Reducer/AppState";
import {AppStore} from "../Services/appStore";
import {actions as TemporaryIDActions} from "../Reducer/TemporaryIDs";
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'StressTest',
    template: require("./stresstest.component.html"),
    styles: [require("./stresstest.component.css")],

})
export class stresstestComponent {
    Vendors:Vendor[];
    @Input() stresstest:StressTest;
    @Input() travelerTestPrograms:TravelerTestProgram[]
    @Output() DeleteDebugData = new EventEmitter<any>();
    @Output() EmitAction= new EventEmitter<any>();
    private Stresstest:StressTest;
    StressTestDebugDatas:DebugData[]
    private FirstTimeStressTestLoaded:boolean;
    selected_index:number;
    selected_Index:string;

    constructor( private appStore: AppStore,private vendorsService: VendorsService){

        this.FirstTimeStressTestLoaded=false;


        appStore.subscribe(()=> {
            if(this.stresstest!=null&&this.FirstTimeStressTestLoaded==false)
            {


                this.Stresstest=this.stresstest;
                this.FirstTimeStressTestLoaded=true;
                this.Stresstest=this.stresstest;
                this.StressTestDebugDatas=new Array();
                for(let v of this.stresstest.debugData||[])
                    this.StressTestDebugDatas.push(v);

            }
        });


    }
    UpdateStressTestInTraveleObject(travelerid){

        alert(this.stresstest.id.toString()+""+travelerid.toString())
    }
    DeleteDebugdata(DebugDataID)
    {
        let DebugDataId=DebugDataID.id
        let StressTestId=this.stresstest.id
        this.DeleteDebugData.emit({DebugDataId,StressTestId})

    }
    onDeleteDebugData(DebugDataID)
    {/*
        let DebugDataId=DebugDataID
        let StressTestId=this.stresstest.id
        let EmitedAction= "DeleteDebugData";
        this.EmitAction.emit({EmitedAction,StressTestId,DebugDataId})*/
        let IndexOfDebugDataToRemove = this.stresstest.debugData.findIndex(x=>x.id==DebugDataID);
        this.stresstest.debugData.splice(IndexOfDebugDataToRemove,1)
    }
    onDebugDataAdd()
    {
        this.appStore.dispatch(TemporaryIDActions.getDebugDataTemporaryID())
        let tempid=this.appStore.state.temporaryIDs.DebugDataTemporaryID;
        /*
        let StressTestId=this.stresstest.id;
        let EmitedAction= "AddDebugData";
        this.EmitAction.emit({EmitedAction,StressTestId,tempid})*/
        let DebugData={id:+tempid,desc:"",images:[]};
        this.stresstest.debugData.push(DebugData)

    }
    DebugDataEmitAction(emitedAction)
    {
        let StressTestId=this.stresstest.id
        let emitedaction=Object.assign({},emitedAction,{StressTestId})
      this.EmitAction.emit(emitedaction) ;
    }
    onVendorChange(event)
    {
        this.stresstest.vendorJob.vendor=this.Vendors.find(x=>x.id==event);
    }

    ngOnInit()
    {
        this.appStore.subscribe(()=>{
            this.Vendors = this.appStore.state.vendors.data;
        });

        this.vendorsService.loadAll();
    }



}
