import { Dispatch } from "redux"
import { UsersAPI } from "../API/api"
import { UsersDataType } from "../Types/ReducersTypes"
import { appStateType } from "./ReduxStore"

const FOLLOW = 'users/FOLLOW',
    UNFOLLOW = 'users/UNFOLLOW',
    SET_USERS = 'users/SET_USERS',
    SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
    TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS'

export type UserinitialStateType = typeof initialState

let initialState = {
    UsersData: [] as Array<UsersDataType>,
    totalUsersCount: 0,
    currentPageNumber: 1,
    usersCount: 10,
    isFetching: false,
    followingInProgress: [] as Array<number> //as Array of user id,
}
const usersReducer = (state = initialState, action: any): UserinitialStateType => {
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

type actionsType = followSuccessActionType |
    unfollowSuccessActionType |
    setUsersActionType |
    setPagesActionType |
    setTotalUsersCountActionType |
    toggleIsFetchingActionType |
    toggleIsFollowingInProgressActionType

type followSuccessActionType = {
    type: typeof FOLLOW,
    userID: number
}
type unfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userID: number
}
type setUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UsersDataType>
}
type setPagesActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    usersCount: number
}
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
type toggleIsFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFollowing: boolean,
    userId: number,
}

export const followSuccess = (userID: number): followSuccessActionType => ({ type: FOLLOW, userID }),
    unfollowSuccess = (userID: number): unfollowSuccessActionType => ({ type: UNFOLLOW, userID }),
    setUsers = (users: Array<UsersDataType>): setUsersActionType => ({ type: SET_USERS, users }),
    setPages = (currentPage: number): setPagesActionType => ({ type: SET_CURRENT_PAGE, currentPage }),
    setTotalUsersCount = (usersCount: number): setTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, usersCount }),
    toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching }),
    toggleIsFollowingInProgress = (isFollowing: boolean, userId: number): toggleIsFollowingInProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFollowing, userId })

type thunkType = Dispatch<actionsType>

export const getUsers = (currentPageNumber: number, usersCount: number) => async (dispatch: thunkType, getState: appStateType) => {
    dispatch(toggleIsFetching(true))
    let data = await (UsersAPI.getUsers(currentPageNumber, usersCount))
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
},
    pageChange = (currentPageNumber: number, usersCount: number) => async (dispatch: thunkType, getState: appStateType) => {
        dispatch(setPages(currentPageNumber));
        dispatch(toggleIsFetching(true))
        let data = await (UsersAPI.getUsers(currentPageNumber, usersCount))
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))

    },
    follow = (id: number) => async (dispatch: thunkType, getState: appStateType) => {
        dispatch(toggleIsFollowingInProgress(true, id))
        let data = await (UsersAPI.getFollow(id))
        if (data.resultCode == 0) {
            dispatch(followSuccess(id))
        }
        dispatch(toggleIsFollowingInProgress(false, id))
    },
    unfollow = (id: number) => async (dispatch: thunkType, getState: appStateType) => {
        dispatch(toggleIsFollowingInProgress(true, id))
        let data = await (UsersAPI.getUnfollow(id))
        if (data.resultCode == 0) {
            dispatch(unfollowSuccess(id))
        }
        dispatch(toggleIsFollowingInProgress(false, id))

    }




export default usersReducer;