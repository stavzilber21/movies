import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from '../redux/actions';

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const movie = useSelector((state) =>
    state.popularMovies.find((movie) => movie.id === parseInt(id))
  ); 

  if (!movie) return <p>Movie not found</p>;

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
        toggleFavorite(); // Toggle favorite status
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, toggleFavorite]);

  return (
    <div style={{ padding: "15px", border: "2px solid gray", margin: "25px" }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <button 
        onClick={toggleFavorite} 
        style={{
          border: 'none', 
          background: 'none', 
          cursor: 'pointer', 
          fontSize: '50px', 
          padding: '4px',
          color: isFavorite ? 'red' : 'grey'
        }}
      >
        {isFavorite ? '♥' : '♡'} 
      </button>
    </div>
  );
};

export default MovieDetails;
