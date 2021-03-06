import React from 'react';
import { NavLink } from 'react-router-dom';
//@ts-ignore
import HeaderStyle from './Header.module.css';

type propsType = {
  isAuthorised: boolean
  loginName: string
  logout: () => void
}

export const Header: React.FC<propsType> = (props) => {
  return (
    <header className={HeaderStyle.header}>
      <div className={HeaderStyle.header__body}>
        <div className={HeaderStyle.header__logo}>
          V
        </div>
        <nav className={HeaderStyle.header__nav}>
          {props.isAuthorised ?
            <div className={HeaderStyle.header__link}>
              {props.loginName}
              <button className={HeaderStyle.header__logout}
                onClick={props.logout}>Logout</button>
            </div> :
            <NavLink className={HeaderStyle.header__link} to='/login'>
              Login
            </NavLink>
          }
        </nav>
      </div>
    </header>
  )
}
