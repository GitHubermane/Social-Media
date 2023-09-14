import React from "react"
import { useSelector } from "react-redux"
import { Users } from "./Users"
import { Preloader } from "../../Commons/Preloader"
import { appStateType } from "../../../Store/ReduxStore"

export type propsType = {}
export const UsersContainer: React.FC<propsType> = (props) => {
  const isFetching = useSelector(
    (state: appStateType) => state.UsersPage.isFetching
  )
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  )
}

export default UsersContainer
