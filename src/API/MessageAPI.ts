import { instance } from "./api"

export const MessageAPI = {

    getDialogs() {
        return instance.get<any>(`dialogs`)
            .then(response => response.data)
    },

    startChatting(userId: number) {
        return instance.put<any>(`dialogs/${userId}`,
            { userId })
            .then(response => response.data)
    },

    showMessages(userId: number) {
        return instance.get<any>(`dialogs/${userId}/messages`)
            .then(response => response.data)
    },

    sendMessage(userId: number, message: string) {
        return instance.post<any>(`dialogs/${userId}/messages`,
            message)
            .then(response => response.data)

    },

}