import { photosType, profileType } from "../Types/ReducersTypes"
import { instance, responseType } from "./api"

type savePhotoResponseType = {
    photos: photosType
}
export const ProfileAPI = {
    getUserId(userId: number) {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data)
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<responseType>(`profile/status`,
            { status })
            .then(response => response.data)
    },

    updatePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<responseType<savePhotoResponseType>>(`profile/photo`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(response => response.data)
    },

    updateInfo(info: profileType) {
        return instance.put<responseType>(`profile`, info)
            .then(response => response.data)
    }

}
