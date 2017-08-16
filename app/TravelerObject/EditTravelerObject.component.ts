/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
//import { Component } from '@angular/core';

import { Component,OnInit,AfterViewInit,ViewChild,ViewChildren,QueryList} from '@angular/core';
import {actions as deviceActions, deviceActionTypes} from "../Reducer/Devices";
import {actions as lotActions} from "../Reducer/Lot";
import {actions as NickNameActions} from "../Reducer/NickName";
import {actions as TestProgramTravelerActions, testprogramtravelerActionTypes} from "../Reducer/TestProgramTraveler";
import {actions as TravelerObjectActions}from "../Reducer/TravelerObject"
import {actions as TestProgramActions} from "../Reducer/TestProgram";
import {actions as TemporaryIDActions} from "../Reducer/TemporaryIDs";
import {actions as TechnologyActions} from "../Reducer/Technology";
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {StressTest, DebugData, vendorJob, Vendor, TaskData, TravelerObject, Device, Location, Lot, StressData,
    TravelerTestProgram, Fabricator, Technology, NickName, TestProgram, Bin, Package} from "../Reducer/AppState";
import {TravelerObjectsService} from "../Services/TravelerObject.service";
import {FabricatorsService} from "../Services/Fabricator.service";
import {VendorsService} from "../Services/Vendor.service";
import {DevicesService} from "../Services/Device.service";
import {NickNamesService} from "../Services/NickName.service";
import  {BinsService}  from "../Services/Bin.service";
import {TestProgramsService}  from"../Services/TestProgram.service";
import {TestProgramTravelersService}  from "../Services/TestProgramTraveler.service";
import {TechnologysService}  from "../Services/Technology.service";
import {PackagesService}  from "../Services/Package.service";
import {LocationsService}  from "../Services/Location.service";
import {travelerConfigService}  from "../Services/TravelerConfig.service";
import {AppStore} from "../Services/appStore";
import {NickNamesWebApi} from "../WebApis/nicknames.webapi"
import {travelerobjectActionTypes,actions as TravelerObjectAction} from "../Reducer/TravelerObject";
import {LotsService} from "../Services/Lot.service";
import {stresstestComponent} from "../StressTests/stresstest.component";


@Component({
    selector: 'edit-TravelerObject',
    template: require("./EditTravelerObject.component.html"),
    styles: [require("./EditTravelerObject.component.css")],


})
export class EditTravelerObjectComponent  {
   // route: ActivatedRoute;
    @ViewChildren(stresstestComponent) stress: QueryList<stresstestComponent>;
    TravelerObject:TravelerObject;
     id: number;  name:string;  totalDuration:number;  jedecLevel:number;  condition:string;  comments:string;
     createdDate:string;  updatedDate:string;  updatedbyUser:number;  tplistdisplay;
    devicesList?:Device[];
    technologyList:Technology[];
    packageList:Package[];
    fabricatorList:Fabricator[];
    assemblylocationList:Location[];
    testlocationList:Location[];
    stresslocationList:Location[];
    lotsList?:Lot[];
    binList:Bin[];
    nicknamesList?:NickName[];
    TravelerDeviceSelected:Device;
    PackageSelected:Package;
    FabricatorSelected:Fabricator;
    LotSelected:Lot;
    NickNameSelected:NickName;
    TechnologySelected:Technology;
    assemblyLocationSelected:Location;
    stressLocationSelected:Location;
    assemblyLocation:Location;
    TravelerLot:Lot;
    StressData:StressData;
    StressTests:StressTest[];
    TravelerTestProgramTemp:TravelerTestProgram[];
    //TravelerTP for change
    TravelerTestPrograms:TravelerTestProgram[];
    technology:Technology;
    private firstTime;
    firstTravelerObjectLoad;
    travdevice:Device;
    FileList:File[];
    StressTestsTemp:StressTest[];

    ////constructor will run first then nginit() will run

    ////when running this.TravelerObjectsService.select(this.id); this call will take time until the server reponse
    /// while this happanning the rest of the commands will continue executing

    //dispatch action will change the state

    ///subscribes , can be more then one , will trigger everytime state will be changed including of course when calling dispatch

