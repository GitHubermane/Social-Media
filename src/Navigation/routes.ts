import { lazy } from "react"

import { StartPage } from "../Components/Content/Start/StartPage"

const ProfileContainer = lazy(
  () => import("../Components/Content/Profile/ProfileContainer")
)
const DialogsContainer = lazy(
  () => import("../Components/Content/Dialogs/DialogsContainer")
)
const UsersContainer = lazy(
  () => import("../Components/Content/Users/UsersContainer")
)
const Login = lazy(() => import("../Components/Content/Login/Login"))

const PROFILE_PATH = "/profile/:userId"
const DIALOGS_PATH = "/messages/*"
const USERS_PATH = "/users/"
const LOGIN_PATH = "/login/"
const WELCOME_PATH = "/welcome"

export const routes = [
  {
    path: PROFILE_PATH,
    Component: ProfileContainer,
  },
  {
    path: DIALOGS_PATH,
    Component: DialogsContainer,
  },
  {
    path: USERS_PATH,
    Component: UsersContainer,
  },
  {
    path: LOGIN_PATH,
    Component: Login,
  },
  {
    path: WELCOME_PATH,
    Component: StartPage,
  },
]
