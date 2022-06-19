import { instance, responseType } from "./api"

type loginUserIdType = {
    userId: number
}
type authDataType = {
    id: number
    email: string
    login: string
}
type captchaURLType = {
    url: string
}

export const AuthAPI = {
    getAuth() {
        return instance.get<responseType<authDataType>>(`auth/me`)
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<responseType<loginUserIdType>>(`auth/login`,
            { email, password, rememberMe, captcha })
            .then(response => response.data)
    },

    logout() {
        return instance.delete<responseType>(`auth/login`)
            .then(response => response.data)
    },

    getCaptcha() {
        return instance.get<captchaURLType>(`security/get-captcha-url`)
            .then(response => response.data)

    }
}