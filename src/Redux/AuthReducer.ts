import { AuthAPI } from "../API/api";

const SET_USER_DATA = 'auth/SET_USER_DATA',
    SET_CAPTCHA = 'app/SET_CAPTCHA'

type initialStateType = typeof initialState
    
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuthorised: false,
    captchaURL: null
}
    
const authReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            };
        }

        case SET_CAPTCHA: {
            return {
                ...state,
                captchaURL: action.url,
            };
        }

        default:
            return state;
    }
}

type setUserDataActionDataType = {
    id: number | null,
    email: string | null,
    login: string | null, 
    isAuthorised: boolean,
}
type setUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: setUserDataActionDataType
}
type setCaptchaType = {
    type: typeof SET_CAPTCHA,
    url: string
}
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuthorised: boolean): setUserDataActionType => ({
    type: SET_USER_DATA,
    data: { id, email, login, isAuthorised }
}),
    setCaptcha = (url): setCaptchaType => ({ type: SET_CAPTCHA, url })

export const getAuth = () => (dispatch: any) => {
    return AuthAPI.getAuth()
        .then(data => {
            if (data.resultCode === 0) {
                let { id, email, login } = data.data
                dispatch(setUserData(id, email, login, true))
            }
        })
},
    login = (email, password, rememberMe, captcha) => (dispatch: any) => {
        AuthAPI.login(email, password, rememberMe, captcha)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuth())
                }

            })
    },
    logout = () => (dispatch: any) => {
        AuthAPI.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }

            })
    },
    getCaptcha = () => (dispatch: any) => {
        AuthAPI.getCaptcha()
            .then((data) => {
                dispatch(setCaptcha(data.url))
            })
    }


export default authReducer;