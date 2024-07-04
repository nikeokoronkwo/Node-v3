import { CoreOptions } from "request";

export interface RaveBaseReqReturn extends CoreOptions {
    uri: string;
    baseUrl: string;
    method: string;
    json: boolean;
    headers: {
        'Content-Type': string;
        Authorization: string;
        [k: string]: string;
    }
    body: any
}

export type RaveBasePayload = any;

export type RaveHandler = (data: any) => Promise<any>;