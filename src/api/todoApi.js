import { ENDPOINT, fetcher } from "@/api"

export const createTodoApi = async (payload) => {
     return fetcher(ENDPOINT.TODO.CREATE, {
        method: 'POST',
        body: payload,
     })
}

export const getListTodoApi = async () => {
    return fetcher(ENDPOINT.TODO.LIST)
}

export const getDetailTodoByIdApi = async (id) => {
    return fetcher(ENDPOINT.TODO.DETAIL(id))
}

export const updateTodoApi = async (id, payload) => {
    return fetcher(ENDPOINT.TODO.UPDATE(id), {
        method: 'PUT',
        body: payload
    })
}

export const deleteTodoApi = async (id) => {
    return fetcher(ENDPOINT.TODO.DELETE(id), {method: 'DELETE'})
}