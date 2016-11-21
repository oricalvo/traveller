import {Inject, Injectable} from "@angular/core";
import {AppStore} from "./appStore";
import {actions} from "../reducers/devices";
import {IDevicesWebApi} from "../webApis/devices.webapi";
import {Device} from "../reducers/AppState";

@Injectable()
export class DevicesService {
    constructor(@Inject("devicesWebApi") private devicesWebApi: IDevicesWebApi,
                private appStore: AppStore) {
    }

    loadAll() {
        this.devicesWebApi.getDevices().then(devices => {
            this.appStore.dispatch(actions.loadDevices(devices));
        });
    }
}
