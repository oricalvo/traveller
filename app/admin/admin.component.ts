import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {DevicesService} from "../services/devices.service";
import {AppStore} from "../services/appStore";
import {Device} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";

@Component({
    selector: 'admin',
    template: require("./admin.component.html"),
    styles: [require("./admin.component.css")],
})
export class AdminComponent {
    constructor(){
    }
}