    constructor(private route: ActivatedRoute,private TravelerObjectsService:TravelerObjectsService,private appStore: AppStore,private vendorsService: VendorsService,private fabricatorservice:FabricatorsService,
       private LocationsService:LocationsService,private travelerConfigService:travelerConfigService,   private  PackagesService:PackagesService,private TechnologysService:TechnologysService,private NickNameService:NickNamesService,private DeviceService:DevicesService ,private LotService:LotsService , private BinService:BinsService,private TestProgramsService:TestProgramsService,private TestProgramTravelersService:TestProgramTravelersService)
    {
        this.appStore.dispatch(TravelerObjectAction.selectTravelerObject(null));
        this.tplistdisplay={'display':'none'};
        this.firstTime=0;
        this.firstTravelerObjectLoad=0;
        this.id = route.snapshot.params["id"] * 1;
        this.TravelerObjectsService.select(this.id);
        this.loadAllLists() ///---load all dropdown lists that are not depend on Traveler Object---///
        appStore.subscribe(()=> {

            this.TravelerObject = appStore.state.travelerobjects.selected;

            //update StressTests after TravlerObject save
            if(appStore.state.travelerobjects.selected!=null)
                if(appStore.state.travelerobjects.selected.Status==3) {
                    this.appStore.dispatch(TravelerObjectActions.set_traveler_object_status(2))
                    this.StressTestsTemp=[];
                    this.StressTests=this.StressTestsTemp.concat(appStore.state.travelerobjects.selected.stressTests);

                }

            ///----first time Traveler Object is assign---////
            if(this.firstTravelerObjectLoad==0&&appStore.state.travelerobjects.selected!=null)
            {

                this.firstTravelerObjectLoad=1;
                this.todoOnTravelerObjectFirstTimeAssign();

                ///---on older Device Mantis Device + Mantis Lot + Nickname is missing in DB----///
                ///----this method will fill the Device/Lot/TestPrograms Lists accordingly ------///
                this.fill_Lot_TestProgram_Device_DependOn_NickName_Existence();
            }
            if (this.appStore.state.testprogramtravelers.data!=null&&appStore.state.travelerobjects.selected!=null)
                if(this.appStore.state.testprogramtravelers.data.length>0){
                    this.TravelerTestPrograms=this.appStore.state.testprogramtravelers.data;
                    this.fillInSelectChecboxForTestProgramsList();
                }

            this.technologyList=this.appStore.state.technologys.data;
            this.packageList= this.appStore.state.packages.data;
            this.nicknamesList = this.appStore.state.nicknames.data;
            this.fabricatorList=this.appStore.state.fabricators.data;
            this.assemblylocationList=this.appStore.state.locations.assemblyLocations;
            this.testlocationList=this.appStore.state.locations.testLocations;
            this.stresslocationList=this.appStore.state.locations.stressLocations;
            this.devicesList=this.appStore.state.devices.data;
            this.lotsList=this.appStore.state.lots.data;
            this.binList=this.appStore.state.bins.data;
            this.TravelerDeviceSelected=this.appStore.state.devices.selected;
            this.LotSelected=this.appStore.state.lots.selected;
            this.NickNameSelected=this.appStore.state.nicknames.selected;
            this.assemblyLocationSelected=this.appStore.state.locations.selectedassemblyLocation;
            this.stressLocationSelected=this.appStore.state.locations.selectedstressLocation;
            this.FabricatorSelected=this.appStore.state.fabricators.selected;
            this.TechnologySelected=this.appStore.state.technologys.selected;
            this.PackageSelected=this.appStore.state.packages.selected;


        });
    }


