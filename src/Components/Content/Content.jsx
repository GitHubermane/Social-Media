import React, { Suspense } from 'react'
import ContentStyle from "./Content.module.css"
import { Sidebar } from "../Sidebar/Sidebar";
import { Route, Routes } from 'react-router-dom';
import { Preloader } from '../Commons/Preloader';
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Users/UsersContainer'));
const Login = React.lazy(() => import('./Login/Login'));

export const Content = (props) => {

  return (
    <div className={ContentStyle.content}>
      <Sidebar />
      <div className={ContentStyle.contentBlock}>
        <Suspense fallback={<Preloader/>}>
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
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
