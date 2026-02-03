import { ENDPOINT, fetcher } from "@/api"

export const createSubscribeApi = async (payload) => {
    console.log(payload);
    return fetcher(ENDPOINT.SUBSCRIBE.ADD, {
        method: 'POST',
        body: payload
    })
}

export const testSubscribeApi = async () => {
    return fetcher(ENDPOINT.SUBSCRIBE.TEST)
}