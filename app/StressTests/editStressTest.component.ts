/**
 * Created by eilamc on 12/19/2016.
 */
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
    selector: 'edit-StressTests',
    template: require("./editStressTest.component.html"),
    styles: [require("./editStressTest.component.css")],
})
export class EditStressTestComponent {
    stresstestId: number;

    constructor(route: ActivatedRoute){
        this.stresstestId =  route.snapshot.params["id"]*1;

        console.log(this.stresstestId);
    }
}
