/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
//import { Component } from '@angular/core';

import { Component,OnInit,AfterViewInit,ViewChild,ViewChildren,QueryList} from '@angular/core';
import {actions as deviceActions, deviceActionTypes} from "../reducers/devices";
import {actions as lotActions} from "../reducers/lots";
import {actions as NickNameActions} from "../reducers/nicknames";
import {actions as TestProgramTravelerActions, testprogramtravelerActionTypes} from "../reducers/testprogramtravelers";
import {actions as TravelerObjectActions}from "../reducers/travelerobjects"
import {actions as TestProgramActions} from "../reducers/testprograms";
import {actions as TemporaryIDActions} from "../reducers/temporaryIDs";
import {actions as TechnologyActions} from "../reducers/technologys";
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {StressTest, DebugData, vendorJob, Vendor, TaskData, TravelerObject, Device, Location, Lot, StressData,
    TravelerTestProgram, Fabricator, Technology, NickName, TestProgram, Bin, Package} from "../reducers/AppState";
import {StressTestService} from "../services/stresstests.service";
import {TravelerObjectsService} from "../services/travelerobjects.service";
import {FabricatorsService} from "../services/fabricators.service";
import {VendorsService} from "../services/vendors.service";
import {DevicesService} from "../services/devices.service";
import {NickNamesService} from "../services/nicknames.service";
import  {BinsService}  from "../services/bins.service";
import {TestProgramsService}  from"../services/testprograms.service";
import {TestProgramTravelersService}  from "../services/testprogramtravelers.service";
import {TechnologysService}  from "../services/technologys.service";
import {PackagesService}  from "../services/packages.service";
import {LocationsService}  from "../services/locations.service";
import {AppStore} from "../services/appStore";
import {NickNamesWebApi} from "../webApis/nicknames.webapi"
import {travelerobjectActionTypes} from "../reducers/travelerobjects";
import {LotsService} from "../services/lots.service";
import {TPSelect} from "./TPSelect";
import {stresstestComponent} from "../StressTests/stresstest.component";


@Component({
    selector: 'edit-TravelerObject',
    template: require("./editTravelerObject.component.html"),
    styles: [require("./editTravelerObject.component.css")],


})
export class EditTravelerObjectComponent implements OnInit {
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
    testLocationSelected:Location;
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

    //TravelerTP for change
    TPSELECT:TPSelect[];

    FileList:File[];

    ////constructor will run first then nginit() will run

    ////when running this.TravelerObjectsService.select(this.id); this call will take time until the server reponse
    /// while this happanning the rest of the commands will continue executing

    //dispatch action will change the state

    ///subscribes , can be more then one , will trigger everytime state will be changed including of course when calling dispatch

    constructor(private route: ActivatedRoute,private TravelerObjectsService:TravelerObjectsService,private StressTestService:StressTestService,private appStore: AppStore,private vendorsService: VendorsService,private fabricatorservice:FabricatorsService,
       private LocationsService:LocationsService,   private  PackagesService:PackagesService,private TechnologysService:TechnologysService,private NickNameService:NickNamesService,private DeviceService:DevicesService ,private LotService:LotsService , private BinService:BinsService,private TestProgramsService:TestProgramsService,private TestProgramTravelersService:TestProgramTravelersService)
    {
        this.tplistdisplay={'display':'none'};
        this.firstTime=0;
        this.firstTravelerObjectLoad=0;
        this.id = route.snapshot.params["id"] * 1;
        this.TravelerObjectsService.select(this.id);
        this.loadAllLists() ///---load all dropdown lists that are not depend on Traveler Object---///
        appStore.subscribe(()=> {

            this.TravelerObject = appStore.state.travelerobjects.selected;

            if(this.firstTravelerObjectLoad==0&&appStore.state.travelerobjects.selected!=null) ///----first time Traveler Object is assign---////
            {
                this.firstTravelerObjectLoad=1;
                this.todoOnTravelerObjectFirstTimeAssign()

            }
            if(this.appStore.state.technologys.data!=null)
            {
                this.technologyList=this.appStore.state.technologys.data;
            }

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

            //TravelerTP for change
            if (this.appStore.state.testprogramtravelers.data!=null)
                if(this.appStore.state.testprogramtravelers.data.length>0){
                    this.TravelerTestPrograms=this.appStore.state.testprogramtravelers.data;
                    this.fillInSelectChecboxForTestProgramsList();
                }
            this.FabricatorSelected=this.appStore.state.fabricators.selected;
            this.TechnologySelected=this.appStore.state.technologys.selected;
            this.PackageSelected=this.appStore.state.packages.selected;

           ////-----fill the checbox on Testprogram list based on the selected testprogram from traveler object---///





            ///---on older devices Mantis Device + Mantis Lot + Nickname is missing in DB----///
            ///----this method will fill the Device/Lot/TestPrograms Lists accordingly ------///

            //TravelerTP for change
            if(this.travdevice!=null&&this.firstTime==0)
            {
                this.fill_Lot_TestProgram_Device_DependOn_NickName_Existence()
            }
        });
    }
    ngOnInit() {}

