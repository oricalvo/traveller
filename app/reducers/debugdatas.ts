/**
 * Created by eilamc on 12/20/2016.
 */
import * as _ from "lodash";
import Action = Redux.Action;
import {Http, Response} from "@angular/http";
import {DebugDataState, DebugData} from "./AppState";
import {DebugDataSortBy} from "./AppState";

export const debugdataActionTypes= {
    LOAD_DEBUGDATAS: "LOAD_DEBUGDATAS",
    SELECT_DEBUGDATA: "SELECT_DEBUGDATA",
};

export const initialState: DebugDataState = {
    data: null,
    selected: null,
};

export const actions = {
    loadDebugDatas: function(debugdatas: DebugData[]) {
        return {
            type: debugdataActionTypes.LOAD_DEBUGDATAS,
            debugdatas: debugdatas,
        }
    },

    selectDebugData: function(debugData: DebugData) {
        return {
            type: debugdataActionTypes.SELECT_DEBUGDATA,
            debugData: debugData,
        }
    },
};

export function reducer(state: DebugDataState = initialState, action: any): DebugDataState {
    if(action.type == debugdataActionTypes.LOAD_DEBUGDATAS) {
        return Object.assign({}, state, {data: action.debugData});
    }
    else if(action.type == debugdataActionTypes.SELECT_DEBUGDATA) {
        return Object.assign({}, state, {selected: action.debugData});
    }

    return state;
}
function loadDebugDatasData(state, action) {

    if (action.error) {
        return Object.assign({}, state, {
            isLoading: false,
            errorMessage: action.payload.message
        })
    }

    let dataSet = _.fromPairs(action.payload.map(Dd => [Dd.id, Dd]))
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
function sortDebugDatasData(state, action) {
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
        case DebugDataSortBy.desc:
            sortOperator = (v: any) => v.desc
            break

        default:
            sortOperator = (v: any) => v.desc.toLocaleLowerCase()
            break
    }

    return _(_.values(options.dataSet))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map((dd: any) => dd.id)
        .value()
}
