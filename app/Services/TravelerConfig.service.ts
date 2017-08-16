/**
 * Created by eilamc on 2/7/2017.
 */
import {Inject, Injectable} from "@angular/core";
import {AppStore} from "./appStore";
import {actions} from "../Reducer/TravelerConfig";
import {ITravelerConfigWebApi} from "../WebApis/travelerconfig.webapi";
import {TravelerConfig} from "../Reducer/AppState";

@Injectable()
export class travelerConfigService {
    constructor(@Inject("TravelerConfigWebApi") private TravelerConfigWebApi: ITravelerConfigWebApi,
                private appStore: AppStore) {
    }

    getTravelerConfig() {
        this.TravelerConfigWebApi.getTravelerConfig().then(TravelerConfig => {
            this.appStore.dispatch(actions.getTravelerConfig(TravelerConfig));
        });
    }



}