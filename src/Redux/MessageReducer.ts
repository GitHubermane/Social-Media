import { MessageAPI } from "../API/api";
import { MessagesDataType, UserMessageDataType } from "../Types/ReducersTypes";

const SET_MESSAGE = 'message/SEND-MESSAGE',
    SET_DIALOGS = 'message/SET_DIALOGS'

type initialStateType = typeof initialState

let initialState = {
    UserMessageData: [
        { id: 1, name: "Kevin" },
        { id: 2, name: "John" },
        { id: 3, name: "Lara" },
        { id: 4, name: "Greg" },
        { id: 5, name: "Brandon" },
    ] as Array<UserMessageDataType>,
    MessagesData: [
        { id: 1, text: "Let's go" },
        { id: 2, text: "Let's go" },
        { id: 3, text: "Let's go" },
        { id: 4, text: "Let's go" },
        { id: 5, text: "Let's go" },
    ] as Array<MessagesDataType>
}

let idCount = 5
const messageReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {

        case SET_MESSAGE: {
            let messageText = action.messageNewText;
            idCount++;
            return {
                ...state,
                MessagesData: [
                    ...state.MessagesData,
                    { id: idCount, text: messageText },
                ]
            };
        }

        case SET_DIALOGS: {
            return {
                ...state,
                UserMessageData: action.dialogs
            }
        }

        default:
            return state;
    }
}

type setMessageActionType = {
    type: typeof SET_MESSAGE,
    messageNewText: string
}
type setDialogsActionType = {
    type: typeof SET_DIALOGS,
    dialogs: any
}
export const setMessage = (messageNewText): setMessageActionType => ({ type: SET_MESSAGE, messageNewText }),
    setDialogs = (dialogs): setDialogsActionType => ({ type: SET_DIALOGS, dialogs })

export const getDialogs = () => (dispatch) => {
    MessageAPI.getDialogs()
        .then(data => {
            dispatch(setDialogs(data))
        })
},
    sendMessage = (userId, message) => (dispatch) => {
        MessageAPI.sendMessage(userId, message)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setMessage(message))
                }
            })
    },
    showMessages = (userId) => (dispatch) => {
        MessageAPI.showMessages(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setMessage(data))
                }
            })
    },
    startChatting = (userId) => (dispatch) => {
        MessageAPI.startChatting(userId)
            .then(data => {
                console.log(data);
            })
    }

export default messageReducer;