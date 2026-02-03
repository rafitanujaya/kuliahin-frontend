import { ENDPOINT, fetcher } from "@/api"

export const getListCourseApi = async () => {
    return fetcher(ENDPOINT.COURSE.LIST)
}