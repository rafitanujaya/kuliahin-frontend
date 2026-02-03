import { ENDPOINT, fetcher } from "@/api"

export const createTaskApi = async (payload) => {
    return fetcher(ENDPOINT.TASK.CREATE, {
        method: 'POST',
        body: payload
    })
}

export const getListTaskApi = async () => {
    return fetcher(ENDPOINT.TASK.LIST)
}

export const updateTaskApi = async (id, payload) => {
    return fetcher(ENDPOINT.TASK.UPDATE(id), {
        method: 'PUT',
        body: payload
    })
}

export const deleteTaskApi = async (id) => {
    return fetcher(ENDPOINT.TASK.DELETE(id), {
        method: 'DELETE'
    })
}

export const getDeadlineTaskApi = async () => {
    return fetcher(ENDPOINT.TASK.DEADLINE)
}