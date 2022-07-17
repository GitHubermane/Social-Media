import React from 'react'
import { NavLink} from 'react-router-dom'
import './StartPage.css'

export const StartPage = () => {
    return (
        <div className="StartPage__wrapper">
            <div className="StartPage__title">Добро пожаловать</div>
            <NavLink className="StartPage__button" to='/login'>
                Начать
            </NavLink>
        </div>
    )
}
