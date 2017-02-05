/**
 * Created by nirz on 11/13/2016.
 */
"use strict";
//const _ = require("lodash");
var _ = require("lodash");
var AppState_1 = require("./AppState");
exports.deviceActionTypes = {
    LOAD_DEVICES: "LOAD_DEVICES",
    LOADING_DEVICE_DATA: "LOADING_DEVICE_DATA",
    LOAD_DEVICE_DATA: "LOAD_DEVICE_DATA",
    SORT_DEVICES: "SORT_DEVICES",
    CLEAR_CURRENT_DEVICE: "CLEAR_CURRENT_DEVICE",
    SELECT_CURRENT_DEVICE: "SELECT_CURRENT_DEVICE",
    CHANGE_DEVICE_NAME: "CHANGE_DEVICE_NAME",
    UPDATE_DEVICE_PROPS: "UPDATE_DEVICE_PROPS"
};
exports.initialState = {
    data: null,
};
exports.actions = {
    loadDevices: function (devices) {
        return {
            type: exports.deviceActionTypes.LOAD_DEVICES,
            devices: devices,
        };
    },
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    if (action.type == exports.deviceActionTypes.LOAD_DEVICES) {
        return Object.assign({}, state, { data: action.devices });
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
exports.reducer = reducer;
function loadDeviceData(state, action) {
    if (action.error) {
        return Object.assign({}, state, {
            isLoading: false,
            errorMessage: action.payload.message
        });
    }
    var dataSet = _.fromPairs(action.payload.map(function (dev) { return [dev.id, dev]; }));
    return Object.assign({}, state, {
        isLoading: false,
        dataSet: dataSet,
        displayedItems: getDisplayedItems({
            dataSet: dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending
        })
    });
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
    });
}
function getDisplayedItems(options) {
    var sortOperator;
    switch (options.sortBy) {
        case AppState_1.DeviceSortBy.name:
            sortOperator = function (v) { return v.name; };
            break;
        case AppState_1.DeviceSortBy.serial:
            sortOperator = function (v) { return v.serial; };
            break;
        default:
            sortOperator = function (v) { return v.name.toLocaleLowerCase(); };
            break;
    }
    return _(_.values(options.dataSet))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map(function (dev) { return dev.id; })
        .value();
}
function selectCurrenteData(state, action) {
    var deviceId = action.payload.deviceId;
    return Object.assign({}, state, {
        currentDeviceId: state.dataSet[deviceId] ? deviceId : null
    });
}
function changeDeviceName(state, action) {
    var deviceId = action.payload.deviceId;
    var name = action.payload.name;
    if (deviceId && name && state.dataSet[deviceId]) {
        var dataSet = Object.assign({}, state.dataSet, (_a = {},
            _a[deviceId] = Object.assign({}, state.dataSet[deviceId], { name: name }),
            _a));
        var displayedItems = getDisplayedItems({
            dataSet: dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending
        });
        state = Object.assign({}, state, { dataSet: dataSet, displayedItems: displayedItems });
    }
    return state;
    var _a;
}
function changeDeviceProps(state, action) {
    var deviceId = action.payload.deviceId;
    var props = action.payload.props || [];
    if (deviceId && state.dataSet[deviceId]) {
        var dataSet = Object.assign({}, state.dataSet, (_a = {},
            _a[deviceId] = Object.assign({}, state.dataSet[deviceId], { props: props }),
            _a));
        var displayedItems = getDisplayedItems({
            dataSet: dataSet,
            sortBy: state.sortBy,
            isAscending: state.isAscending
        });
        state = Object.assign({}, state, { dataSet: dataSet, displayedItems: displayedItems });
    }
    return state;
    var _a;
}
//# sourceMappingURL=devices.js.map