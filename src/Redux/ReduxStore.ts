import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk'
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

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));
//@ts-ignore
window.store = store
export default store