import { Dispatch } from "redux";
import { ProfileAPI } from "../API/api";
import { photosType, PostDataType, profileType } from "../Types/ReducersTypes";
import { appStateType } from "./ReduxStore";

const ADD_NEW_POST = 'profile/ADD_NEW_POST',
    SET_PROFILE_PAGE = 'profile/SET_PROFILE_PAGE',
    SET_STATUS = 'profile/SET_STATUS',
    SET_PHOTO = 'profile/SET_PHOTO'

type initialStateType = typeof initialState

let initialState = {
    PostData: [
        { id: 1, likes: 23, text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, atque!" },
        { id: 2, likes: 10, text: "Lorem ipsum dolor, sit amet  elit. Hic, atque!" },
        { id: 3, likes: 53, text: "Lorem ipsum 2, sit amet 4 elit. Hic, atque!" },
    ] as Array<PostDataType>,
    profile: null as profileType | null,
    postNewText: '',
    status: '',
}
let idCount = 4;
const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_NEW_POST: {
            let newPost = {
                id: idCount,
                likes: "23",
                text: action.postNewText
            };
            idCount++;
            return {
                ...state,
                PostData: [
                    ...state.PostData,
                    newPost,
                ],
                postNewText: '',
            };
        }

        case SET_PROFILE_PAGE: {
            return {
                ...state,
                profile: action.profile
            };
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }

        case SET_PHOTO: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photo
                } as profileType
            };
        }
        default:
            return state;
    }
}
type actionsType = addPostType |
    setProfileType |
    setStatusType |
    setPhotoType
type addPostType = {
    type: typeof ADD_NEW_POST,
    postNewText: string
}
type setProfileType = {
    type: typeof SET_PROFILE_PAGE,
    profile: profileType
}
type setStatusType = {
    type: typeof SET_STATUS,
    status: string
}
type setPhotoType = {
    type: typeof SET_PHOTO,
    photo: photosType
}

export const addPost = (postNewText: string): addPostType => ({ type: ADD_NEW_POST, postNewText }),
    setProfile = (profile: profileType): setProfileType => ({ type: SET_PROFILE_PAGE, profile }),
    setStatus = (status: string): setStatusType => ({ type: SET_STATUS, status }),
    setPhoto = (photo: photosType): setPhotoType => ({ type: SET_PHOTO, photo })

type thunkType = Dispatch<actionsType>

export const getUserId = (userId: number) => async (dispatch: thunkType, getState: appStateType) => {
    let data = await (ProfileAPI.getUserId(userId))
    dispatch(setProfile(data))
},
    getUserStatus = (userId: number) => async (dispatch: thunkType, getState: appStateType) => {
        let data = await (ProfileAPI.getStatus(userId))
        dispatch(setStatus(data))
    },
    updateUserStatus = (status: string) => async (dispatch: thunkType, getState: appStateType) => {
        let data = await (ProfileAPI.updateStatus(status))
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    },
    savePhoto = (photo: string | Blob) => async (dispatch: thunkType, getState: appStateType) => {
        let data = await (ProfileAPI.updatePhoto(photo))
        if (data.resultCode === 0) {
            dispatch(setPhoto(data.data.photos))
        }
    },
    updateInfo = (profile: profileType) => async (dispatch: thunkType, getState: appStateType) => {
        const userId = getState().Auth.id
        let data = await (ProfileAPI.updateInfo(profile))
        if (data.resultCode === 0) {
            dispatch(getUserId(userId))
        }
    }


export default profileReducer;