import { getAuth } from "./AuthReducer.ts";

const SET_INITIALIZING = 'app/SET_INITIALIZING'

type initialStateType = typeof initialState

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: any): initialStateType => {
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
export type setInitializingActionType = {
    type: typeof SET_INITIALIZING
}
export const setInitializing = (): setInitializingActionType => ({ type: SET_INITIALIZING })

export const initializeApp = () => (dispatch: any) => {
    let authPromise = dispatch(getAuth())
    Promise.all([authPromise])
        .then(() => {
            dispatch(setInitializing())
        })
}


export default appReducer;