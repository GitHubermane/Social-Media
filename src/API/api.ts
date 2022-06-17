import axios from 'axios';
import { getUsersResponseType, generalResponseType, updatePhotoResponseType, getAuthResponseType, loginResponseType, getCaptchaResponseType } from '../Types/APITypes';
import { profileType } from '../Types/ReducersTypes';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a4c12b19-bb78-4fac-9a69-dd40533e046a"
    },
    withCredentials: true
})

export const UsersAPI = {
    getUsers(currentPageNumber: number, usersCount: number) {
        return instance.get<getUsersResponseType>(`users?page=${currentPageNumber}&count=${usersCount}`)
            .then(response => response.data)
    },

    getUnfollow(id: number) {
        return instance.delete<generalResponseType>(`follow/${id}`)
            .then(response => response.data)
    },

    getFollow(id: number) {
        return instance.post<generalResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
}

export const ProfileAPI = {
    getUserId(userId: number) {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data)
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<generalResponseType>(`profile/status`,
         { status })
            .then(response => response.data)
    },

    updatePhoto(photoFile: string | Blob) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<updatePhotoResponseType>(`profile/photo`,
            formData, 
            { headers: {
                'Content-Type': 'multipart/form-data'
            }}
        )
            .then(response => response.data)
    },

    updateInfo(info: profileType) {
        return instance.put<generalResponseType>(`profile`, info)
            .then(response => response.data)
    }

}

export const AuthAPI = {

    getAuth() {
        return instance.get <getAuthResponseType>(`auth/me`)
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe = false, captcha: string){
        return instance.post<loginResponseType>(`auth/login`,
            { email, password, rememberMe, captcha })
            .then(response => response.data) 
    },

    logout() {
        return instance.delete<generalResponseType>(`auth/login`)
            .then(response => response.data)
    },
    
    getCaptcha() {
        return instance.get<getCaptchaResponseType>(`security/get-captcha-url`)
            .then(response => response.data)
    
    } 
}

export const MessageAPI = {

    getDialogs() {
        return instance.get<any>(`dialogs`)
            .then(response => response.data)
    },

    startChatting(userId: number) {
        return instance.put<any>(`dialogs/${userId}`,
            { userId })
            .then(response => response.data)
    },

    showMessages(userId: number) {
        return instance.get<any>(`dialogs/${userId}/messages`)
            .then(response => response.data)
    },

    sendMessage(userId: number, message: string) {
        return instance.post<any>(`dialogs/${userId}/messages`,
             message)
            .then(response => response.data)

    },
    
}
