import { ENDPOINT, fetcher } from "@/api"

export const getListLearningApi = async () => {
    return fetcher(ENDPOINT.LEARNING_ROOM.LIST)
}

export const createLearningApi = async (payload) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.CREATE, {
        method: 'POST',
        body: payload
    })
}

export const updateLearningApi = async (id, payload) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.UPDATE(id), {
        method: 'PUT',
        body: payload
    })
}

export const deleteLearningApi = async (id) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.DELETE(id), {
        method: 'DELETE'
    })
}

export const getDetailLearningApi = async (id) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.DETAIL(id))
}

export const getListContentLearningApi = async (id) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.GET_LIST_CONTENT(id));
}

export const createContentLearningApi = async (id, formData) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.CREATE_CONTENT(id), {
        method: 'POST',
        body: formData
    })
}

export const deleteContentLearningApi = async (id, contentId) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.DELETE_CONTENT(id, contentId), {
        method: 'DELETE'
    })
}

export const generateAnalysisLearningApi = async (id) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.AI_ANALYSIS(id), {
        method: 'POST'
    })
}

export const getGenerateAnalysisLearningApi = async (id) => {
    return fetcher(ENDPOINT.LEARNING_ROOM.AI_ANALYSIS(id))
}