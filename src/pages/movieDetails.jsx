import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from '../redux/actions';

export const MovieDetails = () => {
  const { id } = useParams();
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
