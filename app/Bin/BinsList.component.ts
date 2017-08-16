/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {BinsService} from "../Services/Bin.service";
import {AppStore} from "../Services/appStore";
import {Bin} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'Bins-list',
    template: require("./BinsList.component.html"),
    styles: [require("./BinsList.component.css")],
})
export class BinsListComponent {

    bins: Bin[];
    NewBinName:string;
    searchtxt:string;
    BinTemp:Bin[];

    constructor(private binsService: BinsService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.NewBinName="";
        this.searchtxt="";
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.bins = this.appStore.state.bins.data;
        });

        this.binsService.loadAll();
    }

    onBinAdd(name)
    {
        const Bin ={id:-1,name:name}
        this.binsService.save(Bin)
        this.BinTemp=[];
        this.bins=this.BinTemp.concat(this.bins);

    }
    onBinSave(Bin)
    {
        this.binsService.update(Bin) ;
        this.BinTemp=[];
        this.bins=this.BinTemp.concat(this.bins);
    }
}
