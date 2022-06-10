import { UsersAPI } from "../API/api"

const FOLLOW = 'users/FOLLOW',
    UNFOLLOW = 'users/UNFOLLOW',
    SET_USERS = 'users/SET_USERS',
    SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
    TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS'

let initialState = {
    UsersData: [],
    totalUsersCount: 50,
    currentPageNumber: 1,
    usersCount: 10,
    isFetching: false,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                UsersData: state.UsersData.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: true }
                    }
                    return u;
                }),
            }
        }

        case UNFOLLOW: {
            return {
                ...state,
                UsersData: state.UsersData.map(u => {
                    if (u.id === action.userID) {
                        return { ...u, followed: false }
                    }
                    return u;
                }),
            }
        }

        case SET_USERS: {
            return {
                ...state,
                UsersData: action.users
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPageNumber: action.currentPage
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {

            return {
                ...state,
                followingInProgress: action.isFollowing ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default: return state;
    }
}


export const followSuccess = (userID) => ({ type: FOLLOW, userID }),
    unfollowSuccess = (userID) => ({ type: UNFOLLOW, userID }),
    setUsers = (users) => ({ type: SET_USERS, users }),
    setPages = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setTotalUsersCount = (usersCount) => ({ type: SET_TOTAL_USERS_COUNT, usersCount }),
    toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching }),
    toggleIsFollowingInProgress = (isFollowing, userId) => ({ type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFollowing, userId })

export const getUsers = (currentPageNumber, usersCount) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let data = await (UsersAPI.getUsers(currentPageNumber, usersCount))
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
},
    pageChange = (currentPageNumber, usersCount) => async (dispatch) => {
        dispatch(setPages(currentPageNumber));
        dispatch(toggleIsFetching(true))
        let data = await (UsersAPI.getUsers(currentPageNumber, usersCount))
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))

    },
    follow = (id) => async (dispatch) => {
        dispatch(toggleIsFollowingInProgress(true, id))
        let data = await (UsersAPI.getFollow(id))
        if (data.resultCode == 0) {
            dispatch(followSuccess(id))
        }
        dispatch(toggleIsFollowingInProgress(false, id))
    },
    unfollow = (id) => async (dispatch) => {
        dispatch(toggleIsFollowingInProgress(true, id))
        let data = await (UsersAPI.getUnfollow(id))
        if (data.resultCode == 0) {
            dispatch(unfollowSuccess(id))
        }
        dispatch(toggleIsFollowingInProgress(false, id))

    }




export default usersReducer;