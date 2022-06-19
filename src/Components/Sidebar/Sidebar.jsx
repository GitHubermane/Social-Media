import React from 'react'
import { NavLink } from 'react-router-dom';
import SidebarStyle from './Sidebar.module.css';

export const Sidebar = (props) => {
  return (
    <div className={SidebarStyle.sidebar}>
      <div className={SidebarStyle.sidebar__body}>
        <ul className={SidebarStyle.sidebar__nav}>
          <li className={SidebarStyle.sidebar__li}>
            <NavLink className={SidebarStyle.sidebar__link} to="/profile/23958">
              Profile
            </NavLink>
          </li>

          <li className={SidebarStyle.sidebar__li}>
            <NavLink className={SidebarStyle.sidebar__link} to="/messages">
              Messages
            </NavLink>
          </li>

          <li className={SidebarStyle.sidebar__li}>
            <NavLink className={SidebarStyle.sidebar__link} to='/users'>
              Users
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  )
}
