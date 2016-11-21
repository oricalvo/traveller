import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
    selector: 'edit-device',
    template: require("./editDevice.component.html"),
    styles: [require("./editDevice.component.css")],
})
export class EditDeviceComponent {
    deviceId: number;

    constructor(route: ActivatedRoute){
        this.deviceId =  route.snapshot.params["id"]*1;

        console.log(this.deviceId);
    }
}