    //--------------Objects  Methods------------///////////////////////
    private todoOnTravelerObjectFirstTimeAssign() {
        this.appStore.dispatch(TravelerObjectActions.set_traveler_object_status(2))
        this.travelerConfigService.getTravelerConfig();
        this.TechnologysService.getTechnologiesByFabricator(this.TravelerObject.travdevice.technology.fabricator.id)
        this.TechnologysService.select(this.TravelerObject.travdevice.technology.id)
        this.fabricatorservice.select(this.TravelerObject.travdevice.technology.fabricator.id)
        this.PackagesService.select(this.TravelerObject.travdevice.devicePackage.id)
        this.LocationsService.selectAssemblylocation(this.TravelerObject.assemblyLocation.id)
        if(this.TravelerObject.stressTests.length!=0) {
            this.LocationsService.selectStresslocation(this.TravelerObject.stressTests[0].stressLocation.id)
        }
        this.FabricatorSelected = this.TravelerObject.travdevice.technology.fabricator;
        this.TechnologySelected = this.TravelerObject.travdevice.technology;
        this.PackageSelected = this.TravelerObject.travdevice.devicePackage;
        this.assemblyLocationSelected= this.TravelerObject.assemblyLocation;
        this.id=this.TravelerObject.id;
        this.name =this.TravelerObject.name;
        this.totalDuration=this.TravelerObject.totalDuration;
        this.jedecLevel=this.TravelerObject.jedecLevel;
        this.condition=this.TravelerObject.condition
        this.comments=this.TravelerObject.comments
        this.createdDate=this.TravelerObject.createdDate
        this.updatedDate=this.TravelerObject.updatedDate
        this.updatedbyUser=this.TravelerObject.updatedbyUser
        this.assemblyLocation=this.TravelerObject.assemblyLocation;

        this.travdevice=this.TravelerObject.travdevice;
        this.TravelerLot = this.TravelerObject.travlot;
        this.technology=this.travdevice.technology;
         this.StressData=this.TravelerObject.stressData;
         this.StressTests=new Array();
         this.FileList=new Array();
        for(let v of this.TravelerObject.stressTests)

        {

            this.StressTests.push(v)
        }


    }
    //TravelerTP for change
    private fill_Lot_TestProgram_Device_DependOn_NickName_Existence() {
        this.firstTime=1;
        if(this.travdevice.mantisDevice==null) {
            this.appStore.dispatch(deviceActions.selectDeviceThatHasNoMantisDevice(this.travdevice));
            this.devicesList = [];
            this.devicesList.push(this.appStore.state.devices.selected);
            this.appStore.dispatch(deviceActions.loadDevices( this.devicesList))
            this.appStore.dispatch(lotActions.selectLotThatHasNoMantisLot(this.TravelerLot));
            this.lotsList = [];
            this.lotsList.push(this.appStore.state.lots.selected)
            this.appStore.dispatch(lotActions.loadLots(this.lotsList));
            this.appStore.dispatch(TestProgramTravelerActions.AddTestProgramTravelerFromTravelerObject(this.TravelerObject.travelerTestPrograms));
        }

        else
        {
            this.LotService.getLotsByDevice(this.travdevice.mantisDevice.id)
            this.appStore.dispatch(lotActions.selectLot(this.TravelerObject.travlot));
            this.NickNameSelected=this.travdevice.mantisDevice.deviceNickName;
            this.appStore.dispatch(NickNameActions.selectNickName(this.NickNameSelected));
            this.DeviceService.getDevicesByNickName(this.travdevice.mantisDevice.deviceNickName.id);
            this.TestProgramTravelersService.INITTestProgramTraveler(this.travdevice.mantisDevice.deviceNickName.id)
            this.appStore.dispatch(deviceActions.selectDevice(this.travdevice));


        }


    }
    private fillInSelectChecboxForTestProgramsList() {
        for(let v of this.appStore.state.testprogramtravelers.data)
        {
            let checkIfExist =0;
            for(let t of this.TravelerObject.travelerTestPrograms)
            {
                if(t.testProgram.testProgramName==v.testProgram.testProgramName)
                {
                    checkIfExist=1;
                }
            }
            if(checkIfExist==1)
                v.selected=true;
            else{v.selected=false;}

        }
        this.TravelerTestProgramTemp=[];
        this.TravelerTestPrograms=this.TravelerTestProgramTemp.concat(this.TravelerTestPrograms);
    }

