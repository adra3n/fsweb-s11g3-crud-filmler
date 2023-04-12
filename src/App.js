import React, { useEffect, useState } from 'react'

import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import MovieList from './components/MovieList'
import Movie from './components/Movie'

import MovieHeader from './components/MovieHeader'

import FavoriteMovieList from './components/FavoriteMovieList'
import EditMovieForm from './components/EditMovieForm'

import axios from 'axios'
import AddMovieForm from './components/AddMovieForm'

const App = (props) => {
  const [movies, setMovies] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])

  const history = useHistory()

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/movies')
      .then((res) => {
        setMovies(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then((response) => {
        console.log(response.data)
        setMovies(response.data)
        history.push('/movies')
      })
      .catch((error) => console.log(error))
  }

  const addToFavorites = (movie) => {
    const isMovieFavorited = favoriteMovies.find((item) => item.id === movie.id)
    if (!isMovieFavorited) {
      setFavoriteMovies([...favoriteMovies, movie])
    }
  }

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>
            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie
                deleteMovie={deleteMovie}
                addToFavorites={addToFavorites}
              />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App
