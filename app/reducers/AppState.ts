export interface UserState {
    readonly userName: string;
    readonly role: string;
    readonly logging: boolean;
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

export interface AppState {
    readonly user: UserState;
    readonly devices: DevicesState;
}
