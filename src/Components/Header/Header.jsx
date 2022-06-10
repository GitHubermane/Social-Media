import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderStyle from './Header.module.css';

export const Header = (props) => {
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
                <button onClick={props.logout}>Logout</button>
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
