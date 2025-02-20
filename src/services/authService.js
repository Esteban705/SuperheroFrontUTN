import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const authService = {
    async login(credentials) {
        const response = await axios.post(`${API_URL}/auth/login`, credentials)
        return response.data
    },

    async register(userData) {
        const response = await axios.post(`${API_URL}/auth/register`, userData)
        return response.data
    }
} 