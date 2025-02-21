import { useState, useEffect } from 'react'
import { superheroService } from '../services/superheroService'
import SuperheroModal from '../components/SuperheroModal'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

function SuperheroesList() {
    const [superheroes, setSuperheroes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedHero, setSelectedHero] = useState(null)

    const fetchSuperheroes = async () => {
        try {
            setLoading(true)
            const data = await superheroService.getAll(currentPage)
            setSuperheroes(data.data)
            setTotalPages(Math.ceil(data.pagination.totalItems / 10))
        } catch (err) {
            setError('Error al cargar los superhéroes')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSuperheroes()
    }, [currentPage])

    const handleCreate = () => {
        setSelectedHero(null)
        setIsModalOpen(true)
    }

    const handleEdit = (hero) => {
        setSelectedHero(hero)
        setIsModalOpen(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este superhéroe?')) {
            try {
                await superheroService.delete(id)
                fetchSuperheroes()
            } catch (err) {
                setError('Error al eliminar el superhéroe')
            }
        }
    }

    const handleModalClose = (shouldRefresh) => {
        setIsModalOpen(false)
        if (shouldRefresh) {
            fetchSuperheroes()
        }
    }

    if (loading && superheroes.length === 0) {
        return <div className="text-center py-8">Cargando...</div>
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Superhéroes</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Crear Superhéroe
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {superheroes.map((hero) => (
                    <div key={hero._id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl text-center font-normal mb-6 "> <span className="font-extrabold">Nombre:</span> {hero.name}</h3>
                        <p className="text-gray-600 mb-6 font-normal"> <span className="font-extrabold">Alter Ego:</span> {hero.alterEgo}</p>
                        <div className="flex space-x-2">
                            {hero.powers.map((power, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                                >
                                    {power}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-600 mt-6 font-normal"> <span className="font-extrabold">Descripción:</span> {hero.description}</p>

                        <p className="text-gray-600 mt-6 font-normal"> <span className="font-extrabold">Creador:</span> {hero?.creator?.name}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => handleEdit(hero)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                            >
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(hero._id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div className="mt-6 flex justify-center space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 rounded ${currentPage === index + 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <SuperheroModal
                    hero={selectedHero}
                    onClose={handleModalClose}
                />
            )}
        </div>
    )
}

export default SuperheroesList 