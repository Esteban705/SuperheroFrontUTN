import { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [token, setToken] = useState(() => localStorage.getItem('token'))

    const login = (userData, authToken) => {
        console.log(userData, authToken)
        setUser(userData)
        setToken(authToken)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', authToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) 