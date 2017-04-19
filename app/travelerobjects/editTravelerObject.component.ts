/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
//import { Component } from '@angular/core';
import { Component,OnInit,AfterViewInit} from '@angular/core';
import {actions as deviceActions, deviceActionTypes} from "../reducers/devices";
import {actions as lotActions} from "../reducers/lots";
import {actions as NickNameActions} from "../reducers/nicknames";
import {actions as TestProgramTravelerActions} from "../reducers/testprogramtravelers";
import {actions as TravelerObjectActions}from "../reducers/travelerobjects"
import {actions as TestProgramActions} from "../reducers/testprograms";
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

@Component({
    selector: 'edit-TravelerObject',
    template: require("./editTravelerObject.component.html"),
    styles: [require("./editTravelerObject.component.css")],
})
export class EditTravelerObjectComponent implements OnInit {
   // route: ActivatedRoute;

    TravelerObject:TravelerObject;

     id: number;  name:string;  totalDuration:number;  jedecLevel:number;  condition:string;  comments:string;
     createdDate:string;  updatedDate:string;  updatedbyUser:number;  tplistdisplay;


    devicesList?:Device[];
    technologyList:Technology[];
    packageList:Package[];
    fabricatorList:Fabricator[];
    locationList:Location[];
    lotsList?:Lot[];
    binList:Bin[];
    nicknamesList?:NickName[];

    TravelerDeviceSelected:Device;
    PackageSelected:Package;
    FabricatorSelected:Fabricator;
    LotSelected:Lot;
    NickNameSelected:NickName;
    TechnologySelected:Technology;
    LocationSelected:Location;

    assemblyLocation:Location;
    TravelerLot:Lot;
    StressData:StressData;
    StressTests:StressTest[];
    TravelerTestPrograms:TravelerTestProgram[];
    technology:Technology;

    private firstTime;
    firstTravelerObjectLoad;
    travdevice:Device;
    TpSelect:boolean[];


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
            this.locationList=this.appStore.state.locations.data;
            this.devicesList=this.appStore.state.devices.data;
            this.lotsList=this.appStore.state.lots.data;
            this.binList=this.appStore.state.bins.data;

            this.TravelerDeviceSelected=this.appStore.state.devices.selected;
            this.LotSelected=this.appStore.state.lots.selected;
            this.NickNameSelected=this.appStore.state.nicknames.selected;
            this.TravelerTestPrograms=this.appStore.state.testprogramtravelers.data;
            this.FabricatorSelected=this.appStore.state.fabricators.selected;
            this.TechnologySelected=this.appStore.state.technologys.selected;
            this.PackageSelected=this.appStore.state.packages.selected;




           ////-----fill the checbox on Testprogram list based on the selected testprogram from traveler object---///
           if (this.appStore.state.testprogramtravelers.data!=null)
           {
               this.fillInSelectChecboxForTestProgramsList()
           }

            ///---on older devices Mantis Device + Mantis Lot + Nickname is missing in DB----///
            ///----this method will fill the Device/Lot/TestPrograms Lists accordingly ------///
            if(this.travdevice!=null&&this.firstTime==0)
            {
                this.fill_Lot_TestProgram_Device_DependOn_NickName_Existence()
            }



        });
    }
    ngOnInit() {}

    //--------------Objects  Methods------------///////////////////////
    private todoOnTravelerObjectFirstTimeAssign()
    {
        this.appStore.dispatch(TestProgramTravelerActions.AddTestProgramTravelerFromTravelerObject(this.TravelerObject.travelerTestPrograms))
        this.TechnologysService.getTechnologiesByFabricator(this.TravelerObject.travdevice.technology.fabricator.id)
        this.TechnologysService.select(this.TravelerObject.travdevice.technology.id)
        this.fabricatorservice.select(this.TravelerObject.travdevice.technology.fabricator.id)
        this.PackagesService.select(this.TravelerObject.travdevice.devicePackage.id)
        this.FabricatorSelected = this.TravelerObject.travdevice.technology.fabricator;
        this.TechnologySelected = this.TravelerObject.travdevice.technology;
        this.PackageSelected = this.TravelerObject.travdevice.devicePackage;
        this.LocationSelected = this.TravelerObject.assemblyLocation;this.id=this.TravelerObject.id;
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
         this.StressTests=this.TravelerObject.stressTests||[];
         this.TravelerTestPrograms=this.TravelerObject.travelerTestPrograms||[];

    }
    private fill_Lot_TestProgram_Device_DependOn_NickName_Existence()
    {
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

    private fillInSelectChecboxForTestProgramsList()
    {

        this.TpSelect=[];

        for(let v of this.appStore.state.testprogramtravelers.data)
        {
            if(v.testProgram.mantisTestProgram.testProgramName==v.testProgram.testProgramName)
                this.TpSelect.push(true) ;
            else this.TpSelect.push(false) ;
        }

    }
    private loadAllLists()
    {
        this.NickNameService.loadAll();
        this.BinService.loadAll();
        this.fabricatorservice.loadAll();
        this.PackagesService.loadAll();
        this.LocationsService.getLocationsByLocationTypeID(1)
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

        ///--------updating TravelerObject objects ----------------////
        const updatedTraveler=Object.assign({}, this.appStore.state.travelerobjects.selected,
            {
                travdevice:TravelerDevice,
                travlot:this.appStore.state.lots.selected
            }
            );

        this.TravelerObjectsService.updateTraveler(updatedTraveler)
    }

    private onNicNameChange(obj){
        this.NickNameService.select(obj)

        this.appStore.dispatch(deviceActions.selectDevice(null));
        this.LotSelected=null;
        this.appStore.dispatch(lotActions.selectLot(null));
        this.DeviceService.getDevicesByNickName(obj);
        this.TestProgramTravelersService.INITTestProgramTraveler(obj);
        this.fillInSelectChecboxForTestProgramsList();


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

    private onBinChange(BinID,TravelerTestProgramId){

    }
    private onFabricatorChange(obj){
        this.appStore.dispatch(TechnologyActions.selectTechnology(null));
        this.fabricatorservice.select(obj);
        this.TechnologysService.getTechnologiesByFabricator(obj);
    }

    private onTechnolgyChange(obj){
        this.TechnologysService.select(obj);


    }
    //--------------Objects  Methods------------///////////////////////






    //--------------UI Methods------------///////////////////////

    private toggleTestProgramList()
    {
        if (this.tplistdisplay.display == "none") this.tplistdisplay.display = "block";
        else this.tplistdisplay.display = "none";
    }
    private closeTestProgramList()
    {
        this.tplistdisplay.display = "none";
    }

    //--------------UI Methods------------///////////////////////

}
