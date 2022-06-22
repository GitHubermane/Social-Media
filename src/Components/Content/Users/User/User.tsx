import React from 'react'
import { NavLink } from 'react-router-dom'
import { UsersDataType } from '../../../../Types/ReducersTypes'
//@ts-ignore
import UserStyle from './User.module.css'

type propsType = {
    user: UsersDataType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
export const User: React.FC<propsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div
            className={UserStyle.User__body}
            key={user.id}>
            <div className={UserStyle.User__container}>
                <NavLink to={`/profile/${user.id}`}>
                    <img className={UserStyle.User__img}
                        src={
                            user.photos.small != null ?
                                user.photos.small :
                                "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"}
                    />
                </NavLink>
                <div className={UserStyle.User__content}>
                    <div className={UserStyle.User__name}>
                        <NavLink className={UserStyle.User__link} to={`/profile/${user.id}`}>
                            {user.name}
                        </NavLink>
                    </div>
                    <p className={UserStyle.User__status}>
                        {user.status}
                        {user.id}
                    </p>
                </div>
            </div>
            <div>
                {user.followed ?
                    <button
                        className={UserStyle.User__button}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollow(user.id)
                        }}
                    >
                        Unfollow
                    </button>
                    :
                    <button
                        className={UserStyle.User__button}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            follow(user.id)

                        }}
                    >
                        Follow
                    </button>
                }
            </div>
        </div>
    )
}
