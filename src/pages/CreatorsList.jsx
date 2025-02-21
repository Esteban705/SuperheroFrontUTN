import { useState, useEffect } from 'react'
import { creatorService } from '../services/creatorService'
import CreatorModal from '../components/CreatorModal'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

function CreatorsList() {
    const [creators, setCreators] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCreator, setSelectedCreator] = useState(null)

    const fetchCreators = async () => {
        try {
            setLoading(true)
            const data = await creatorService.getAll(currentPage)
            setCreators(data.data)
            setTotalPages(Math.ceil(data.pagination.totalItems / 10))
        } catch (err) {
            setError('Error al cargar los creadores')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCreators()
    }, [currentPage])

    const handleCreate = () => {
        setSelectedCreator(null)
        setIsModalOpen(true)
    }

    const handleEdit = (creator) => {
        setSelectedCreator(creator)
        setIsModalOpen(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este creador?')) {
            try {
                await creatorService.delete(id)
                fetchCreators()
            } catch (err) {
                setError('Error al eliminar el creador')
            }
        }
    }

    const handleModalClose = (shouldRefresh) => {
        setIsModalOpen(false)
        if (shouldRefresh) {
            fetchCreators()
        }
    }

    if (loading && creators.length === 0) {
        return <div className="text-center py-8">Cargando...</div>
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center mb-6">Creadores</h1>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold"></h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Nuevo Creador
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {creators.map((creator) => (
                    <div key={creator._id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-center mb-6">{creator.name}</h3>
                        <p className="text-gray-600 mb-2">{creator.email}</p>
                        <p className="text-gray-600 mb-2"> <span className="font-extrabold">Compañía:</span> {creator.company}</p>
                        <p className="text-gray-600"> <span className="font-extrabold">Experiencia:</span> {creator.yearsOfExperience} años</p>

                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => handleEdit(creator)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                            >
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(creator._id)}
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
                <CreatorModal
                    creator={selectedCreator}
                    onClose={handleModalClose}
                />
            )}
        </div>
    )
}

export default CreatorsList 