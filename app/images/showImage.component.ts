/**
 * Created by nirz on 12/26/2016.
 */
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
    selector: 'show-image',
    template: require("./showImage.component.html"),
    styles: [require("./showImage.component.css")],
})
export class ShowImageComponent {
    imageId: number;

    constructor(route: ActivatedRoute){
        this.imageId =  route.snapshot.params["id"]*1;

        console.log(this.imageId);
    }
}