/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {VendorsService} from "../Services/Vendor.service";
import {AppStore} from "../Services/appStore";
import {Vendor} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'Vendors-list',
    template: require("./VendorsList.component.html"),
    styles: [require("./VendorsList.component.css")],
})
export class VendorsListComponent {

    vendors: Vendor[];
    NewVendorName:string;
    searchtxt:string;
    VendorTemp:Vendor[];

    constructor(private vendorsService: VendorsService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.NewVendorName="";
        this.searchtxt="";
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.vendors = this.appStore.state.vendors.data;
        });

        this.vendorsService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/Vendor/edit", row.id]);
    }

    onVendorAdd(name)
    {
        const Vendor ={id:-1,name:name}
        this.vendorsService.save(Vendor)
        this.VendorTemp=[];
        this.vendors=this.VendorTemp.concat(this.vendors);
    }
    onVendorSave(Vendor)
    {
        this.vendorsService.update(Vendor) ;
        this.VendorTemp=[];
        this.vendors=this.VendorTemp.concat(this.vendors);
    }
}
