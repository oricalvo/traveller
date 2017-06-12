/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {ImagesService} from "../services/images.service";
import {AppStore} from "../services/appStore";
import {image} from "../reducers/AppState";
import {GridColumn} from "../grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'images-list',
    template: require("./imagesList.component.html"),
    styles: [require("./imagesList.component.css")],
})
export class ImagesListComponent {
    columns: GridColumn[];
    images: image[];

    constructor(private imagesService: ImagesService,
                private appStore: AppStore,
                private route: ActivatedRoute,
                private router: Router){
        this.columns = [
            {title: "ID", field: "id"},
            {title: "Path", field: "path"},
        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){
        this.appStore.subscribe(()=>{
            this.images = this.appStore.state.images.data;
        });

        this.imagesService.loadAll();
    }

    onEditingRow(row){
        console.log("Edit", row);

        this.router.navigate(["/images/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
}
