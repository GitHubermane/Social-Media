import React from 'react'
import { NavLink } from 'react-router-dom'
import UsersStyle from './Users.module.css'

export const Users = (props) => {
  return (
    <NavLink to={`${props.id}`} className={UsersStyle.user__item}>
      {props.name}
    </NavLink>
  )
}


