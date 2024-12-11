import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from '../redux/actions';
import "../UI/styles.css"

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const movie = useSelector((state) =>
    state.popularMovies.find((movie) => movie.id === parseInt(id))
  ); 

  if (!movie) return <p>Movie not found</p>;

  //Checking in Redux if the movie is in favorites
  const favorites = useSelector((state) => state.favorites);

  const index = favorites.findIndex((favMovie) => favMovie.id === movie.id);
  const isFavorite = index !== -1; 

  // Add / Remove Movie to Favorites
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  // Handle keyboard events (ESCAPE and F for favorite)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate(-1); // Navigate back
      } else if (event.key === 'F') {
        //Pressing f + shift will add / remove the movie from favorites.
        toggleFavorite(); // Toggle favorite status
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, toggleFavorite]);

  return (
    <div className="movie-details-container">
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
    />
    <div className="movie-details-content">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <button
        onClick={toggleFavorite}
        className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </div>
  </div>
  );
};

export default MovieDetails;
