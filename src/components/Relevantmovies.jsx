import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieList } from './MovieList';

export const Relevantmovies = ({ genre, selectedMovieId }) => {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/movies?genre_like=${genre.split(" ")[0]}`)
      .then(res => res.json())
      .then(data => {
        const filteredMovies = data.filter(m => m.id !== parseInt(selectedMovieId));
        setMovies(filteredMovies);
        setSelectedMovie(filteredMovies.find(m => m.id === parseInt(selectedMovieId)));
      });
  }, [genre, selectedMovieId]);

  const handleRelatedMovieClick = (id) => {
    setSelectedMovie(movies.find(m => m.id === parseInt(id)));
  };

  return (
    <div>
      <h1>Related movies</h1>
      {movies === null && <h1>Loading.......</h1>}
      {movies && (
        <MovieList
          movies={movies.filter(m => m.id !== selectedMovie?.id)}
          title={"Related Movies"}
          onItemClick={handleRelatedMovieClick}
        />
      )}
      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.description}</p>
          <Link to={`/movies/${selectedMovie.id}`}>View Details</Link>
        </div>
      )}
    </div>
  );
};
