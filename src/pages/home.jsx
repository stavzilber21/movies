import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchNowPlayingMovies } from "../redux/actions";
import Movie from "../components/movie";
import { useNavigate } from 'react-router-dom';
import "../UI/styles.css";

const Home = () => {
  const [filter, setFilter] = useState("popular");
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0); 
  const [focusOnFilters, setFocusOnFilters] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Error state from Redux
  const error = useSelector((state) => state.error); 
  const popularMovies = useSelector((state) => state.popularMovies);
  const nowPlayingMovies = useSelector((state) => state.nowPlayingMovies);
  const favorites = useSelector((state) => state.favorites);

  // Check if popular and nowPlaying movies are already loaded
  const popularMoviesLoaded = useSelector((state) => state.popularMovies.length > 0);
  const nowPlayingMoviesLoaded = useSelector((state) => state.nowPlayingMovies.length > 0);

  // Memoizing filtered movies to avoid recalculating on each render
  const filteredMovies = useMemo(() => {
    if (filter === "popular") return popularMovies;
    if (filter === "nowPlaying") return nowPlayingMovies;
    if (filter === "favorites") return favorites;
  }, [filter, popularMovies, nowPlayingMovies, favorites]);

  // Fetch movies only if they haven't been loaded yet
  useEffect(() => {
    if (filter === "popular" && !popularMoviesLoaded) {
      dispatch(fetchPopularMovies());
    }
    if (filter === "nowPlaying" && !nowPlayingMoviesLoaded) {
      dispatch(fetchNowPlayingMovies());
    }
  }, [filter, dispatch, popularMoviesLoaded, nowPlayingMoviesLoaded]);

  // For bar navigation using arrows
  const filterOptions = ["popular", "nowPlaying", "favorites"];
  const filterLabels = ["Popular", "Airing Now", "My Favorites"];

  // Handle keyboard events for navigation
  const handleKeyDown = useCallback((event) => {
    // Filter bar navigation
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
        setSelectedMovieIndex((prevIndex) => (prevIndex + 1) % filteredMovies.length);
      } else if (event.key === 'ArrowUp') {
        setSelectedMovieIndex((prevIndex) => (prevIndex - 1 + filteredMovies.length) % filteredMovies.length);
      } else if (event.key === 'Enter') {
        const selectedMovie = filteredMovies[selectedMovieIndex];
        navigate(`/movie/${selectedMovie.id}`);
      } else if (event.key === 'Escape') {
        // Back to the filter bar
        setFocusOnFilters(true); 
      }
    }
  }, [focusOnFilters, filteredMovies, selectedMovieIndex, selectedFilterIndex, filterOptions, navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <h2>Movies</h2>
      {error && <div className="error-message">{error}</div>}
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
        {filteredMovies.map((movie, index) => (
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
