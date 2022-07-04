import { resultCodeEnum } from "../API/api";
import { AuthAPI } from "../API/AuthAPI";
import { baseThunkType, inferActionsType } from "./ReduxStore";


type initialStateType = typeof initialState

let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuthorised: false,
    captchaURL: null as null | string,
    error: null as null | Array<string>
}

const authReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case 'auth/SET_USER_DATA': {
            return {
                ...state,
                ...action.data,
            };
        }

        case 'auth/SET_CAPTCHA': {
            return {
                ...state,
                captchaURL: action.url,
            };
        }

        case 'auth/SET_ERROR': {
            return {
                ...state,
                error: action.error,
            };
        } 
        default:
            return state;
    }
}

type actionsType = inferActionsType<typeof actions>

export const actions = {
    setUserData: (id: number | null,
        email: string | null,
        login: string | null,
        isAuthorised: boolean) => ({
            type: 'auth/SET_USER_DATA',
            data: { id, email, login, isAuthorised } 
        } as const),
    setError: (error: Array<string> | null) => ({ type: 'auth/SET_ERROR', error } as const),
    setCaptcha: (url: string | null) => ({ type: 'auth/SET_CAPTCHA', url } as const),
}

type thunkType = baseThunkType<actionsType>


export const getAuth = (): thunkType => async (dispatch) => {
    let data = await (AuthAPI.getAuth())
    if (data.resultCode === resultCodeEnum.Success) {
        let { id, email, login } = data.data
        dispatch(actions.setUserData(id, email, login, true))
    }
},
    login = (email: string, password: string, rememberMe: boolean, captcha: string): thunkType => async (dispatch) => {
        let data = await (AuthAPI.login(email, password, rememberMe, captcha))
        if (data.resultCode === resultCodeEnum.Success) {
            dispatch(getAuth())
            dispatch(actions.setError(null))
        }
        if (data.resultCode === resultCodeEnum.Error) {
            dispatch(actions.setError(data.messages))
        }
    },
    logout = (): thunkType => async (dispatch) => {
        let data = await (AuthAPI.logout())
        if (data.resultCode === resultCodeEnum.Success) {
            dispatch(actions.setUserData(null, null, null, false))
        }
    },
    getCaptcha = (): thunkType => async (dispatch) => {
        let data = await (AuthAPI.getCaptcha())
        dispatch(actions.setCaptcha(data.url))
    }


export default authReducer;