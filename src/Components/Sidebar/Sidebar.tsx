import { MailOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react'
import { NavLink } from 'react-router-dom';
//@ts-ignore
import SidebarStyle from './Sidebar.module.css';

type propsType = {
  
}
export const Sidebar: React.FC<propsType> = (props) => {
  return (
    <div className={SidebarStyle.sidebar}>
      <div className={SidebarStyle.sidebar__body}>
        <ul className={SidebarStyle.sidebar__nav}>
          <li className={SidebarStyle.sidebar__li}>
            <NavLink className={SidebarStyle.sidebar__link} to="/profile/23958">
              <UserOutlined /><span className={SidebarStyle.sidebar__linkName}>Profile</span>
            </NavLink>
          </li>

          <li className={SidebarStyle.sidebar__li}>
            <NavLink className={SidebarStyle.sidebar__link} to="/messages">
              <MailOutlined /><span className={SidebarStyle.sidebar__linkName}>Chat</span>
            </NavLink>
          </li>

          <li className={SidebarStyle.sidebar__li}>
            <NavLink className={SidebarStyle.sidebar__link} to='/users'>
              <TeamOutlined /><span className={SidebarStyle.sidebar__linkName}>Users</span>
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  )
}
