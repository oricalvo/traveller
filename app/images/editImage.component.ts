/**
 * Created by eilamc on 12/19/2016.
 */
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
    selector: 'edit-image',
    template: require("./editImage.component.html"),
    styles: [require("./editImage.component.css")],
})
export class EditImageComponent {
    imageId: number;

    constructor(route: ActivatedRoute){
        this.imageId =  route.snapshot.params["id"]*1;

        console.log(this.imageId);
    }
}
