import Action = Redux.Action;
import {DevicesState, Device} from "./AppState";

export const deviceActionTypes= {
    LOAD_DEVICES: "LOAD_DEVICES",
    SELECT_DEVICE:"SELECT_DEVICE",
    LOADING_DEVICE_DATA:"LOADING_DEVICE_DATA",
    LOAD_DEVICE_DATA:"LOAD_DEVICE_DATA",
    SORT_DEVICES: "SORT_DEVICES",
    CLEAR_CURRENT_DEVICE:"CLEAR_CURRENT_DEVICE",
    SELECT_CURRENT_DEVICE:"SELECT_CURRENT_DEVICE",
    CHANGE_DEVICE_NAME:"CHANGE_DEVICE_NAME",
    UPDATE_DEVICE_PROPS:"UPDATE_DEVICE_PROPS",
    SELECT_DEVICE_THAT_HAS_NO_MANTIS_DEVICE:"SELECT_DEVICE_THAT_HAS_NO_MANTIS_DEVICE"
};


export const initialState = {
    data: null,
    selected: null,

};

export const actions = {
    loadDevices: function(devices: Device[]) {
        return {
            type: deviceActionTypes.LOAD_DEVICES,
            devices: devices,
        }
    },
    selectDevice: function(device: Device) {
            return {
                type: deviceActionTypes.SELECT_DEVICE,
                device: device,
            }
    }
    ,
    selectDeviceThatHasNoMantisDevice: function(device: Device) {
        return {
            type: deviceActionTypes.SELECT_DEVICE_THAT_HAS_NO_MANTIS_DEVICE,
            device: device,
        }
    }


};

export function reducer(state: any = initialState, action: any): DevicesState {
    if(action.type == deviceActionTypes.LOAD_DEVICES) {
        return Object.assign({}, state, {data: action.devices});
    }
    else if(action.type == deviceActionTypes.SELECT_DEVICE) {
        return Object.assign({}, state, {selected: action.device});
    }
    else if(action.type == deviceActionTypes.SELECT_DEVICE_THAT_HAS_NO_MANTIS_DEVICE) {
        const mantisDevice={id:action.device.id,name:action.device.name}
        const deviceClone=Object.assign({}, action.device, {mantisDevice:mantisDevice});
        return Object.assign({}, state, {selected:deviceClone});
    }


    return state;
}

