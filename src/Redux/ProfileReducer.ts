import { ProfileAPI } from "../API/ProfileAPI";
import { photosType, PostDataType, profileType } from "../Types/ReducersTypes";
import { baseThunkType, inferActionsType } from "./ReduxStore";

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

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'profile/ADD_NEW_POST': {
            let newPost = {
                id: 5,
                likes: "23",
                text: action.postNewText
            };
            return {
                ...state,
                PostData: [
                    ...state.PostData,
                    newPost,
                ],
                postNewText: '',
            };
        }

        case 'profile/SET_PROFILE_PAGE': {
            return {
                ...state,
                profile: action.profile
            };
        }

        case 'profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }

        case 'profile/SET_PHOTO': {
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

type actionsType = inferActionsType<typeof actions>
export const actions = {
    addPost: (postNewText: string) => ({ type: 'profile/ADD_NEW_POST', postNewText } as const),
    setProfile: (profile: profileType) => ({ type: 'profile/SET_PROFILE_PAGE', profile } as const),
    setStatus: (status: string) => ({ type: 'profile/SET_STATUS', status } as const),
    setPhoto: (photo: photosType) => ({ type: 'profile/SET_PHOTO', photo } as const)
}

type thunkType = baseThunkType<actionsType>
export const getUserId = (userId: number): thunkType => async (dispatch) => {
    let data = await (ProfileAPI.getUserId(userId))
    dispatch(actions.setProfile(data))
},
    getUserStatus = (userId: number): thunkType => async (dispatch) => {
        let data = await (ProfileAPI.getStatus(userId))
        dispatch(actions.setStatus(data))
    },
    updateUserStatus = (status: string): thunkType => async (dispatch) => {
        let data = await (ProfileAPI.updateStatus(status))
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    },
    savePhoto = (photo: File): thunkType => async (dispatch) => {
        let data = await (ProfileAPI.updatePhoto(photo))
        if (data.resultCode === 0) {
            dispatch(actions.setPhoto(data.data.photos))
        }
    },
    updateInfo = (profile: profileType): thunkType => async (dispatch, getState) => {
        const userId = getState().Auth.id
        let data = await (ProfileAPI.updateInfo(profile))
        if (data.resultCode === 0 && userId) {
            dispatch(getUserId(userId))
        }
    }


export default profileReducer;