    private loadAllLists() {
        this.NickNameService.loadAll();
        this.BinService.loadAll();
        this.fabricatorservice.loadAll();
        this.PackagesService.loadAll();
        this.LocationsService.getLocationsByLocationTypeID(1)
        this.LocationsService.getLocationsByLocationTypeID(2)
        this.LocationsService.getLocationsByLocationTypeID(3)
    }
    private onSave(){
        /////todo- need to add all selected testprgrams to travelerobject

        //------adding Nicname if valid to TravelerDevice ------//
        var TravelerDevice = this.appStore.state.devices.selected;

        if(this.appStore.state.nicknames.selected!=null)
            TravelerDevice=Object.assign({}, this.appStore.state.devices.selected,{deviceNickName:this.appStore.state.nicknames.selected.name});

        //--------updating the current Technology and Fabricator and Package on TravelerDevice-------///
        const Technology = Object.assign({}, this.appStore.state.technologys.selected,{fabricator:this.appStore.state.fabricators.selected});
        TravelerDevice=Object.assign({}, TravelerDevice,{technology:Technology,devicePackage:this.appStore.state.packages.selected});

        // -------updating Selected Test programs with the selected Bin and Test Location------------///

        let TPTList =this.TravelerObject.travelerTestPrograms;
        TPTList=[];


        for (let v of this.TravelerObject.travelerTestPrograms)
        {

            const TPT = this.TravelerTestPrograms.find(x=>x.id==v.id);
            TPTList.push(TPT);
            this.TravelerObject=Object.assign({},this.TravelerObject,{travelerTestPrograms:TPTList});
        }


        ///--------updating TravelerObject objects ----------------////
        const updatedTraveler=Object.assign({}, this.TravelerObject,
            {
                condition:this.condition,
                jedecLevel:this.jedecLevel,
                totalDuration:this.totalDuration,
                assemblyLocation:this.assemblyLocationSelected,
                travdevice:TravelerDevice,
                travlot:this.appStore.state.lots.selected,
                stressTests:this.StressTests
            }
            );



       // this.stress.doSomething();
     //   this.TravelerObjectsService.updateTraveler(updatedTraveler)
        this.TravelerObjectsService.updateTravelerTest(this.FileList,updatedTraveler)
    }
    private onUpdateStressTest(){
        this.stress.forEach((x)=>{x.UpdateStressTestInTraveleObject(this.TravelerObject.id)});
    }
    private onNicNameChange(obj){
        this.TravelerObject.travelerTestPrograms.splice(0,this.TravelerObject.travelerTestPrograms.length);
        this.NickNameService.select(obj)
        this.appStore.dispatch(deviceActions.selectDevice(null));
        this.LotSelected=null;
        this.appStore.dispatch(lotActions.selectLot(null));
        this.DeviceService.getDevicesByNickName(obj);
        this.TestProgramTravelersService.INITTestProgramTraveler(obj);

     //
      //  this.fillInSelectChecboxForTestProgramsList();


    }
    private onDevChange(obj){
        this.DeviceService.select(obj);
        this.LotSelected=null;
        this.appStore.dispatch(lotActions.selectLot(null));
        this.appStore.dispatch(lotActions.loadLots(null));
        this.LotService.getLotsByDevice(obj);

    }
    private onLotChange(obj){
        this.LotService.select(obj);


    }
    private onPackageChange(obj){
        this.PackagesService.select(obj);
    }
    private onAssemblyLocationChange(obj){
        this.LocationsService.selectAssemblylocation(obj);
    }
    //TravelerTP for change
    private onBinChange(BinID,TravelerTestProgramId){
       this.BinService.updateBinInTravelerTestProgram(BinID,TravelerTestProgramId)
    }
    //TravelerTP for change
    private onTestLocationChange(LocationID,TravelerTestProgramId){
        this.LocationsService.updateLocatioInTravelerTestProgram(LocationID,TravelerTestProgramId);

    }
    //TravelerTP for change
    private onTestProgramTravelerSelectChange(index){
        if(this.TravelerObject.travelerTestPrograms.length<3)
        {
            if (this.TravelerTestPrograms[index].expectedBin==null )
            {alert("please select Expected Bin"); return;}
            if( this.TravelerTestPrograms[index].testLocation==null)
            {alert("please select Test Location"); return;}
            if(this.TravelerTestPrograms[index].selected==false)
            {

                this.TravelerObject.travelerTestPrograms.push(this.TravelerTestPrograms[index]);
                this.TravelerTestPrograms[index].selected=true;

            }
            else
            {
                const IndexToRemove=this.TravelerObject.travelerTestPrograms.findIndex(x=>x.testProgram.testProgramName==this.TravelerTestPrograms[index].testProgram.testProgramName)
                this.TravelerObject.travelerTestPrograms.splice(IndexToRemove,1)
                this.appStore.dispatch(TestProgramTravelerActions.UpdateTestProgramTravelerBin(null,index))
                this.appStore.dispatch(TestProgramTravelerActions.UpdateTestProgramTravelerLocation(null,index))
                this.TravelerTestPrograms[index].selected=false;
            }
        }
        else{
            if(this.TravelerTestPrograms[index].selected==true)
            {
                const IndexToRemove=this.TravelerObject.travelerTestPrograms.findIndex(x=>x.testProgram.testProgramName==this.TravelerTestPrograms[index].testProgram.testProgramName)
                this.TravelerObject.travelerTestPrograms.splice(IndexToRemove,1)
                this.appStore.dispatch(TestProgramTravelerActions.UpdateTestProgramTravelerBin(null,index))
                this.appStore.dispatch(TestProgramTravelerActions.UpdateTestProgramTravelerLocation(null,index))
                this.TravelerTestPrograms[index].selected=false;
            }
            else
            {
                alert("only 3 Test programs can be choose")
                this.TravelerTestPrograms[index].selected=false
            }

        }




    }
    private onStressLocationChange(obj){
        this.LocationsService.selectStresslocation(obj);


    }

