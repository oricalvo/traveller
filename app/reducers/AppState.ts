export interface UserState {
    readonly userName: string;
    readonly role: string;
    readonly logging: boolean;
}

export interface Fabricator
{
    readonly id: number;
    readonly name: string;
}
export interface FabricatrsState{
    readonly data: Fabricator[]
    readonly selected:Fabricator
}

export enum FabricatorSortBy {
    name
}
export interface TestProgram
{
    readonly id: number;
    readonly testProgramName: string;
    readonly temperature: string;
    readonly mantisTestProgram :TestProgram;
}
export interface TestProgramsState{
    readonly data: TestProgram[]
}

export enum TestProgramSortBy {
    name
}
export interface Technology
{
    readonly id: number;
    readonly name: string;
    readonly fabricator:Fabricator;
}
export interface TechnologysState{
    readonly data: Technology[]
    readonly selected:Technology;
}

export enum TechnologySortBy {
    name
}
export interface Package
{
    readonly id: number;
    readonly name: string;

}
export interface PackagesState{
    readonly data: Package[]
    readonly selected:Package;
}

export enum PackageSortBy {
    name
}

export interface Bin
{
    readonly id: number;
    readonly name: string;

}
export interface BinsState{
    readonly data: Bin[]
    readonly selected:Bin;
}

export enum BinSortBy {
    name
}

export enum DeviceSortBy {
    name,
    serial,
    date
}

export interface Device {
    readonly id: number;
    readonly name: string;
    readonly serial: string;
    readonly lots: Lot[];
    readonly technology:Technology;
    readonly devicePackage:Package;
    readonly deviceNickName:NickName;
    readonly mantisDevice :Device;

}

export interface DevicesState {
    readonly data: Device[],
    readonly selected:Device;
    // readonly sortBy: DeviceSortBy,
    // readonly isAscending: boolean,
    // readonly isLoading: boolean,
    // readonly displayedItems: Object[],
    // readonly currentDeviceId: number
}

export interface NickName{
    readonly id: number;
    readonly name: string;
    readonly devices:Device[];
    readonly testPrograms:TestProgram[];
}

export interface NickNamesState{
    readonly data: NickName[];
    readonly selected:NickName;

}
export interface Vendor{
    readonly id: number;
    readonly name: string;
}

export interface VendorsState{
    readonly data: Vendor[]
}

export enum VendorSortBy {
    name
}
export interface vendorJob{
    readonly id: number;
    readonly jobNum:string;
    readonly invoiceNum?:string;
    readonly approvalDate:string;
    readonly comments:string;
    readonly dtUpdated:string;
    vendor ?:Vendor;

}

export interface VendorsJobState{
    readonly data: vendorJob[]
}

export enum vendorJobSortBy {
    name
}


export interface image{
    readonly id: number;
    readonly path: string;
}

export interface ImagesState{
    readonly data: image[];
}

export enum ImageSortBy {
    path
}

export interface StressData{
    readonly id: number;
    readonly name: string;
    readonly oven_cycle_count:number;
    readonly cycle_average_duration:number;
    readonly dt_last_updated:number;


}

export interface StressDatasState{
    readonly data: StressData[];
}

export interface Lot{
    readonly id: number;
    readonly name: string;
    readonly lotDateCode : string;
    readonly isProduction: string;
    readonly mantisLot:Lot;
}

export interface LotsState{
    readonly data: Lot[];
    readonly selected:Lot;
}

export enum LotSortBy {
    name
}
export interface DebugData{
    readonly id: number;
    readonly desc: string;
    readonly images: image[];
}

export interface DebugDataState{
    readonly data: DebugData[];
    readonly selected: DebugData;
}

export enum DebugDataSortBy {
    desc
}

