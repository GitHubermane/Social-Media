import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a4c12b19-bb78-4fac-9a69-dd40533e046a"
    },
    withCredentials: true
})

export const UsersAPI = {
    getUsers(currentPageNumber, usersCount) {
        return instance.get(`users?page=${currentPageNumber}&count=${usersCount}`)
            .then(response => response.data)
    },

    getUnfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },

    getFollow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
}

export const ProfileAPI = {
    getUserId(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },

    updateStatus(status) {
        return instance.put(`profile/status`,
         { status })
            .then(response => response.data)
    },

    updatePhoto(photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`,
            formData, 
            
            { headers: {
                'Content-Type': 'multipart/form-data'
            }}
        )
            .then(response => response.data)
    },

    updateInfo(info) {
        return instance.put(`profile`, info )
            .then(response => response.data)
    }

}

export const AuthAPI = {

    getAuth() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

    login(email, password, rememberMe = false, captcha){
        return instance.post(`auth/login`,
            { email, password, rememberMe, captcha })
            .then(response => response.data) 
    },

    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    },
    
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
            .then(response => response.data)
    
    } 
}

export const MessageAPI = {

    getDialogs() {
        return instance.get(`dialogs`)
            .then(response => response.data)
    },

    startChatting(userId) {
        return instance.put(`dialogs/${userId}`,
            { userId })
            .then(response => response.data)
    },

    showMessages(userId) {
        return instance.get(`dialogs/${userId}/messages`)
            .then(response => response.data)
    },

    sendMessage(userId, message) {
        return instance.post(`dialogs/${userId}/messages`,
             message)
            .then(response => response.data)

    },
    
}
