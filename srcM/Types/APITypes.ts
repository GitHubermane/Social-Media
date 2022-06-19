import { photosType, profileType, setUserDataActionDataType, UsersDataType } from "./ReducersTypes"

export type generalResponseType = {
    resultCode: number
    messages: Array<string>
    data: any
}

export type getUsersResponseType = {
    items: Array<UsersDataType>
    totalCount: number
    error: string
}
export type getUnfollowResponseType = generalResponseType
export type getFollowResponseType = generalResponseType


export type getUserIdResponseType = profileType
export type getStatusResponseType = string
export type updateStatusResponseType = generalResponseType
export type updatePhotoResponseType = {
    data: photosType
    resultCode: number
    messages: Array<string>
}
export type updateInfoResponseType = generalResponseType

export type getAuthResponseType = {
    data: setUserDataActionDataType
    resultCode: number
    messages: Array<string>
}
export type loginResponseType = {
    data: string
    resultCode: number
    messages: Array<string>
}
export type logoutResponseType = generalResponseType
export type getCaptchaResponseType = {
    url: string
}
export type getDialogsType = any
export type startChattingType = any
export type showMessagesType = any
export type sendMessageType = any