    //--------------Objects  Methods------------///////////////////////
    private todoOnTravelerObjectFirstTimeAssign() {

        //TravelerTP for change
       // this.appStore.dispatch(TestProgramTravelerActions.AddTestProgramTravelerFromTravelerObject(this.TravelerObject.travelerTestPrograms))

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

        //TravelerTP for change
          this.TravelerTestPrograms=this.TravelerObject.travelerTestPrograms||[];

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
            //alert(this.appStore.state.testprogramtravelers.data[0].id)
            //this.appStore.dispatch(lotActions.selectLot(this.TravelerLot));
        }

        else
        {
           // this.lotsList=this.travdevice.mantisDevice.lots
            //this.appStore.dispatch(lotActions.loadLots(this.lotsList));
            this.LotService.getLotsByDevice(this.travdevice.mantisDevice.id)

            //this.LotSelected = this.TravelerLot.mantisLot;
            this.appStore.dispatch(lotActions.selectLot(this.TravelerObject.travlot));
            this.NickNameSelected=this.travdevice.mantisDevice.deviceNickName;
            this.appStore.dispatch(NickNameActions.selectNickName(this.NickNameSelected));
            this.DeviceService.getDevicesByNickName(this.travdevice.mantisDevice.deviceNickName.id);
            this.TestProgramTravelersService.INITTestProgramTraveler(this.travdevice.mantisDevice.deviceNickName.id)
            this.appStore.dispatch(deviceActions.selectDevice(this.travdevice));


        }


    }
    //TravelerTP for change
    private fillInSelectChecboxForTestProgramsList() {


        //       this.TPSELECT=[];
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
        if(this.appStore.state.nicknames.selected.name!=null)
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
                travlot:this.appStore.state.lots.selected
            }
            );



       // this.stress.doSomething();
        this.TravelerObjectsService.updateTraveler(updatedTraveler)
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

       // const TempTPT = this.TravelerTestPrograms[index];
      ///  this.TravelerTestPrograms.splice(index,1);
       /// this.TravelerTestPrograms.splice(index,0,TempTPT);

        //this.TravelerTestProgramTemp=new Array();
       // this.TravelerTestPrograms=this.TravelerTestProgramTemp.concat(this.TravelerTestPrograms);
       // this.appStore.dispatch(TestProgramTravelerActions.DummyRefreshAction());

        //this.appStore.dispatch(TestProgramTravelerActions.loadTestProgramTravelers(this.TravelerTestPrograms))



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
        let vendorJob={approvalDate:"",comments:"",dtUpdated:"",id:VendorJobTempId ,invoiceNum:"",jobNum:"",vendor:null}
          this.StressTests.push({id: StressTestTempId ,qtyIn:0,stressDuration:0,stressCycleIn:0,stressDateIn:"",stressDateOut:"",stressReject:0,stressQtyOut:0,
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

    //--------------Objects  Methods------------///////////////////////






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
