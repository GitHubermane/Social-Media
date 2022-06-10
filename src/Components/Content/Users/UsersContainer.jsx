import React from 'react';
import {
  followSuccess,
  unfollowSuccess,
  follow,
  unfollow,
  setUsers,
  setPages,
  setTotalUsersCount,
  toggleIsFetching,
  toggleIsFollowingInProgress,
  getUsers,
  pageChange
} from '../../../Redux/UsersReducer';
import { connect } from 'react-redux';
import { Users } from './Users';
import { Preloader } from '../../Commons/Preloader';
import { withAuthRedirect } from '../../HOC/AuthRedirect';
import { compose } from 'redux';

export class UsersWithAPIContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPageNumber, this.props.usersCount)
  }

  onPageChange = (pageNum) => {
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
            followSuccess={this.props.followSuccess}
            unfollowSuccess={this.props.unfollowSuccess}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
            toggleIsFollowingInProgress={this.props.toggleIsFollowingInProgress}
          />
        }

      </>
    )
  }
}


let mapStateToProps = (state) => {
  return {
    UsersData: state.UsersPage.UsersData,
    totalUsersCount: state.UsersPage.totalUsersCount,
    currentPageNumber: state.UsersPage.currentPageNumber,
    usersCount: state.UsersPage.usersCount,
    isFetching: state.UsersPage.isFetching,
    followingInProgress: state.UsersPage.followingInProgress,
  }
}

export default compose(
  connect(mapStateToProps,
    {
      followSuccess, unfollowSuccess, follow, unfollow,
      setUsers, setPages, setTotalUsersCount, toggleIsFetching,
      toggleIsFollowingInProgress, getUsers, pageChange
    }),
  withAuthRedirect
)(UsersWithAPIContainer)
