import {IDevicesWebApi} from "../webApis/devices.webapi";
import {Device} from "../reducers/AppState";

const devices: Device[] = require("./devices.json");

export class DevicesWebApiMock implements IDevicesWebApi {
    getDevices(): Promise<Device[]> {
        return Promise.resolve().then(() => {
            console.log(devices);
            return devices;
        });
    }

    getDevice(deviceName: string): Promise<Device> {
        return Promise.resolve().then(() => {
            const device = devices.find(d => d.name == deviceName);
            if (!device) {
                throw new Error("Invalid device name");
            }

            return device;
        });
    }
}