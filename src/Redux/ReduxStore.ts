import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare, { ThunkAction } from 'redux-thunk'
import profileReducer from './ProfileReducer';
import messageReducer from './MessageReducer';
import usersReducer from './UsersReducer';
import authReducer from './AuthReducer';
import appReducer from './AppReducer';

type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>

let rootReducer = combineReducers({
    ProfilePage: profileReducer,
    MessagesPage: messageReducer,
    UsersPage: usersReducer,
    Auth: authReducer,
    App: appReducer,
});

export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, unknown, A>

export type inferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type storeType = typeof store
let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));
//@ts-ignore
window.store = store
export default store