import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {DevicesService} from "../Services/Device.service";
import {AppStore} from "../Services/appStore";
import {Device} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";

@Component({
    selector: 'Admin',
    template: require("./Admin.component.html"),
    styles: [require("./Admin.component.css")],
})
export class AdminComponent {
    constructor(){
    }
}
