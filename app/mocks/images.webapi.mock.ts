/**
 * Created by eilamc on 12/19/2016.
 */
import {IImagesWebApi} from "../webApis/images.webapi";
import {Image} from "../reducers/AppState";

const images: Image[] = require("./images.json");

export class ImagesWebApiMock implements IImagesWebApi {
    getImages(): Promise<Image[]> {
        return Promise.resolve().then(() => {
            console.log(images);
            return images;
        });
    }

    getImage(path: string): Promise<Image> {
        return Promise.resolve().then(() => {
            const image = images.find(d => d.path == path);
            if (!image) {
                throw new Error("Invalid image name");
            }

            return image;
        });
    }

    deleteImage(id:number):Promise<void> {
        return Promise.resolve();
    }
}