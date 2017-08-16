import { InMemoryDbService } from 'angular-in-memory-web-api';

export interface LoginResponse {
    id: number;
    userName: string;
    role: string;
}

export interface ILoginWebApi {
    login(userName: string, password: string): Promise<LoginResponse>;
    logout(): Promise<void>;
}
