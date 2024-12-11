import React from 'react'
import { useNavigate } from 'react-router-dom';


export const Movie = ({movieData}) => {
    const nav = useNavigate()

    const selectMovie = (id) => {
        nav(`/movie/${id}`);
      };

      
  return (
    <div style={{ width: '200px', border: 'solid 2px pink', margin: '5px', padding: '10px' }}>
             <div onClick={() => selectMovie(movieData.id)}>{movieData.title}</div>
        
    </div>
  )
}
export default Movie