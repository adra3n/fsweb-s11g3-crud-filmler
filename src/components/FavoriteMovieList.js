import React from 'react'
import { Link } from 'react-router-dom'

const FavoriteMovieList = (props) => {
  const { favoriteMovies } = props

  return (
    <div className="flex-1 sm:max-w-[250px] p-5 pr-5 bg-white shadow rounded-md">
      <h5 className="font-bold">Favori Filmler</h5>
      <div className="pt-3 text-sm">
        {favoriteMovies.map((movie) => (
          <Link
            key={movie.id}
            className="py-1 flex gap-2 justify-between"
            to={`/movies/${movie.id}`}
          >
            {movie.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FavoriteMovieList
