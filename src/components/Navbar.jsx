import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { token, logout } = useAuth()

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/superheroes" className="text-xl font-bold text-white">
                        Superhéroes App
                    </Link>

                    <div className="flex space-x-4">
                        <Link to="/superheroes" className="hover:text-blue-200 text-white">
                            Superhéroes
                        </Link>
                        <Link to="/creators" className="hover:text-blue-200 text-white">
                            Creadores
                        </Link>
                        {token ? (
                            <button
                                onClick={logout}
                                className="hover:text-blue-200 rounded-lg px-4 py-2 text-white bg-red-600"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <div className="flex space-x-4">
                                <Link to="/login" className="hover:text-blue-200 text-white">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="hover:text-blue-200 text-white">
                                    Registrarse
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar 