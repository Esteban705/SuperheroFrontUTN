import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen min-w-full bg-gray-100">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={
              <div className="h-screen w-screen flex items-center justify-center">
                <Login />
              </div>
            } />
            <Route path="/register" element={
              <div className="h-screen w-screen flex items-center justify-center">
                <Register />
              </div>
            } />

            {/* Rutas protegidas */}
            <Route path="/" element={
              <ProtectedRoute>
                <div className="h-screen w-screen flex flex-col">

                  <h1>Hola Mundo</h1>

                </div>
              </ProtectedRoute>
            } />

            {/* Ruta por defecto */}
            <Route path="*" element={
              <div className="h-screen w-screen flex items-center justify-center">
                <NotFound />
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
