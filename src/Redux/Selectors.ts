import { appStateType } from "./ReduxStore"

export const getPostData = (state: appStateType) => {
    return state.ProfilePage.PostData
}

export const getPostNewText = (state: appStateType) => {
    return state.ProfilePage.postNewText
}

export const getProfile = (state: appStateType) => {
    return state.ProfilePage.profile
}

export const getStatus = (state: appStateType) => {
    return state.ProfilePage.status
}

export const getId = (state: appStateType) => {
    return state.Auth.id
}

export const getMessagesData = (state: appStateType) => {
    return state.MessagesPage.MessagesData
}