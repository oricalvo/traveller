/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {BinsService} from "../services/bins.service";
import {AppStore} from "../services/appStore";
import {Bin} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'bins-list',
    template: require("./binsList.component.html"),
    styles: [require("./binsList.component.css")],
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
