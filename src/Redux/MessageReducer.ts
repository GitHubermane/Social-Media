import { MessageAPI } from "../API/MessageAPI";
import { MessagesDataType, UserMessageDataType } from "../Types/ReducersTypes";
import { baseThunkType, inferActionsType } from "./ReduxStore";


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

const messageReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case 'message/SEND-MESSAGE': {
            let messageText = action.messageNewText;
            return {
                ...state,
                MessagesData: [
                    ...state.MessagesData,
                    { id: 5, text: messageText },
                ]
            };
        }

        case 'message/SET_DIALOGS': {
            return {
                ...state,
                UserMessageData: action.dialogs
            }
        }

        default:
            return state;
    }
}
type actionsType = inferActionsType<typeof actions>
export const actions = {
    setMessage: (messageNewText: string) => ({ type: 'message/SEND-MESSAGE', messageNewText } as const),
    setDialogs: (dialogs: any) => ({ type: 'message/SET_DIALOGS', dialogs } as const)


}
  
type thunkType = baseThunkType<actionsType>
export const getDialogs = (): thunkType => async (dispatch) => {
    let data = await (MessageAPI.getDialogs())
    dispatch(actions.setDialogs(data))
},
    sendMessage = (userId: number, message: string): thunkType => async (dispatch) => {
        let data = await (MessageAPI.sendMessage(userId, message))
        if (data.resultCode === 0) {
            dispatch(actions.setMessage(message))
        }
    },
    showMessages = (userId: number): thunkType => async (dispatch) => {
        let data = await (MessageAPI.showMessages(userId))
        if (data.resultCode === 0) {
            dispatch(actions.setMessage(data))
        }
    },
    startChatting = (userId: number): thunkType => async (dispatch) => {
        let data = await (MessageAPI.startChatting(userId))
        console.log(data);
    }

export default messageReducer;