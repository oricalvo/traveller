import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {DevicesService} from "../Services/Device.service";
import {AppStore} from "../Services/appStore";
import {Device,Technology,Package,Fabricator} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";
import {FabricatorsService} from "../Services/Fabricator.service";
import {PackagesService}  from "../Services/Package.service";
import {TechnologysService}  from "../Services/Technology.service";
import {deviceActionTypes,actions as DeviceAction} from "../Reducer/Devices";
@Component({
    selector: 'Devices-list',
    template: require("./DevicesList.component.html"),
    styles: [require("./DevicesList.component.css")],
})
export class DevicesListComponent {

    devices: Device[];
    deviceTemp:Device[];
    NewDeviceName:string;
    searchtxt:string;
    technologyList:Technology[];
    packageList:Package[];
    fabricatorList:Fabricator[];
    filteredCount = {count: 0};

    FabricatorSelected:Fabricator;
    TechnologySelected:Technology;
    PackageSelected:Package;
    firstTimeDevicesLoaded:number;


    constructor(private devicesService: DevicesService, private  PackagesService:PackagesService,private TechnologysService:TechnologysService,private fabricatorservice:FabricatorsService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.NewDeviceName="";
        this.searchtxt="";
        this.firstTimeDevicesLoaded=0;
        this.appStore.dispatch(DeviceAction.loadDevices(null))

    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=> {
            if (this.firstTimeDevicesLoaded == 0 && this.appStore.state.devices.data != null) {
                this.firstTimeDevicesLoaded=1;

            this.devices = this.appStore.state.devices.data;
            this.packageList = this.appStore.state.packages.data;
            this.fabricatorList = this.appStore.state.fabricators.data;
            this.technologyList = this.appStore.state.technologys.data;
            this.FabricatorSelected = this.appStore.state.fabricators.selected;
            this.TechnologySelected = this.appStore.state.technologys.selected;
            this.PackageSelected = this.appStore.state.packages.selected;
        }
        });

        this.devicesService.loadAllTravelerDevices();
        this.PackagesService.loadAll();
        this.fabricatorservice.loadAll();
        this.TechnologysService.loadAll();
    }


    private onFabricatorChange(fabricatorid,deviceid){
        let index=this.devices.findIndex(x=>x.id==deviceid);
        let TechnologyClone=Object.assign({},this.devices[index].technology,{fabricator:this.fabricatorList.find(x=>x.id==fabricatorid)});
        let DeviceClone=Object.assign({},this.devices[index],{technology:TechnologyClone});
        this.devices.splice(index,1);
        this.devices.splice(index,0,DeviceClone);
        this.deviceTemp=[];
        this.devices=this.deviceTemp.concat(this.devices);
  }
    private onTechnolgyChange(TechnologyId,deviceid){
        let index=this.devices.findIndex(x=>x.id==deviceid);
        let DeviceClone=Object.assign({},this.devices[index],{technology:this.technologyList.find(x=>x.id==TechnologyId)});
        this.devices.splice(index,1);
        this.devices.splice(index,0,DeviceClone);
        this.deviceTemp=[];
        this.devices=this.deviceTemp.concat(this.devices);
    }
    private onPackageChange(PackageId,deviceid){
        let index=this.devices.findIndex(x=>x.id==deviceid);
        let DeviceClone=Object.assign({},this.devices[index],{devicePackage:this.packageList.find(x=>x.id==PackageId)});
        this.devices.splice(index,1);
        this.devices.splice(index,0,DeviceClone);
        this.deviceTemp=[];
        this.devices=this.deviceTemp.concat(this.devices);
    }
    private onDeviceSave(device){
        alert(device.devicePackage.name);
        this.devicesService.updateDevice(device);
    }

    //private FilterByFabricator(value)
}
