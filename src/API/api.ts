import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a4c12b19-bb78-4fac-9a69-dd40533e046a"
    },
    withCredentials: true
})

export type responseType<D = {}> = {
    data: D,
    resultCode: number
    messages: Array<string>
}
export enum resultCodeEnum {
    Success = 0,
    Error = 1
}
export enum resultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}