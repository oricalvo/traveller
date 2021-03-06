/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {TechnologysService} from "../Services/Technology.service";
import {FabricatorsService} from "../Services/Fabricator.service";
import {AppStore} from "../Services/appStore";
import {Technology,Fabricator} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'Technologies-list',
    template: require("./TechnologiesList.component.html"),
    styles: [require("./TechnologiesList.component.css")],
})
export class TechnologysListComponent {

    fabricatorList:Fabricator[];
    fabricatorSelected:Fabricator;
    technologys: Technology[];
    TechnologyTemp:Technology[];
    NewTechnologyName:string;
    searchtxt:string;
    firstTimeTecnologyLoaded:number;

    constructor(private technologysService: TechnologysService,private fabricatorservice:FabricatorsService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.NewTechnologyName="";
        this.searchtxt="";
        this.firstTimeTecnologyLoaded=0;
        this.technologys=[];

        this.fabricatorSelected=null;
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.technologys=this.appStore.state.technologys.data;
            this.fabricatorList = this.appStore.state.fabricators.data;
        });

        this.technologysService.loadAll();
        this.fabricatorservice.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/Technology/edit", row.id]);
    }

    onFabricatorChange(event){
     this.fabricatorSelected=this.fabricatorList.find(x=>x.id==event)
    }
    onFabricatorChange2(event,Technology)
    {
        let index=this.technologys.findIndex(x=>x.id==Technology.id);
        let TechnologyClone=Object.assign({},this.technologys[index],{fabricator:this.fabricatorList.find(x=>x.id==event)})
        this.technologys.splice(index,1);
        this.technologys.splice(index,0,TechnologyClone);
        this.TechnologyTemp=[];
        this.technologys=this.TechnologyTemp.concat(this.technologys);
    }

    onTechnologyAdd(NewTechnologyName,fabricatorSelected)
    {
        let NewTecnology={id:-1,name:NewTechnologyName,fabricator:this.fabricatorList.find(x=>x.id==fabricatorSelected)}
        this.technologysService.save(NewTecnology);
        this.TechnologyTemp=[];
        this.technologys=this.TechnologyTemp.concat(this.technologys);
    }
    onTechnologyUpdate(Technology)
    {
        this.technologysService.update(Technology);
    }

}
