import React from 'react';

export const Movie = ({ movieData, isSelected }) => {
  //Change the color of the movie if it is selected.
  const style = isSelected ? { border: '3px solid blue', backgroundColor: '#f0f0f0' } : {}; 

  return (
    <div 
      style={{border: '3px solid pink' ,width: '200px', margin: '5px', padding: '10px', ...style }} 
    >
      <div>{movieData.title}</div>
    </div>
  );
};

export default Movie;
