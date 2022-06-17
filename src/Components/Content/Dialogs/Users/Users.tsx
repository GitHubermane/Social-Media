import React from 'react'
import { NavLink } from 'react-router-dom'
import UsersStyle from './Users.module.css'

type propsType = {
  id: number
  name: string
}
export const Users: React.FC<propsType> = (props) => {
  return (
    <NavLink to={`${props.id}`} className={UsersStyle.user__item}>
      {props.name}
    </NavLink>
  )
}


