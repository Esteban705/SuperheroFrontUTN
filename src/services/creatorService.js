import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const creatorService = {
    async getAll(page = 1, limit = 10) {
        const response = await axios.get(`${API_URL}/creators?page=${page}&limit=${limit}`)
        return response.data
    },

    async getById(id) {
        const response = await axios.get(`${API_URL}/creators/${id}`)
        return response.data
    },

    async create(creatorData) {
        const response = await axios.post(`${API_URL}/creators`, creatorData)
        return response.data
    },

    async update(id, creatorData) {
        const response = await axios.put(`${API_URL}/creators/${id}`, creatorData)
        return response.data
    },

    async delete(id) {
        await axios.delete(`${API_URL}/creators/${id}`)
    },

    async getAllWithoutPagination() {
        const response = await axios.get(`${API_URL}/creators?limit=1000`)
        return response.data.data
    }
} 