/**
 * Created by eilamc on 12/19/2016.
 */
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Package, Fabricator} from "../reducers/AppState";
import {PackagesService} from "../services/packages.service";
import {AppStore} from "../services/appStore";
import {ImagesService} from "../services/images.service";

@Component({
    selector: 'edit-Package',
    template: require("./editPackage.component.html"),
    styles: [require("./editPackage.component.css")],
})
export class EditPackageComponent {
    id: number;
    package: Package;
    navLinks: string[];
    name: string;
    fabricator: Fabricator;


    constructor(private packagesService: PackagesService,
                route: ActivatedRoute,
                appStore: AppStore) {
        this.id = route.snapshot.params["id"] * 1;

        appStore.subscribe(() => {
            this.package = appStore.state.packages.selected;
            this.name = this.package.name

        });

        this.packagesService.select(this.id);
    }



}
