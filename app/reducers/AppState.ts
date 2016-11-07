export interface UserState {
    readonly userName: string;
    readonly role: string;
    readonly logging: boolean;
}

export interface AppState {
    readonly user: UserState;
}
