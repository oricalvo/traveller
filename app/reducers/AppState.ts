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
}

export enum FabricatorSortBy {
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


export enum DeviceSortBy {
    name,
    serial,
    date
}

export interface Device {
    readonly id: number;
    readonly name: string;
    readonly serial: string;
}

export interface DevicesState {
    readonly data: Device[],
    // readonly sortBy: DeviceSortBy,
    // readonly isAscending: boolean,
    // readonly isLoading: boolean,
    // readonly displayedItems: Object[],
    // readonly currentDeviceId: number
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
    readonly vendor :Vendor;

}

export interface VendorsJobState{
    readonly data: vendorJob[]
}

export enum vendorJobSortBy {
    name
}


export interface Image{
    readonly id: number;
    readonly path: string;
}

export interface ImagesState{
    readonly data: Image[];
}

export enum ImageSortBy {
    path
}

export interface DebugData{
    readonly id: number;
    readonly desc: string;
    readonly images: Image[];
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
    readonly vendorJob:vendorJob;
}

export interface StressTestState{
    readonly data: StressTest[]
    readonly selected: StressTest;
}

export enum StressTestSortBy {
    id,qtyIn,stressDuration,stressCycleIn,stressDateIn,stressDateOut,stressReject,stressQtyOut,testQtyIn,testDuration,testDateIn,testDateOut,testRejects,testQtyOut,clips,reballingNumber,faNumber,box,zone,faDiscription,updatedByPersonId,comments,updateDate

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
}
