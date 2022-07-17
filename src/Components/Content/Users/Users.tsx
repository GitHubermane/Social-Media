import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStateType } from '../../../Redux/ReduxStore';
import { follow, getUsers, pageChange } from '../../../Redux/UsersReducer';
import { filterType, UsersDataType } from '../../../Types/ReducersTypes';
import { Paginator } from './Paginator/Paginator';
import { SearchForm } from './SearchForm/SerchForm';
import { User } from './User/User';

type propsType = {
}
export const Users: React.FC<propsType> = (props) => {

  useEffect(() => {
    dispatch(getUsers(currentPageNumber, usersCount, filter.term, filter.friends))

  },[])

  const UsersData = useSelector((state: appStateType) => state.UsersPage.UsersData),
    totalUsersCount = useSelector((state: appStateType) => state.UsersPage.totalUsersCount),
    currentPageNumber = useSelector((state: appStateType) => state.UsersPage.currentPageNumber),
    usersCount = useSelector((state: appStateType) => state.UsersPage.usersCount),
    followingInProgress = useSelector((state: appStateType) => state.UsersPage.followingInProgress),
    filter = useSelector((state: appStateType) => state.UsersPage.filter)
  
  const dispatch = useDispatch()

  const onPageChange = (pageNum: number) => {
    dispatch(pageChange(pageNum, usersCount, filter.term, filter.friends))
  },
    onFilterChange = (filter: filterType) => {
      dispatch(pageChange(1, usersCount, filter.term, filter.friends)),
      getUsers(1, usersCount, filter.term, filter.friends)
    },
    follow = (userId: number) => {
      dispatch(follow(userId))
    },
    unfollow = (userId: number) => {
      dispatch(unfollow(userId))
    }

  return (
    <div>
      <SearchForm
        onFilterChange={onFilterChange}
      />
      <Paginator
        totalUsersCount={totalUsersCount}
        usersCount={usersCount}
        currentPageNumber={currentPageNumber}
        onPageChange={onPageChange} />
      {UsersData.map(user =>
        <User
          user={user}
          key={user.id}
          followingInProgress={followingInProgress}
          unfollow={unfollow}
          follow={follow} />
      )}
    </div>
  )
}