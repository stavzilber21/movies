import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMovies } from '../redux/actions';
import Movie from './movie';
 

const Movies = () => {
  const allMovies = useSelector((state) => state.allMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  return (
    <div>
      <h2>Movies</h2>
      <div>
        {allMovies.map((movie) =>
        {
            return <Movie key={movie.id} movieData={movie} />
        })}
      </div>
    </div>
  );
};

export default Movies;
