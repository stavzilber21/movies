import React from 'react'

export const Movie = ({movieData}) => {
  return (
    <div style={{ width: '200px', border: 'solid 2px pink', margin: '5px', padding: '10px' }}>
        <p>Name: {movieData.title}</p>
        {/* <img src={movieData.image} alt={movieData.name} style={{ width: "100%" }} /> */}
    </div>
  )
}
export default Movie