import { ENV } from "@/config";

export const ENDPOINT = {
    AUTH: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        VERIFY: 'auth/verify',
    },
    USER: {
        ME: 'users/me',
        DETAIL: 'users/detail',
        EDIT_PROFILE: 'users/profile',
        EDIT_PASSWORD: 'users/password',
        EDIT_PREFERENCE: 'users/preferences'
    },
    LEARNING_ROOM: {
        CREATE: 'learning-room',
        LIST: 'learning-room',
        DETAIL: (id) => `learning-room/${id}`,
        UPDATE: (id) => `learning-room/${id}`,
        DELETE: (id) => `learning-room/${id}`,
        CREATE_CONTENT: (id) => `learning-room/${id}/content`,
        DELETE_CONTENT: (id, contentId) => `learning-room/${id}/content/${contentId}`,
        GET_LIST_CONTENT: (id) => `learning-room/${id}/content`,
        AI_ANALYSIS: (id) => `learning-room/${id}/ai-analysis`
    },
    COURSE: {
        LIST: 'courses'
    },
    TASK: {
        CREATE: 'tasks',
        LIST: 'tasks',
        DETAIL: (id) => `tasks/${id}`,
        UPDATE: (id) => `tasks/${id}`,
        DELETE: (id) => `tasks/${id}`,
        DEADLINE: 'tasks/deadlines'
    },
    TODO: {
        CREATE: 'todos',
        LIST: 'todos',
        DETAIL: (id) => `todos/${id}`,
        UPDATE: (id) => `todos/${id}`,
        DELETE: (id) => `todos/${id}`
    },
    SCHEDULE: {
        CREATE: 'schedules',
        LIST: 'schedules',
        DETAIL: (id) => `schedules/${id}`,
        UPDATE: (id) => `schedules/${id}`,
        DELETE: (id) => `schedules/${id}`,
        TODAY: 'schedules/today'
    },
    SUBSCRIBE: {
        ADD: 'subscribes',
        TEST: 'subscribes/test'
    }

}

export const fetcher = async (path, options = {}) => {
    const {
        method = 'GET',
        body,
        headers = {},
        auth = true
    } = options

    const token = localStorage.getItem('token');

    const isFormData = body instanceof FormData

    const res = await fetch(`${ENV.API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(auth && token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined
  })

    const contentType = res.headers.get('content-type');
    const data = contentType.includes('application/json') ? await res.json() : null
    if(!res.ok) {
        throw {
            status: res.status,
            message: data?.message || 'Request Failed',
            data
        }
    }

    return data
}