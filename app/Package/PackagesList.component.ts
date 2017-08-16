/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {PackagesService} from "../Services/Package.service";
import {AppStore} from "../Services/appStore";
import {Package} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";
import {SearchFilterPipe} from "../Filters/Pipe"

@Component({
    selector: 'Packages-list',
    template: require("./PackagesList.component.html"),
    styles: [require("./PackagesList.component.css")],

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
