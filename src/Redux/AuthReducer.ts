import { Dispatch } from "redux";
import { AuthAPI } from "../API/api";
import { setUserDataActionDataType } from "../Types/ReducersTypes";
import { appStateType } from "./ReduxStore";

const SET_USER_DATA = 'auth/SET_USER_DATA',
    SET_CAPTCHA = 'app/SET_CAPTCHA'

type initialStateType = typeof initialState

let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuthorised: false,
    captchaURL: null as null | string
}

const authReducer = (state = initialState, action: actionsType): initialStateType => {
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

type actionsType = setUserDataActionType | setCaptchaType

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
    setCaptcha = (url: string): setCaptchaType => ({ type: SET_CAPTCHA, url })

type thunkType = Dispatch<actionsType>

export const getAuth = () => async (dispatch: thunkType, getState: appStateType) => {
    let data = await (AuthAPI.getAuth())
    if (data.resultCode === 0) {
        let { id, email, login } = data.data
        dispatch(setUserData(id, email, login, true))
    }
},
    login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: thunkType) => {
        let data = await (AuthAPI.login(email, password, rememberMe, captcha))
        if (data.resultCode === 0) {
            dispatch(getAuth())
        }
    },
    logout = () => async (dispatch: thunkType, getState: appStateType) => {
        let data = await (AuthAPI.logout())
        if (data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        }
    },
    getCaptcha = () => async (dispatch: thunkType, getState: appStateType) => {
        let data = await (AuthAPI.getCaptcha())
        dispatch(setCaptcha(data.url))
    }


export default authReducer;