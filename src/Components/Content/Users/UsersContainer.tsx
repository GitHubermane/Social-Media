import React from 'react';
import {
  follow, unfollow,
  actions,
  getUsers, pageChange
} from '../../../Redux/UsersReducer';
import { connect } from 'react-redux';
import { Users } from './Users';
import { Preloader } from '../../Commons/Preloader';
import { withAuthRedirect } from '../../HOC/AuthRedirect';
import { compose } from 'redux';
import { filterType, UsersDataType } from '../../../Types/ReducersTypes';
import { appStateType } from '../../../Redux/ReduxStore';

type mapStateToPropsType = {
  UsersData: Array<UsersDataType>
  totalUsersCount: number
  currentPageNumber: number
  usersCount: number
  isFetching: boolean
  followingInProgress: Array<number>
  filter: filterType
}

type mapDispatchToPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: () => void
  setPages: () => void
  setTotalUsersCount: () => void
  setFilter: (term: string | null, friends: boolean | null) => void
  toggleIsFetching: () => void
  getUsers: (currentPageNumber: number, usersCount: number, term: string | null, friends: boolean | null) => void
  pageChange: (pageNum: number, usersCount: number, term: string | null, friends: boolean | null) => void
}

export type propsType = mapStateToPropsType & mapDispatchToPropsType

export class UsersContainer extends React.Component<propsType> {
  componentDidMount() {
    const { currentPageNumber, usersCount, filter } = this.props
    this.props.getUsers(currentPageNumber, usersCount, filter.term, filter.friends)
  }

  onPageChange = (pageNum: number) => {
    const { usersCount, filter } = this.props
    this.props.pageChange(pageNum, usersCount, filter.term, filter.friends)
  }

  onFilterChange = (filter: filterType) => {
    const { usersCount } = this.props
    this.props.pageChange(1, usersCount, filter.term, filter.friends)
    this.props.getUsers(1, usersCount, filter.term, filter.friends)
  }

  render() {
    return (
      <>
        <Users
          UsersData={this.props.UsersData}
          totalUsersCount={this.props.totalUsersCount}
          currentPageNumber={this.props.currentPageNumber}
          usersCount={this.props.usersCount}
          onPageChange={this.onPageChange}
          onFilterChange={this.onFilterChange}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          filter={this.props.filter}
          setFilter={this.props.setFilter}
          getUsers={this.props.getUsers}
        />
        {this.props.isFetching ? <Preloader /> : null}
      </>
    )
  }
}


let mapStateToProps = (state: appStateType): mapStateToPropsType => {
  return {
    UsersData: state.UsersPage.UsersData,
    totalUsersCount: state.UsersPage.totalUsersCount,
    currentPageNumber: state.UsersPage.currentPageNumber,
    usersCount: state.UsersPage.usersCount,
    isFetching: state.UsersPage.isFetching,
    followingInProgress: state.UsersPage.followingInProgress,
    filter: state.UsersPage.filter
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps,
    {
      ...actions,
      follow, unfollow,
      getUsers, pageChange
    }),
  withAuthRedirect
)(UsersContainer)
