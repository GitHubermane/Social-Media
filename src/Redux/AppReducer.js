import { getAuth } from "./AuthReducer";

const SET_INITIALIZING = 'app/SET_INITIALIZING'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INITIALIZING: {
            return {
                ...state,
                initialized: true,
            };
        }

        default:
            return state;
    }
}

export const setInitializing = () => ({ type: SET_INITIALIZING })

export const initializeApp = () => (dispatch) => {
    let authPromise = dispatch(getAuth())
    Promise.all([authPromise])
        .then(() => {
            dispatch(setInitializing())
        })
}


export default appReducer;