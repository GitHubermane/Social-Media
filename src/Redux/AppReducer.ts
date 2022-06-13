import { getAuth } from "./AuthReducer";

const SET_INITIALIZING = 'app/SET_INITIALIZING'

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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
export type setInitializingType = {
    type: typeof SET_INITIALIZING
}
export const setInitializing = (): setInitializingType => ({ type: SET_INITIALIZING })

export const initializeApp = () => (dispatch: any) => {
    let authPromise = dispatch(getAuth())
    Promise.all([authPromise])
        .then(() => {
            dispatch(setInitializing())
        })
}


export default appReducer;