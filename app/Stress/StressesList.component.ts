/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {StressesService} from "../Services/Stress.service";
import {AppStore} from "../Services/appStore";
import {Stress} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'Stresses-list',
    template: require("./StressesList.component.html"),
    styles: [require("./StressesList.component.css")],
})
export class StressesListComponent {

    stresses: Stress[];
    NewStressName:string;
    searchtxt:string;
    StressTemp:Stress[];

    constructor(private stressesService: StressesService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.NewStressName="";
        this.searchtxt="";
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.stresses = this.appStore.state.stresses.data;
        });

        this.stressesService.loadAll();
    }

    onStressAdd(name)
    {
        const Stress ={id:-1,name:name}
        this.stressesService.save(Stress)
        this.StressTemp=[];
        this.stresses=this.StressTemp.concat(this.stresses);

    }
    onStressSave(Stress)
    {
        this.stressesService.update(Stress) ;
        this.StressTemp=[];
        this.stresses=this.StressTemp.concat(this.stresses);
    }
}
