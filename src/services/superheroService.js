import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

// Configurar el interceptor para incluir el token
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const superheroService = {
    async getAll(page = 1, limit = 10) {
        const response = await axios.get(`${API_URL}/superheros?page=${page}&limit=${limit}`)
        return response.data
    },

    async getById(id) {
        const response = await axios.get(`${API_URL}/superheros/${id}`)
        return response.data
    },

    async create(superheroData) {
        const response = await axios.post(`${API_URL}/superheros`, superheroData)
        return response.data
    },

    async update(id, superheroData) {
        const response = await axios.put(`${API_URL}/superheros/${id}`, superheroData)
        return response.data
    },

    async delete(id) {
        await axios.delete(`${API_URL}/superheros/${id}`)
    }
} 