    private onFabricatorChange(obj){
        this.appStore.dispatch(TechnologyActions.selectTechnology(null));
        this.fabricatorservice.select(obj);
        this.TechnologysService.getTechnologiesByFabricator(obj);
    }
    private onTechnolgyChange(obj){
        this.TechnologysService.select(obj);


    }
    onStressTestAdd() {
        if(this.stressLocationSelected==null)
        {
            alert("Please select Stress Location");
            return;
        }
          this.appStore.dispatch(TemporaryIDActions.getStresstestTemporaryID());
        this.appStore.dispatch(TemporaryIDActions.getVendorJobTemporaryID());
          let StressTestTempId =this.appStore.state.temporaryIDs.StressTestTemporaryID;
          let VendorJobTempId=this.appStore.state.temporaryIDs.VendorJobTemporaryID;

        var today = new Date();
        var dd = today.getDate();
        var ddString; var mmString;
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) ddString='0'+dd; else ddString=dd;
        if(mm<10) mmString='0'+mm; else mmString=mm;
        let date =yyyy+'-'+mmString+'-'+ddString;

        let vendorJob={approvalDate:"",comments:"",dtUpdated:"",id:VendorJobTempId ,invoiceNum:"",jobNum:"",vendor:null}
          this.StressTests.push({id: StressTestTempId ,qtyIn:0,stressDuration:0,stressCycleIn:0,stressDateIn:date,stressDateOut:date,stressReject:0,stressQtyOut:0,
            testQtyIn:0,testDuration:0,testDateIn:"",testDateOut:"",testRejects:0,testQtyOut:0,clips:"",
              reballingNumber:0,faNumber:"",box:"",zone:"",faDiscription:"",updatedByPersonId:0,comments:"",updateDate:"",debugData:[],taskData:[],vendorJob:vendorJob, stressLocation:this.stressLocationSelected});
           let id=StressTestTempId;
           let StressLocation=this.stressLocationSelected;
           this.appStore.dispatch(TravelerObjectActions.add_stress_test_to_traveler_object({id,StressLocation}));
     }
    onStressTestDelete(id) {
        alert(id);
        this.appStore.dispatch(TravelerObjectActions.delete_stress_test_from_traveler_object(id));
        let IndexOfObjectToRemove = this.StressTests.findIndex(x=>x.id==id);
        this.StressTests.splice(IndexOfObjectToRemove,1);

    }
    DeleteDebugdata(debugdataIdAndStressTestId) {
        alert(debugdataIdAndStressTestId.DebugDataId);
        alert(debugdataIdAndStressTestId.StressTestId)
    }
    EmitActions(event) {
        if(event.EmitedAction=="DeleteDebugData")
        {
            this.appStore.dispatch(TravelerObjectActions.delete_debug_data_from_traveler_object(event));
           alert(event.StressTestId);
            alert(event.DebugDataId);
        }
        if(event.EmitedAction=="AddDebugData")

        {
           // this.appStore.dispatch(TemporaryIDActions.getDebugDataTemporaryID());
          //  let tempid =this.appStore.state.temporaryIDs.DebugDataTemporaryID;
           // event=Object.assign({},event,{tempid})
            this.appStore.dispatch(TravelerObjectActions.add_debug_data_to_traveler_object(event));
           // alert(event.StressTestId);
        }
        if(event.EmitedAction=="DeleteImage")
        {
            alert(event.StressTestId);
            alert(event.DebugDataId);
            alert(event.ImageId);
        }
        if(event.EmitedAction=="AddImage")
        {
            alert(event.StressTestId);
            alert(event.DebugDataId);
            alert(event.FilePath);
        }
        if(event.EmitedAction=="AddFileToTravelerFileList"){
            this.FileList.push(event.File);

        }
        if(event.EmitedAction=="VendorChange"){
            let StressTestIndex=this.StressTests.findIndex(x=>x.id==event.StressTestId)
            let StressTestClone=this.StressTests.find(x=>x.id==event.StressTestId)
            let VendorJobClone=StressTestClone.vendorJob;
            VendorJobClone=Object.assign({},VendorJobClone,{vendor:event.Vendor});
            StressTestClone=Object.assign({},StressTestClone,{vendorJob:VendorJobClone})
            this.StressTests.splice(StressTestIndex,1);
            this.StressTests.splice(StressTestIndex,0,StressTestClone);


        }

    }


    //--------------UI Methods------------///////////////////////

    private toggleTestProgramList() {
        if (this.tplistdisplay.display == "none") this.tplistdisplay.display = "block";
        else this.tplistdisplay.display = "none";
    }
    private closeTestProgramList() {
        this.tplistdisplay.display = "none";
    }

    //--------------UI Methods------------///////////////////////

}
