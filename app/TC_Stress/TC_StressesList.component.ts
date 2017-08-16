/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {StressesService} from "../Services/Stress.service";
import {AppStore} from "../Services/appStore";
import {Stress, TC_Stress} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";
import {TC_StressesService} from "../Services/TC_Stress.service";

@Component({
    selector: 'Stresses-list',
    template: require("./TC_StressesList.component.html"),
    styles: [require("./TC_StressesList.component.css")],
})
export class TC_StressesListComponent {

    tc_stresses: TC_Stress[];
    NewStressName:string;
    searchtxt:string;
    TC_StressTemp:TC_Stress[];

    constructor(private tc_stressesService: TC_StressesService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.NewStressName="";
        this.searchtxt="";
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.tc_stresses = this.appStore.state.tc_stresses.data;
        });

        this.tc_stressesService.loadAll();
    }

   // onStressAdd(name)
   // {
    //    const Stress ={id:-1,name:name}
    //    this.stressesService.save(Stress)
   //     this.StressTemp=[];
  //      this.stresses=this.StressTemp.concat(this.stresses);

   // }
    onStressSave(TC_Stress)
    {
        this.tc_stressesService.update(TC_Stress) ;
        this.TC_StressTemp=[];
        this.tc_stresses=this.TC_StressTemp.concat(this.tc_stresses);
    }
}
