/**
 * Created by eilamc on 12/21/2016.
 */
import * as _ from "lodash";
import Action = Redux.Action;
import {Http, Response} from "@angular/http";
import {StressTestState, StressTest} from "./AppState";
import {StressTestSortBy} from "./AppState";

export const stresstestActionTypes= {
    LOAD_STRESSTEST: "LOAD_STRESSTEST",
    SELECT_STRESSTEST: "SELECT_STRESSTEST",
};
export const initialState: StressTestState = {
    data: null,
    selected: null,
};


export const actions = {
    loadStressTests: function(Stresstests: StressTest[]) {
        return {
            type: stresstestActionTypes.LOAD_STRESSTEST,
            Stresstests: Stresstests,
        }
    },
    selectStressTest: function(stressTest: StressTest) {
        return {
            type: stresstestActionTypes.SELECT_STRESSTEST,
            stressTest: stressTest,
        }
    },

};
export function reducer(state: any = initialState, action: any): StressTestState {
    if(action.type == stresstestActionTypes.LOAD_STRESSTEST) {
        return Object.assign({}, state, {data: action.Stresstests});
    }
    else if(action.type == stresstestActionTypes.SELECT_STRESSTEST) {
        return Object.assign({}, state, {selected: action.stressTest});
    }
    return state;
}


function sortStressTestsData(state, action) {
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
        case StressTestSortBy.qtyIn:    sortOperator = (v: any) => v.qtyIn
            break
            case StressTestSortBy.stressDuration:    sortOperator = (v: any) => v.stressDuration
            break
            case StressTestSortBy.stressCycleIn:    sortOperator = (v: any) => v.stressCycleIn
            break
            case StressTestSortBy.stressDateIn:    sortOperator = (v: any) => v.stressDateIn
            break
            case StressTestSortBy.stressDateOut:    sortOperator = (v: any) => v.stressDateOut
            break
            case StressTestSortBy.stressReject:    sortOperator = (v: any) => v.stressReject
            break
            case StressTestSortBy.stressQtyOut:    sortOperator = (v: any) => v.stressQtyOut
            break
            case StressTestSortBy.testQtyIn:    sortOperator = (v: any) => v.testQtyIn
            break
            case StressTestSortBy.testDuration:    sortOperator = (v: any) => v.testDuration
            break
            case StressTestSortBy.testDateIn:    sortOperator = (v: any) => v.testDateIn
            break
            case StressTestSortBy.testDateOut:    sortOperator = (v: any) => v.testDateOut
            break
            case StressTestSortBy.testRejects:    sortOperator = (v: any) => v.testRejects
            break
            case StressTestSortBy.testQtyOut:    sortOperator = (v: any) => v.testQtyOut
            break
            case StressTestSortBy.clips:    sortOperator = (v: any) => v.clips
            break
            case StressTestSortBy.reballingNumber:    sortOperator = (v: any) => v.reballingNumber
            break
            case StressTestSortBy.faNumber:    sortOperator = (v: any) => v.faNumber
            break
            case StressTestSortBy.box:    sortOperator = (v: any) => v.box
            break
            case StressTestSortBy.zone:    sortOperator = (v: any) => v.zone
            break
            case StressTestSortBy.faDiscription:    sortOperator = (v: any) => v.faDiscription
            break
            case StressTestSortBy.updatedByPersonId:    sortOperator = (v: any) => v.updatedByPersonId
            break
            case StressTestSortBy.comments:    sortOperator = (v: any) => v.comments
            break
            case StressTestSortBy.updateDate:    sortOperator = (v: any) => v.updateDate
            break


        default:
            sortOperator = (v: any) => v.updateDate.toLocaleLowerCase()
            break
    }

    return _(_.values(options.dataSet))
        .orderBy([sortOperator], [options.isAscending ? 'asc' : 'desc'])
        .map((SS: any) => SS.id)
        .value()
}
