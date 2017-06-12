/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {PackagesService} from "../services/packages.service";
import {AppStore} from "../services/appStore";
import {Package} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";
import {SearchFilterPipe} from "../Filters/Pipe"

@Component({
    selector: 'packages-list',
    template: require("./packagesList.component.html"),
    styles: [require("./packagesList.component.css")],

})
export class PackagesListComponent {

    packages: Package[];
    NewPackageName:string;
    searchtxt:string;
    PackageTemp:Package[];

    constructor(private packagesService: PackagesService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.NewPackageName="";
        this.searchtxt="";

    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.packages = this.appStore.state.packages.data;
        });

        this.packagesService.loadAll();
    }

    onPackageAdd(name)
    {
        const pacKage ={id:-1,name:name}
        this.packagesService.save(pacKage);
        this.PackageTemp=[];
        this.packages=this.PackageTemp.concat(this.packages);
    }
    onPackageSave(pacKage)
    {
        this.packagesService.update(pacKage) ;
        this.PackageTemp=[];
        this.packages=this.PackageTemp.concat(this.packages);
    }
}
