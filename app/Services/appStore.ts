import {createStore, Store, Unsubscribe, Action} from "redux";
import {AppState} from "../Reducer/AppState";
import {DeviceSortBy} from "../Reducer/AppState";
import {combineReducers} from "redux";
import {reducer as userReduce} from "../Reducer/User";
import {reducer as devicesReduce, initialState as devicesInitialState} from "../Reducer/Devices";
import {reducer as VendorsReduce, initialState as VendorInitialState} from "../Reducer/Vendor";
import {reducer as VendorsjobsReduce, initialState as VendorjobInitialState} from "../Reducer/VendorJob";
import {reducer as FabricatorsReduce, initialState as FabricatorInitialState} from "../Reducer/Fabricator";
import {reducer as TechnologysReduce, initialState as TechnologyInitialState} from "../Reducer/Technology";
import {reducer as PackgessReduce, initialState as PackageInitialState} from "../Reducer/Package";
import {reducer as BinssReduce, initialState as BinInitialState} from "../Reducer/Bins";
import {reducer as LocationsReduce, initialState as LocationInitialState} from "../Reducer/Location";
import {reducer as TestprogramsReduce, initialState as TestprogramInitialState} from "../Reducer/TestProgram";
import {reducer as lotsReduce, initialState as LotInitialState} from "../Reducer/Lot";
import {reducer as TravelerobjectsReduce, initialState as TravelerobjectInitialState} from "../Reducer/TravelerObject";
import {reducer as NickNamesReduce, initialState as NickNameInitialState} from "../Reducer/NickName";
import {reducer as TemporaryIDsReduce, initialState as TemporaryIDsInitialState} from "../Reducer/TemporaryIDs";
import {reducer as TestProgramTravelersReduce, initialState as TestProgramTravelerInitialState} from "../Reducer/TestProgramTraveler";
import {reducer as TravelerConfigReduce, initialState as TravelerConfigState} from "../Reducer/TravelerConfig";
import {reducer as StressReduce, initialState as StressInitialState} from "../Reducer/Stress";
import {reducer as TC_StressReduce, initialState as TC_StressInitialState} from "../Reducer/TC_Stress";



export class AppStore {
    store: Store<AppState>;

    constructor() {
        const initialState: AppState =   {
            user: {
                userName: null,
                role: null,
                logging: false,
            },
            devices: devicesInitialState,
            vendors:VendorInitialState,
            vendorjobs:VendorjobInitialState,
            fabricators:FabricatorInitialState,
            technologys:TechnologyInitialState,
            packages:PackageInitialState,
            bins:BinInitialState,
            testprograms:TestprogramInitialState,
            lots:LotInitialState,
            travelerobjects:TravelerobjectInitialState,
            nicknames:NickNameInitialState,
            testprogramtravelers:TestProgramTravelerInitialState,
            locations:LocationInitialState,
            temporaryIDs:TemporaryIDsInitialState,
            TravelerConfig:TravelerConfigState,
            stresses:StressInitialState,
            tc_stresses:TC_StressInitialState,


        };

        const root = combineReducers<AppState>({
            user: userReduce,
            devices:devicesReduce,
            vendors:VendorsReduce,
            vendorjobs:VendorsjobsReduce,
            fabricators:FabricatorsReduce,
            technologys:TechnologysReduce,
            packages:PackgessReduce,
            bins:BinssReduce,
            testprograms:TestprogramsReduce,
            lots:lotsReduce,
            travelerobjects:TravelerobjectsReduce,
            nicknames:NickNamesReduce,
            testprogramtravelers:TestProgramTravelersReduce,
            locations:LocationsReduce,
            temporaryIDs:TemporaryIDsReduce,
            TravelerConfig:TravelerConfigReduce,
            stresses:StressReduce,
            tc_stresses:TC_StressReduce
        });

        this.store = createStore(root, initialState);
    }

    subscribe(listener: () => void): Unsubscribe {
        return this.store.subscribe(listener);
    }

    dispatch<A extends Action>(action: A): A {
        return this.store.dispatch(action);
    }

    get state(): AppState {
        return this.store.getState();
    }
}
