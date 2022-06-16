import { UsersDataType } from '../../../Types/ReducersTypes';
import { Paginator } from './Paginator/Paginator';
import { User } from './User/User';

type propsType = {
  UsersData: Array<UsersDataType>
  totalUsersCount: number
  usersCount: number
  currentPageNumber: number
  onPageChange: (pageNum: number) => void
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void

}
export const Users: React.FC<propsType> = (props) => {

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