export interface StressTest{
    readonly id:  number;
    readonly qtyIn:  number;
    readonly stressDuration:  number;
    readonly stressCycleIn:  number;
    readonly stressDateIn:  string; //Date
    readonly stressDateOut:  string; //Date
    readonly stressReject:  number;
    readonly stressQtyOut:  number;
    readonly testQtyIn:  number;
    readonly testDuration:  number;
    readonly testDateIn:  string; //Date
    readonly testDateOut:  string; //Date
    readonly testRejects:  number;
    readonly testQtyOut:  number;
    readonly clips:  string;
    readonly reballingNumber:  number;
    readonly faNumber:  string;
    readonly box:  string;
    readonly zone:  string;
    readonly faDiscription:  string;
    readonly updatedByPersonId:  number;
    readonly comments:  string;
    readonly updateDate:  string; //Date
    readonly debugData: DebugData[];
    readonly taskData: TaskData[];
    readonly vendorJob:vendorJob;
    readonly stressLocation:Location;

}

export interface StressTestState{
    readonly data: StressTest[]
    readonly selected: StressTest;
}

export enum StressTestSortBy {
    id,qtyIn,stressDuration,stressCycleIn,stressDateIn,stressDateOut,stressReject,stressQtyOut,testQtyIn,testDuration,testDateIn,testDateOut,testRejects,testQtyOut,clips,reballingNumber,faNumber,box,zone,faDiscription,updatedByPersonId,comments,updateDate

}

export interface TaskData{
    readonly taskid: number;
    readonly testProgramId:  TestProgram;

}

export interface TaskDatasState{
    readonly data: TaskData[];
}

export interface LocationType{
    readonly id: number;
    readonly name:  string;

}

export interface  LocationTypesState{
    readonly data: LocationType[];
}
export interface Location{
    readonly id: number;
    readonly name:  string;
    readonly isExternal:string;
    readonly locationType:LocationType;

}

export interface  LocationState{
    readonly data: Location[];
    readonly stressLocations :Location[];
    readonly assemblyLocations :Location[]
    readonly testLocations :Location[];

    readonly selectedstressLocation:Location;
    readonly selectedassemblyLocation:Location;
    readonly selectedTestLocation:Location;
}

export interface TravelerObject{
    readonly id: number;
    readonly name:string;
    readonly totalDuration:number;
    readonly jedecLevel:number;
    readonly condition:string;
    readonly comments:string;
    readonly createdDate:string;///Date
    readonly updatedDate:string;///Date
    readonly updatedbyUser:number;
    readonly assemblyLocation:Location;
    readonly travdevice:Device;
    readonly travlot:Lot;
    readonly stressData:StressData;
    readonly stressTests:StressTest[];
    readonly travelerTestPrograms:TravelerTestProgram[];
    readonly devicesByNickName:Device[];

}

export interface TravelerObjectsState{
    readonly data: TravelerObject[];
    readonly selected:TravelerObject;
}


export interface TravelerTestProgramPK{
    readonly travelerId:number;
    readonly testProgramId:number;
}



export interface TravelerTestProgram{
    readonly testProgram: TestProgram;
    readonly id:  number;
    readonly expectedBin:Bin;
    readonly  testLocation:Location;
    selected:boolean;



}

export interface TestProgramTravelersState{
    readonly data: TravelerTestProgram[];
    readonly selected:TravelerTestProgram;
}

export interface TemporaryIDsState{
    readonly StressTestTemporaryID:number;
    readonly DebugDataTemporaryID:number;
    readonly ImageTemporaryID:number;
    readonly VendorJobTemporaryID:number;

}

export interface TravelerSearch {

    NickName:NickName;
    Device:Device;
    Lot:Lot;
    AssemblyLocation:Location;
     StressLocation:Location;
    VendorJobNumber:number;
    Box:string;
    TaskNumber:number;


}


export interface AppState {
    readonly user: UserState;
    readonly devices: DevicesState;
    readonly images:ImagesState;
    readonly debugData:DebugDataState;
    readonly stresstests:StressTestState;
    readonly vendors:VendorsState;
    readonly vendorjobs:VendorsJobState;
    readonly fabricators:FabricatrsState;
    readonly technologys:TechnologysState;
    readonly packages:PackagesState;
    readonly bins:BinsState;
    readonly testprograms:TestProgramsState;
    readonly lots:LotsState;
    readonly taskdatas:TaskDatasState;
    readonly stressdatas:StressDatasState;
    readonly travelerobjects:TravelerObjectsState;
    readonly nicknames:NickNamesState;
    readonly testprogramtravelers:TestProgramTravelersState
    readonly locations:LocationState;
    readonly temporaryIDs:TemporaryIDsState;


}
