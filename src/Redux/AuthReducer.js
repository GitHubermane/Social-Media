import { AuthAPI } from "../API/api";

const SET_USER_DATA = 'auth/SET_USER_DATA',
    SET_CAPTCHA = 'app/SET_CAPTCHA'


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuthorised: false,
    captchaURL: null

}

const authReducer = (state = initialState, action) => {
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

export const setUserData = (id, email, login, isAuthorised) => ({
    type: SET_USER_DATA,
    data: { id, email, login, isAuthorised }
}),
    setCaptcha = (url) => ({ type: SET_CAPTCHA, url })

export const getAuth = () => (dispatch) => {
    return AuthAPI.getAuth()
        .then(data => {
            if (data.resultCode === 0) {
                let { id, email, login } = data.data
                dispatch(setUserData(id, email, login, true))
            }
        })
},
    login = (email, password, rememberMe, captcha) => (dispatch) => {
        AuthAPI.login(email, password, rememberMe, captcha)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuth())
                }

            })
    },
    logout = () => (dispatch) => {
        AuthAPI.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }

            })
    },
    getCaptcha = () => (dispatch) => {
        AuthAPI.getCaptcha()
            .then((data) => {
                dispatch(setCaptcha(data.url))
            })
    }


export default authReducer;