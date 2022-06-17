import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getAuth } from "./AuthReducer";
import { appStateType } from "./ReduxStore";

const SET_INITIALIZING = 'app/SET_INITIALIZING'

type initialStateType = typeof initialState

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: actionsType): initialStateType => {
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

type actionsType = setInitializingActionType
export type setInitializingActionType = {
    type: typeof SET_INITIALIZING
}
export const setInitializing = (): setInitializingActionType => ({ type: SET_INITIALIZING })

type thunkType = Dispatch<actionsType>

export const initializeApp = () => (dispatch: thunkType, getState: appStateType) => {
    let authPromise = dispatch(getAuth())
    Promise.all([authPromise])
        .then(() => {
            dispatch(setInitializing())
        })
}


export default appReducer;