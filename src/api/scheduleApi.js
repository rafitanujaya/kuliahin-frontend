import { ENDPOINT, fetcher } from "@/api"

export const getListScheduleApi = async () => {
    return fetcher(ENDPOINT.SCHEDULE.LIST)
}

export const createScheduleApi = async (payload) => {
    return fetcher(ENDPOINT.SCHEDULE.CREATE, {
        method: 'POST',
        body: payload
    })
}

export const updateScheduleApi = async (id, payload) => {
    return fetcher(ENDPOINT.SCHEDULE.UPDATE(id), {
        method: 'PUT',
        body: payload
    })
}

export const deleteScheduleApi = async (id) => {
    return fetcher(ENDPOINT.SCHEDULE.DELETE(id), {
        method: 'DELETE'
    })
}

export const getScheduleTodayApi = async () => {
    return fetcher(ENDPOINT.SCHEDULE.TODAY)
}