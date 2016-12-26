/**
 * Created by eilamc on 12/21/2016.
 */
import {IDebugDataWebApi} from "../webApis/debugdatas.webapi";
import {DebugData} from "../reducers/AppState";

const debugdatas: DebugData[] = require("./debugdatas.json");

export class debugdatasWebApiMock implements IDebugDataWebApi {
    getDebugDatas(): Promise<DebugData[]> {
        return Promise.resolve().then(() => {
            console.log(debugdatas);
            return debugdatas;
        });
    }

    getDebugData(id: number): Promise<DebugData> {
        return Promise.resolve().then(() => {
            const DebugData = debugdatas.find(d => d.id == id);
            if (!DebugData) {
                throw new Error("Invalid debugdata desc");
            }

            return DebugData;
        });
    }

    getDebugDataByDesc(desc: string): Promise<DebugData> {
        return Promise.resolve().then(() => {
            const DebugData = debugdatas.find(d => d.desc == desc);
            if (!DebugData) {
                throw new Error("Invalid debugdata desc");
            }

            return DebugData;
        });
    }
}