import React from 'react';
import "../UI/styles.css"

export const Movie = React.memo(({ movieData, isSelected }) => {
  //Change the color of the movie if it is selected.
  const style = isSelected ? { border: '3px solid blue', backgroundColor: '#f0f0f0' } : {}; 

  return (
    <div className="movie-card" style={style}>
      <div>{movieData.title}</div>
      <img
      src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
      alt={movieData.title}
    />
    </div>
  );
});

export default Movie;
