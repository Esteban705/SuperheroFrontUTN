import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import SuperheroesList from './pages/SuperheroesList'
import CreatorsList from './pages/CreatorsList'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <Router basename="/">
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
                  <Navbar />

                </div>
              </ProtectedRoute>
            } />

            <Route path="/superheroes" element={
              <ProtectedRoute>
                <div className="h-screen w-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1 w-full flex items-center justify-center">
                    <SuperheroesList />
                  </main>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/creators" element={
              <ProtectedRoute>
                <div className="h-screen w-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1 w-full flex items-center justify-center">
                    <CreatorsList />
                  </main>
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
