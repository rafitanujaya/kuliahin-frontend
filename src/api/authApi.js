import { ENDPOINT, fetcher } from "@/api"

export const loginApi = async (payload) => {
    return fetcher(ENDPOINT.AUTH.LOGIN, {
        method: 'POST',
        body: payload,
        auth: false
    })
}

export const registerApi = async (payload) => {
    return fetcher(ENDPOINT.AUTH.REGISTER, {
        method: 'POST',
        body: payload,
        auth: false
    })
}

export const verifyApi = async () => {
    return fetcher(ENDPOINT.AUTH.VERIFY)
}