/**
 * Created by nirz on 11/13/2016.
 */

//const _ = require("lodash");
import * as _ from "lodash";
import Action = Redux.Action;
import {Http, Response} from "@angular/http";
import {DevicesState, Device} from "./AppState";
import {DeviceSortBy} from "./AppState";

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
    // sortBy: DeviceSortBy.name,
    // isAscending: true,
    // isLoading: true,
    // displayedItems: null,
    // currentDeviceId: null
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

    // loadingDevices: function loadingDevices() {
    //     return {
    //         type: deviceActionTypes.LOADING_DEVICE_DATA
    //     }
    // },
    //
    // loadDeviceData: function loadDeviceData(DeviceData) {
    //     return {
    //         type: deviceActionTypes.LOAD_DEVICE_DATA,
    //         payload: DeviceData
    //     }
    // },
    //
    // loadDeviceDataError: function loadDeviceDataError(errorMessage) {
    //     return {
    //         type: deviceActionTypes.LOAD_DEVICE_DATA,
    //         payload: {
    //             message: errorMessage
    //         },
    //         error: true
    //     }
    // },
    //
    // sortDevices: function sortDevices(sortBy: DeviceSortBy, isAscending: boolean = true) {
    //     return {
    //         type: deviceActionTypes.SORT_DEVICES,
    //         payload: { sortBy, isAscending }
    //     }
    // },
    //
    // DeviceDataRequest: function DeviceDataRequest(http: Http) {
    //     return null;
    //     // return dispatch => {
    //     //     dispatch(actions.loadingDevices())
    //     //     http.get('/api/images')
    //     //         .map(res => res.json())
    //     //         .map(DeviceData => DeviceData.map((dvc: any) => Object.assign(dvc, {
    //     //             dateTaken: new Date(dvc.dateTaken)
    //     //         })))
    //     //         .subscribe(
    //     //             (DeviceData: any) => dispatch(loadDeviceData(DeviceData)),
    //     //             (err: Response) => dispatch(loadDeviceDataError(err.json().error || 'Server error'))
    //     //         )
    //     // }
    // },
    //
    // clearCurrentDevice: function clearCurrentDevice() {
    //     return {
    //         type:deviceActionTypes.CLEAR_CURRENT_DEVICE
    //     }
    // },
    //
    // selectCurrentDevice: function selectCurrentDevice(deviceId: string) {
    //     return {
    //         type: deviceActionTypes.SELECT_CURRENT_DEVICE,
    //         payload: { deviceId }
    //     }
    // },
    //
    // changeDeviceName: function changeDeviceName(deviceId: string, name: string) {
    //     return {
    //         type: deviceActionTypes.CHANGE_DEVICE_NAME,
    //         payload: { deviceId, name }
    //     }
    // },
    //
    // updateDeviceProps: function updateDeviceProps(deviceId: string, props: string[]) {
    //     return {
    //         type: deviceActionTypes.UPDATE_DEVICE_PROPS,
    //         payload: { deviceId, props }
    //     }
    // },
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
    // else if(action.type == deviceActionTypes.LOADING_DEVICE_DATA) {
    //     return Object.assign({}, deviceDefaultState);
    // }
    // else if(action.type == deviceActionTypes.LOAD_DEVICE_DATA) {
    //     return loadDeviceData(state, action);
    // }
    // else if(action.type == deviceActionTypes.SORT_DEVICES) {
    //     return sortDeviceData(state, action);
    // }
    // else if(action.type == deviceActionTypes.CLEAR_CURRENT_DEVICE) {
    //     return Object.assign({}, state, { currentImageId: null });
    // }
    // else if(action.type == deviceActionTypes.SELECT_CURRENT_DEVICE) {
    //     return selectCurrenteData(state, action);
    // }
    // else if(action.type == deviceActionTypes.CHANGE_DEVICE_NAME) {
    //     return changeDeviceName(state, action);
    // }
    // else if(action.type == deviceActionTypes.UPDATE_DEVICE_PROPS) {
    //     return changeDeviceProps(state, action);
    // }

    return state;
}

function loadDeviceData(state, action) {

    if (action.error) {
        return Object.assign({}, state, {
            isLoading: false,
            errorMessage: action.payload.message
        })
    }

    let dataSet = _.fromPairs(action.payload.map(dev => [dev.id, dev]))
    return Object.assign({}, state, {
        isLoading: false,
        dataSet,
        displayedItems: getDisplayedItems({
            dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending

        })
    })
}

function sortDeviceData(state, action) {
    return Object.assign({}, state, {
        sortBy: action.payload.sortBy,
        isAscending: action.payload.isAscending,
        displayedItems: getDisplayedItems({
            dataSet: state.dataSet,
            sortBy: action.payload.sortBy,
            isAscending: action.payload.isAscending
        })
    })
}



function getDisplayedItems(options) {

    let sortOperator: any;
    switch (options.sortBy) {
        case DeviceSortBy.name:
            sortOperator = (v: any) => v.name
            break
        case DeviceSortBy.serial:
            sortOperator = (v: any) => v.serial
            break
        default:
            sortOperator = (v: any) => v.name.toLocaleLowerCase()
            break
    }

    return _(_.values(options.dataSet))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map((dev: any) => dev.id)
        .value()
}

function selectCurrenteData(state, action) {
    let deviceId = action.payload.deviceId;
    return Object.assign({}, state, {
        currentDeviceId: state.dataSet[deviceId] ? deviceId : null
    })
}

function changeDeviceName(state, action) {
    let deviceId = action.payload.deviceId;
    let name = action.payload.name;
    if (deviceId && name && state.dataSet[deviceId]) {
        let dataSet = Object.assign({}, state.dataSet, {
            [deviceId]: Object.assign({}, state.dataSet[deviceId], { name })
        })
        let displayedItems = getDisplayedItems({
            dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending
        })
        state = Object.assign({}, state, { dataSet, displayedItems })
    }
    return state;
}

function changeDeviceProps(state, action) {
    let deviceId = action.payload.deviceId;
    let props = action.payload.props || [];
    if (deviceId && state.dataSet[deviceId]) {
        let dataSet = Object.assign({}, state.dataSet, {
            [deviceId]: Object.assign({}, state.dataSet[deviceId], { props })
        })
        let displayedItems = getDisplayedItems({
            dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending
        })
        state = Object.assign({}, state, { dataSet, displayedItems })
    }
    return state;
}