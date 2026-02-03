import { ENDPOINT, fetcher } from "@/api"

export const getProfileApi = async () => {
    return fetcher(ENDPOINT.USER.ME);
}

export const getDetailApi = async () => {
    return fetcher(ENDPOINT.USER.DETAIL);
}

export const updateProfileApi = async (payload) => {
    return fetcher(ENDPOINT.USER.EDIT_PROFILE, {
        method: 'PATCH',
        body: payload
    })
}

export const updatePasswordApi = async (payload) => {
    return fetcher(ENDPOINT.USER.EDIT_PASSWORD, {
        method: 'PATCH',
        body: payload
    })
}

export const updatePreferenceApi = async (payload) => {
    return fetcher(ENDPOINT.USER.EDIT_PREFERENCE, {
        method: 'PATCH',
        body: payload
    })
}