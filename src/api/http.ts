import axios from "axios"

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
})

export const getApiData = async (url: string) => {
    try {
        const response = await http.get(url)
        return response.data

    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}