import { ProfileAPI } from "../API/api";

const ADD_NEW_POST = 'profile/ADD_NEW_POST',
    SET_PROFILE_PAGE = 'profile/SET_PROFILE_PAGE',
    SET_STATUS = 'profile/SET_STATUS',
    SET_PHOTO = 'profile/SET_PHOTO'

let initialState = {
    PostData: [
        { id: 1, likes: "23", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, atque!" },
        { id: 2, likes: "10", text: "Lorem ipsum dolor, sit amet  elit. Hic, atque!" },
        { id: 3, likes: "53", text: "Lorem ipsum 2, sit amet 4 elit. Hic, atque!" },
    ],
    profile: null,
    status: '',
}
let idCount = 4;
const profileReducer = (state = initialState, action) => {
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
                }
            };
        }
        default:
            return state;
    }
}

export const addPost = (postNewText) => ({ type: ADD_NEW_POST, postNewText }),
    setProfile = (profile) => ({ type: SET_PROFILE_PAGE, profile }),
    setStatus = (status) => ({ type: SET_STATUS, status }),
    setPhoto = (photo) => ({ type: SET_PHOTO, photo })

export const getUserId = (userId) => (dispatch) => {
    ProfileAPI.getUserId(userId)
        .then(data => {
            dispatch(setProfile(data))
        })
},
    getUserStatus = (userId) => (dispatch) => {
        ProfileAPI.getStatus(userId)
            .then(data => {
                dispatch(setStatus(data))
            })
    },
    updateUserStatus = (status) => (dispatch) => {
        ProfileAPI.updateStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    },
    savePhoto = (photo) => (dispatch) => {
        ProfileAPI.updatePhoto(photo)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setPhoto(data.data.photos))
                }
            })
    },
    updateInfo = (profile) => (dispatch, getState) => {
        const userId = getState().Auth.id
        ProfileAPI.updateInfo(profile)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getUserId(userId))
                }
            })
    }


export default profileReducer;