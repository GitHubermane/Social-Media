import { filterType, UsersDataType } from '../../../Types/ReducersTypes';
import { Paginator } from './Paginator/Paginator';
import { SearchForm } from './SearchForm/SerchForm';
import { User } from './User/User';

type propsType = {
  UsersData: Array<UsersDataType>
  totalUsersCount: number
  usersCount: number
  currentPageNumber: number
  filter: filterType
  followingInProgress: Array<number>
  getUsers: (currentPageNumber: number, usersCount: number, term: string | null, friends: boolean | null) => void
  setFilter: (term: string | null, friends: boolean | null) => void
  onFilterChange: (filter: filterType) => void
  onPageChange: (pageNum: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}
export const Users: React.FC<propsType> = (props) => {

  return (
    <div>
      <SearchForm
        onFilterChange={props.onFilterChange}
      />
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