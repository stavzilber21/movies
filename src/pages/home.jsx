import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchNowPlayingMovies } from "../redux/actions";
import Movie from "../components/movie";
import { useNavigate } from 'react-router-dom';
import "../UI/styles.css"

const Home = () => {
  const [filter, setFilter] = useState("popular");
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0); 
  const [focusOnFilters, setFocusOnFilters] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // For bar navigation using arrows
  const filterOptions = ["popular", "nowPlaying", "favorites"];
  const filterLabels = ["Popular", "Airing Now", "My Favorites"];

  const movies = useSelector((state) => {
    if (filter === "popular") return state.popularMovies;
    if (filter === "nowPlaying") return state.nowPlayingMovies;
    if (filter === "favorites") return state.favorites;
  });

  useEffect(() => {
    if (filter === "popular") dispatch(fetchPopularMovies());
    if (filter === "nowPlaying") dispatch(fetchNowPlayingMovies());
  }, [filter, dispatch]);

  const handleKeyDown = (event) => {
    //Filter bar navigation
    if (focusOnFilters) {
      if (event.key === 'ArrowRight') {
        setSelectedFilterIndex((prevIndex) => (prevIndex + 1) % filterOptions.length);
      } else if (event.key === 'ArrowLeft') {
        setSelectedFilterIndex((prevIndex) => (prevIndex - 1 + filterOptions.length) % filterOptions.length);
      } else if (event.key === 'Enter') {
        setFilter(filterOptions[selectedFilterIndex]);
        // Move focus to the movie list
        setFocusOnFilters(false); 
        setSelectedMovieIndex(0); 
      }
    } else {
      // Navigating the movie list
      if (event.key === 'ArrowDown') {
        setSelectedMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
      } else if (event.key === 'ArrowUp') {
        setSelectedMovieIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
      } else if (event.key === 'Enter') {
        const selectedMovie = movies[selectedMovieIndex];
        navigate(`/movie/${selectedMovie.id}`);
      } else if (event.key === 'Escape') {
        // Back to the filter bar
        setFocusOnFilters(true); 
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movies, selectedMovieIndex, selectedFilterIndex, focusOnFilters]);

  return (
    <div>
      <h2>Movies</h2>
      <nav className="navbar">
        {filterLabels.map((label, index) => (
          <button
            key={index}
            className={index === selectedFilterIndex ? "selected" : ""}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="movies-container">
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
