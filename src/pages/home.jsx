import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchNowPlayingMovies } from "../redux/actions";
import Movie from "../components/movie";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [filter, setFilter] = useState("popular"); 
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => {
    if (filter === "popular") return state.popularMovies;
    if (filter === "nowPlaying") return state.nowPlayingMovies;
    if (filter === "favorites") return state.favorites;
  });

  useEffect(() => {
    if (filter === "popular") dispatch(fetchPopularMovies());
    if (filter === "nowPlaying") dispatch(fetchNowPlayingMovies());
  }, [filter, dispatch]);

  //Navigating movies using the keyboard
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      setSelectedMovieIndex((prevIndex) => (prevIndex + 1) % movies.length); 
    } else if (event.key === 'ArrowUp') {
      setSelectedMovieIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    } else if (event.key === 'Enter') {
      const selectedMovie = movies[selectedMovieIndex];
      navigate(`/movie/${selectedMovie.id}`); 
    }
  };


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movies, selectedMovieIndex]);

  return (
    <div>
      <h2>Movies</h2>
      <nav>
        <button onClick={() => setFilter("popular")}>Popular</button>
        <button onClick={() => setFilter("nowPlaying")}>Airing Now</button>
        <button onClick={() => setFilter("favorites")}>My Favorites</button>
      </nav>
      <div>
        {movies.map((movie, index) => (
          <Movie
            key={movie.id}
            movieData={movie}
            isSelected={index === selectedMovieIndex} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
