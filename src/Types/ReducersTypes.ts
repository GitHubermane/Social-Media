export type UserMessageDataType = {
    id: number,
    name: string
}
export type MessagesDataType = {
    id: number,
    text: string
}

export type PostDataType = {
    id: number,
    likes: number | null,
    text: string
}
export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
    aboutMe?: string
}
export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null
    large: string | null
}
export type UsersDataType = {
    id: number,
    name: string,
    status: string,
    photos: photosType
    followed: boolean
}
export type setUserDataActionDataType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuthorised?: boolean,
}
export type filterType = {
    term: string,
    friends: boolean | null
}

