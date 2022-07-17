import React, { Suspense } from 'react'
//@ts-ignore
import ContentStyle from "./Content.module.css"
import { Sidebar } from "../Sidebar/Sidebar";
import { Route, Routes } from 'react-router-dom';
import { Preloader } from '../Commons/Preloader';
import { storeType } from '../../Redux/ReduxStore';
import { StartPage } from './Start/StartPage';
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Users/UsersContainer'));
const Login = React.lazy(() => import('./Login/Login'));

type propsType = {
  store: storeType
}
export const Content: React.FC<propsType> = (props) => {

  return (
    <div className={ContentStyle.content}>
      <Sidebar />
      <div className={ContentStyle.contentBlock}>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path='/profile/:userId'
              element={<ProfileContainer />}
            />
            <Route path='/messages/*'
              element={<DialogsContainer />}
            />
            <Route path='/users/'
              element={<UsersContainer />}
            />
            <Route path='/login/'
              element={<Login />}
            />
            <Route path='/'
              element={<StartPage />}
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
