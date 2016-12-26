/**
 * Created by eilamc on 12/19/2016.
 */
import { Component } from '@angular/core';
import {Params, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {DebugData, Image} from "../reducers/AppState";
import {DebugDatasService} from "../services/DebugDatas.service";
import {AppStore} from "../services/appStore";

@Component({
    selector: 'edit-image',
    template: require("./editDebugData.component.html"),
    styles: [require("./editDebugData.component.css")],
})
export class EditDebugDataComponent {
    id: number;
    debugData: DebugData;
    navLinks: string[];
    selectedFile: File;
    desc: string;
    images: Image[];

    constructor(private debugDatasService: DebugDatasService,
                route: ActivatedRoute,
                appStore: AppStore){
        this.id =  route.snapshot.params["id"]*1;

        appStore.subscribe(()=> {
            this.debugData = appStore.state.debugData.selected;
            this.desc = this.debugData.desc;
            this.images = this.debugData.images || [];
        });

        this.debugDatasService.select(this.id);
    }

    onFileSelected(inputFile) {
        this.selectedFile = inputFile.files[0];
    }

    upload() {
        if(!this.selectedFile) {
            return;
        }

        this.images.push({id: -1, path: this.selectedFile.name});
    }

    deleteImage(image, index) {
        this.images.splice(index, 1);
    }
}
