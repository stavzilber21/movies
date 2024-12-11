import React from 'react';
import "../UI/styles.css"

export const Movie = ({ movieData, isSelected }) => {
  //Change the color of the movie if it is selected.
  const style = isSelected ? { border: '3px solid blue', backgroundColor: '#f0f0f0' } : {}; 

  return (
    <div className="movie-card" style={style}>
      <div>{movieData.title}</div>
    </div>
  );
};

export default Movie;
