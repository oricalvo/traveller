import {ILoginWebApi, LoginResponse} from "../webApis/login.webapi";

const users = require("./users.json");

export class LoginWebApiMock implements ILoginWebApi {
    login(userName: string, password: string): Promise<LoginResponse> {
        return Promise.resolve().then(()=> {
            const user = users.find(u => u.userName==userName && u.password == password);
            if(!user) {
                throw new Error("Invalid user name or password");
            }

            return {
                id: user.id,
                userName: user.userName,
                role: user.role,
            };
        });
    }

    logout(): Promise<void> {
        return Promise.resolve();
    }
}