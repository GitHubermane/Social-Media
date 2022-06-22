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
import { UsersDataType } from '../../../Types/ReducersTypes';
import { appStateType } from '../../../Redux/ReduxStore';

type mapStateToPropsType = {
  UsersData: Array<UsersDataType>
  totalUsersCount: number
  currentPageNumber: number
  usersCount: number
  isFetching: boolean
  followingInProgress: Array<number>
}
type mapDispatchToPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setUsers: () => void
  setPages: () => void
  setTotalUsersCount: () => void
  toggleIsFetching: () => void
  getUsers: (currentPageNumber: number, usersCount: number) => void
  pageChange: (pageNum: number, usersCount: number) => void
}
export type propsType = mapStateToPropsType & mapDispatchToPropsType

export class UsersWithAPIContainer extends React.Component<propsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPageNumber, this.props.usersCount)
  }

  onPageChange = (pageNum: number) => {
    this.props.pageChange(pageNum, this.props.usersCount)
  }

  render() {
    return (
      <>
        {this.props.isFetching == true ?
          <Preloader /> :
          <Users UsersData={this.props.UsersData}
            totalUsersCount={this.props.totalUsersCount}
            currentPageNumber={this.props.currentPageNumber}
            usersCount={this.props.usersCount}
            onPageChange={this.onPageChange}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
          />
        }

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
)(UsersWithAPIContainer)
