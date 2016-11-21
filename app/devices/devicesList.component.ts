import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {DevicesService} from "../services/devices.service";
import {AppStore} from "../services/appStore";
import {Device} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'devices-list',
    template: require("./devicesList.component.html"),
    styles: [require("./devicesList.component.css")],
})
export class DevicesListComponent {
    columns: GridColumn[];
    devices: Device[];

    constructor(private devicesService: DevicesService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.columns = [
            {title: "ID", field: "id"},
            {title: "Name", field: "name"},
        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.devices = this.appStore.state.devices.data;
        });

        this.devicesService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/devices/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
}
