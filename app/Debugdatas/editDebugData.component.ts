/**
 * Created by eilamc on 12/19/2016.
 */
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
    selector: 'edit-image',
    template: require("./editDebugData.component.html"),
    styles: [require("./editDebugData.component.css")],
})
export class EditDebugDataComponent {
    debugdataId: number;

    constructor(route: ActivatedRoute){
        this.debugdataId =  route.snapshot.params["id"]*1;

        console.log(this.debugdataId);
    }
}
