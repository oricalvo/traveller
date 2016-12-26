/**
 * Created by eilamc on 12/19/2016.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Image} from "../reducers/AppState";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

export interface IImagesWebApi {
    getImages(): Promise<Image[]>;
    getImage(path: string): Promise<Image>;
    deleteImage(id:number):Promise<void>;
}

@Injectable()
export class ImagesWebApi implements IImagesWebApi {

    constructor(private http: Http) {

    }

    getImages(): Promise<Image[]> {
        return null;
    }

    getImage(path: string): Promise<Image> {
        return null;
    }


    deleteImage(id: number): Promise<any> {
        if (!id) {
            throw new Error("Missing id parameter");
        }

        return this.http.delete("/api/image/delete/" + id).toPromise();
    }
}