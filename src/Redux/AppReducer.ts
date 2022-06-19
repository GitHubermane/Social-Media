import { getAuth } from "./AuthReducer";
import { baseThunkType, inferActionsType } from "./ReduxStore";


type initialStateType = typeof initialState

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case 'app/SET_INITIALIZING': {
            return {
                ...state,
                initialized: true,
            };
        }
        
        default:
            return state;
    }
}

type actionsType = inferActionsType<typeof actions>

export const actions = {
    setInitializing: () => ({ type: 'app/SET_INITIALIZING' } as const),
}

type thunkType = baseThunkType<actionsType>

export const initializeApp = (): thunkType => async (dispatch) => {
    let authPromise = dispatch(getAuth())
    Promise.all([authPromise])
        .then(() => {
            dispatch(actions.setInitializing())
        })
}

export default appReducer;