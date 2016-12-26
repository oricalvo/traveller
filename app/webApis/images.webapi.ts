/**
 * Created by eilamc on 12/19/2016.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Image} from "../reducers/AppState";
export interface IImagesWebApi {
    getImages(): Promise<Image[]>;
    getImage(path: string): Promise<Image>;
}