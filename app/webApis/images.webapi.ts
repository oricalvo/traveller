/**
 * Created by eilamc on 12/19/2016.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {image} from "../reducers/AppState";
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

export interface IImagesWebApi {
    getImages(): Promise<image[]>;
    getImage(path: string): Promise<image>;
    deleteImage(id:number):Promise<void>;
    uploadImage(file:File[],object:any);
}

@Injectable()
export class ImagesWebApi implements IImagesWebApi {

    constructor(private http: Http) {

    }

    getImages(): Promise<image[]> {
        return null;
    }

    getImage(path: string): Promise<image> {
        return null;
    }


    deleteImage(id: number): Promise<any> {
        if (!id) {
            throw new Error("Missing id parameter");
        }

        return this.http.delete("/api/image/delete/" + id).toPromise();
    }

    uploadImage(file: File[],object:any) {

            let formData: any = new FormData();
            let xhr = new XMLHttpRequest();
        for(var i = 0; i < file.length; i++) {
            formData.append("file", file[i], file[i].name);
        }
           // formData.append("file", file);
            formData.append("debugData",JSON.stringify(object));

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                       alert(xhr.response);
                    } else {
                        alert(xhr.response)
                    }
                }
            }
            xhr.open("POST", 'http://localhost:8080/api/Image/file/upload/', true);
            xhr.send(formData)
        }

}