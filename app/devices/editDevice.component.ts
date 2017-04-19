import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Package, Technology,Lot,Device} from "../reducers/AppState";
import {DevicesService} from "../services/devices.service";
import {AppStore} from "../services/appStore";
@Component({
    selector: 'edit-device',
    template: require("./editDevice.component.html"),
    styles: [require("./editDevice.component.css")],
})
export class EditDeviceComponent {
    Device:Device;
    id: number;
    name:string;
    lots:Lot[];
    devicePackage:Package;
    technology:Technology;

    constructor(route: ActivatedRoute,private DeviceService:DevicesService,private appStore: AppStore){
        this.id =  route.snapshot.params["id"]*1;
        this.DeviceService.select(this.id);


        appStore.subscribe(()=> {
            this.Device = appStore.state.devices.selected;
            this.id=this.Device.id;
            this.name=this.Device.name;
            this.lots=this.Device.lots|| [];
            this.devicePackage=this.Device.devicePackage;
            this.technology=this.Device.technology;

        });


        console.log(this.id);
    }
}
