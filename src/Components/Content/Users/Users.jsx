import React from 'react';
import { Paginator } from './Paginator/Paginator';
import { User } from './User/User';

export const Users = (props) => {

  return (
    <div>
      <Paginator
        totalUsersCount={props.totalUsersCount}
        usersCount={props.usersCount}
        currentPageNumber={props.currentPageNumber}
        onPageChange={props.onPageChange} />
      {props.UsersData.map(user =>
        <User
          user={user}
          key={user.id}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          follow={props.follow} />
      )}
    </div>
  )
}