import Action = Redux.Action;
import {TC_StressesState, TC_Stress} from "./AppState";


export const tc_stressActionTypes= {
    LOAD_TC_STRESSES: "LOAD_TC_STRESSES",
    SELECT_TC_STRESS:"SELECT_TC_STRESS",
    DELETE_TC_STRESS: "DELETE_TC_STRESS",
};

export const initialState = {
    data: null,
    selected: null,
};

export const actions = {
    loadTC_Stresses: function(tc_stresses: TC_Stress[]) {
        return {
            type: tc_stressActionTypes.LOAD_TC_STRESSES,
            tc_stresses: tc_stresses,
        }
    },
    selectTC_Stress: function(TC_Stress: TC_Stress) {
        return {
            type: tc_stressActionTypes.SELECT_TC_STRESS,
            TC_Stress: TC_Stress,
        }
    },

};

export function reducer(state: TC_StressesState = initialState, action: any): TC_StressesState {
    if(action.type == tc_stressActionTypes.LOAD_TC_STRESSES) {
        return Object.assign({}, state, {data: action.tc_stresses});
    }
    else if(action.type == tc_stressActionTypes.SELECT_TC_STRESS) {
        return Object.assign({}, state, {selected: action.TC_Stress});
    }


    return state;
}


