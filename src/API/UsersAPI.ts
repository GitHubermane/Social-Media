import { UsersDataType } from "../Types/ReducersTypes"
import { instance, responseType } from "./api"

type userResponseType = {
    items: Array<UsersDataType>
    totalCount: number
    error: string
}

export const UsersAPI = {
    getUsers(currentPageNumber: number, usersCount: number, term: string, friend: boolean) {
        return instance.get<userResponseType>(`users?page=${currentPageNumber}&count=${usersCount}${term?'&term=' + term: ''}&friend=${friend}`)
            .then(response => response.data)
    },

    getUnfollow(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data) as Promise<responseType>
    },

    getFollow(id: number) {
        return instance.post<responseType>(`follow/${id}`)
            .then(response => response.data)
    },
}
