/**
 * Created by eilamc on 12/19/2016.
 */
import {Inject, Injectable} from "@angular/core";
import {AppStore} from "./appStore";
import {actions} from "../reducers/images";
import {IImagesWebApi} from "../webApis/images.webapi";
import {Image} from "../reducers/AppState";

@Injectable()
export class ImagesService {
    constructor(@Inject("imagesWebApi") private imagesWebApi: IImagesWebApi,
                private appStore: AppStore) {
    }

    loadAll() {
        this.imagesWebApi.getImages().then(images => {
            this.appStore.dispatch(actions.loadImages(images));
        });
    }

    deleteImage(id: number) {
        this.imagesWebApi.deleteImage(id).then(() => {
            this.appStore.dispatch(actions.deleteImage(id));
        });
    }
}