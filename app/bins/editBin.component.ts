/**
 * Created by eilamc on 12/19/2016.
 */
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Bin, Fabricator} from "../reducers/AppState";
import {BinsService} from "../services/bins.service";
import {AppStore} from "../services/appStore";
import {ImagesService} from "../services/images.service";

@Component({
    selector: 'edit-Bin',
    template: require("./editBin.component.html"),
    styles: [require("./editBin.component.css")],
})
export class EditBinComponent {
    id: number;
    bin: Bin;
    navLinks: string[];
    name: string;
    fabricator: Fabricator;


    constructor(private binsService: BinsService,
                route: ActivatedRoute,
                appStore: AppStore) {
        this.id = route.snapshot.params["id"] * 1;

        appStore.subscribe(() => {
            this.bin = appStore.state.bins.selected;
            this.name = this.bin.name

        });

        this.binsService.select(this.id);
    }



}
