/**
 * Created by eilamc on 12/20/2016.
 */
import {Inject, Injectable} from "@angular/core";
import {AppStore} from "./appStore";
import {actions} from "../reducers/debugdatas";
import {IDebugDataWebApi} from "../webApis/debugdatas.webapi";
import {DebugData} from "../reducers/AppState";

import {IImagesWebApi} from "../webApis/images.webapi";
import {image} from "../reducers/AppState";

@Injectable()
export class DebugDatasService {
    constructor(@Inject("debugdatasWebApi") private debugdatasWebApi: IDebugDataWebApi,
                private appStore: AppStore) {
    }

    loadAll() {
        this.debugdatasWebApi.getDebugDatas().then(debugdatas => {
            this.appStore.dispatch(actions.loadDebugDatas(debugdatas));
        });
    }

    select(id: number) {
       this.debugdatasWebApi.getDebugData(id).then(debugData => {
      //      this.appStore.dispatch(actions.selectDebugData(debugData));
        });
    }

}