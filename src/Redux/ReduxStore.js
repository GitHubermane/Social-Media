import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk'
import profileReducer from './ProfileReducer';
import messageReducer from './MessageReducer';
import usersReducer from './UsersReducer';
import authReducer from './AuthReducer';
import appReducer from './AppReducer';

let reducers = combineReducers({
    ProfilePage: profileReducer,
    MessagesPage: messageReducer,
    UsersPage: usersReducer,
    Auth: authReducer,
    App: appReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));
window.store = store
export default store