import { useState, useEffect } from 'react'
import { superheroService } from '../services/superheroService'
import { creatorService } from '../services/creatorService'

function SuperheroModal({ hero, onClose }) {
    const [creators, setCreators] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        alterEgo: '',
        powers: [],
        description: '',
        creator: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (hero) {
            setFormData({
                name: hero.name,
                alterEgo: hero.alterEgo,
                powers: hero.powers,
                description: hero.description,
                creator: hero.creator?._id
            })
        }
    }, [hero])

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const data = await creatorService.getAllWithoutPagination()
                setCreators(data)
            } catch (err) {
                setError('Error al cargar los creadores')
            }
        }
        fetchCreators()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePowersChange = (e) => {
        const powers = e.target.value.split(',').map(power => power.trim())
        setFormData(prev => ({
            ...prev,
            powers
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (hero) {
                await superheroService.update(hero._id, formData)
            } else {
                await superheroService.create(formData)
            }
            onClose(true)
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el superhéroe')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {hero ? 'Editar' : 'Crear'} Superhéroe
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Alter Ego</label>
                        <input
                            type="text"
                            name="alterEgo"
                            value={formData.alterEgo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Poderes (separados por comas)</label>
                        <input
                            type="text"
                            value={formData.powers.join(', ')}
                            onChange={handlePowersChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="3"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Creador</label>
                        <select
                            name="creator"
                            value={formData.creator}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Selecciona un creador</option>
                            {creators.map((creator) => (
                                <option key={creator._id} value={creator._id}>
                                    {creator.name} - {creator.company}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SuperheroModal 