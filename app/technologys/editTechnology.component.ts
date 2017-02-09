/**
 * Created by eilamc on 12/19/2016.
 */
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Technology, Fabricator} from "../reducers/AppState";
import {TechnologysService} from "../services/technologys.service";
import {AppStore} from "../services/appStore";
import {ImagesService} from "../services/images.service";

@Component({
    selector: 'edit-Technology',
    template: require("./editTechnology.component.html"),
    styles: [require("./editTechnology.component.css")],
})
export class EditTechnologyComponent {
    id: number;
    technology: Technology;
    navLinks: string[];
    name: string;
    fabricator: Fabricator;


    constructor(private technologysService: TechnologysService,
                route: ActivatedRoute,
                appStore: AppStore) {
        this.id = route.snapshot.params["id"] * 1;

        appStore.subscribe(() => {
            this.technology = appStore.state.technologys.selected;
            this.name = this.technology.name
            this.fabricator = this.technology.fabricator;
        });

        this.technologysService.select(this.id);
    }



}
