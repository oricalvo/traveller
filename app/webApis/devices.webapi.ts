import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Device} from "../reducers/AppState";

export interface IDevicesWebApi {
    getDevices(): Promise<Device[]>;
    getDevice(deviceName: string): Promise<Device>;
}
