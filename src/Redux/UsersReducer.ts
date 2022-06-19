import { UsersAPI } from "../API/UsersAPI"
import { UsersDataType } from "../Types/ReducersTypes"
import { baseThunkType, inferActionsType } from "./ReduxStore"

export type UserinitialStateType = typeof initialState
let initialState = {
    UsersData: [] as Array<UsersDataType>,
    totalUsersCount: 0,
    currentPageNumber: 1,
    usersCount: 10,
    isFetching: false,
    followingInProgress: [] as Array<number> //as Array of user id,
}

const usersReducer = (state = initialState, action: actionsType): UserinitialStateType => {
    switch (action.type) {
        case 'users/FOLLOW': {
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

        case 'users/UNFOLLOW': {
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

        case 'users/SET_USERS': {
            return {
                ...state,
                UsersData: action.users
            }
        }

        case 'users/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPageNumber: action.currentPage
            }
        }

        case 'users/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        }

        case 'users/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS': {

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

type actionsType = inferActionsType<typeof actions>
export const actions = {
    followSuccess: (userID: number) => ({ type: 'users/FOLLOW', userID } as const),
    unfollowSuccess: (userID: number) => ({ type: 'users/UNFOLLOW', userID } as const),
    setUsers: (users: Array<UsersDataType>) => ({ type: 'users/SET_USERS', users } as const),
    setPages: (currentPage: number) => ({ type: 'users/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (usersCount: number) => ({ type: 'users/SET_TOTAL_USERS_COUNT', usersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleIsFollowingInProgress: (isFollowing: boolean, userId: number) => ({ type: 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS', isFollowing, userId } as const)
}

type thunkType = baseThunkType<actionsType>
export const getUsers = (currentPageNumber: number, usersCount: number): thunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    let data = await (UsersAPI.getUsers(currentPageNumber, usersCount))
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
},
    pageChange = (currentPageNumber: number, usersCount: number): thunkType => async (dispatch,) => {
        dispatch(actions.setPages(currentPageNumber));
        dispatch(actions.toggleIsFetching(true))
        let data = await (UsersAPI.getUsers(currentPageNumber, usersCount))
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))

    },
    follow = (id: number): thunkType => async (dispatch) => {
        dispatch(actions.toggleIsFollowingInProgress(true, id))
        let data = await (UsersAPI.getFollow(id))
        if (data.resultCode == 0) {
            dispatch(actions.followSuccess(id))
        }
        dispatch(actions.toggleIsFollowingInProgress(false, id))
    },
    unfollow = (id: number): thunkType => async (dispatch) => {
        dispatch(actions.toggleIsFollowingInProgress(true, id))
        let data = await (UsersAPI.getUnfollow(id))
        if (data.resultCode == 0) {
            dispatch(actions.unfollowSuccess(id))
        }
        dispatch(actions.toggleIsFollowingInProgress(false, id))

    }




export default usersReducer;