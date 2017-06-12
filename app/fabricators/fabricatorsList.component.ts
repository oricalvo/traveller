/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {FabricatorsService} from "../services/fabricators.service";
import {AppStore} from "../services/appStore";
import {Fabricator} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'fabricators-list',
    template: require("./fabricatorsList.component.html"),
    styles: [require("./fabricatorsList.component.css")],
})
export class FabricatorsListComponent {

    fabricators: Fabricator[];
    NewFabricatorName:string;
    searchtxt:string;
    FabricatorTemp:Fabricator[];
    constructor(private fabricatorsService: FabricatorsService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.NewFabricatorName="";
        this.searchtxt="";

    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.fabricators = this.appStore.state.fabricators.data;
        });

        this.fabricatorsService.loadAll();
    }

    onFabricatorAdd(name)
    {
        const fabricator ={id:-1,name:name}
        this.fabricatorsService.save(fabricator)
        this.FabricatorTemp =[];
        this.fabricators=this.FabricatorTemp.concat(this.fabricators);

    }
    onFabricatorSave(fabricator)
    {
        this.fabricatorsService.update(fabricator) ;
        this.FabricatorTemp =[];
        this.fabricators=this.FabricatorTemp.concat(this.fabricators);
    }
}
