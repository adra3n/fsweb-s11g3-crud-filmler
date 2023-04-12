import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import axios from 'axios'

const Movie = (props) => {
  const { addToFavorites, deleteMovie } = props

  const [movie, setMovie] = useState('')

  const { id } = useParams()
  const { push } = useHistory()

  const handleDelete = (id) => {
    deleteMovie(id)
    push('/movies')
  }

  const handleAddFavorite = (movie) => {
    addToFavorites(movie)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }, [id])

  return (
    <div className="bg-white rounded-md shadow flex-1">
      <div className="p-5 pb-3 border-b border-zinc-200">
        <h4 className="text-xl font-bold">{movie.title} Detayları</h4>
      </div>
      <div className="px-5 py-3">
        <div className="py-1 flex">
          <div className="view-label">İsim</div>
          <div className="flex-1">{movie.title}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Yönetmen</div>
          <div className="flex-1">{movie.director}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Tür</div>
          <div className="flex-1">{movie.genre}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Metascore</div>
          <div className="flex-1">{movie.metascore}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Açıklama</div>
          <p className="flex-1">{movie.description}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-zinc-200 flex justify-end gap-2">
        <button
          onClick={() => handleAddFavorite(movie)}
          className="myButton bg-blue-600 hover:bg-blue-500 "
        >
          Favorilere ekle
        </button>
        <Link
          to={`/movies/edit/${movie.id}`}
          className="myButton bg-blue-600 hover:bg-blue-500"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(movie.id)}
          type="button"
          className="myButton bg-red-600 hover:bg-red-500"
        >
          Sil
        </button>
      </div>
    </div>
  )
}

export default Movie
