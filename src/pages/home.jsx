import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchNowPlayingMovies } from "../redux/actions";
import Movie from "../components/movie";
import { useNavigate } from 'react-router-dom';
import "../UI/styles.css";

const filterOptions = ["popular", "nowPlaying", "favorites"];
const filterLabels = ["Popular", "Airing Now", "My Favorites"];

const Home = () => {
  const [filter, setFilter] = useState("popular");
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0); 
  const [focusOnFilters, setFocusOnFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.error);
  const popularMovies = useSelector((state) => state.popularMovies);
  const nowPlayingMovies = useSelector((state) => state.nowPlayingMovies);
  const favorites = useSelector((state) => state.favorites);


  const filteredMovies = useMemo(() => {
    if (filter === "popular") return popularMovies;
    if (filter === "nowPlaying") return nowPlayingMovies;
    if (filter === "favorites") return favorites;
    return [];
  }, [filter, popularMovies, nowPlayingMovies, favorites]);

  useEffect(() => {
    if (filter === "popular") {
      dispatch(fetchPopularMovies(1));
    }
    if (filter === "nowPlaying") {
      dispatch(fetchNowPlayingMovies());
    }
  }, [filter, dispatch]);

  //Load another page of movies
  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      if (filter === "popular") {
        dispatch(fetchPopularMovies(nextPage)); 
      } else if (filter === "nowPlaying") {
        dispatch(fetchNowPlayingMovies(nextPage)); 
      }
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  

  const handleKeyDown = useCallback((event) => {
    //Adapt to screen size
    const moviesPerRow = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 2 : 1;
    //Navigate filters using the arrows
    if (focusOnFilters) {
      if (event.key === 'ArrowRight') {
        setSelectedFilterIndex((prevIndex) => (prevIndex + 1) % filterOptions.length);
      } else if (event.key === 'ArrowLeft') {
        setSelectedFilterIndex((prevIndex) => (prevIndex - 1 + filterOptions.length) % filterOptions.length);
      } else if (event.key === 'Enter') {
        setFilter(filterOptions[selectedFilterIndex]);
        setFocusOnFilters(false);
        setSelectedMovieIndex(0);
      }
    } else {
      const totalMovies = filteredMovies.length;
      // Navigate movies using the arrows - right \ left \ up \ down
      if (event.key === 'ArrowRight') {
        setSelectedMovieIndex((prevIndex) => (prevIndex + 1) % totalMovies);
      } else if (event.key === 'ArrowLeft') {
        setSelectedMovieIndex((prevIndex) => (prevIndex - 1 + totalMovies) % totalMovies);
      } else if (event.key === 'ArrowDown') {
        setSelectedMovieIndex((prevIndex) => (prevIndex + moviesPerRow) % totalMovies);
      } else if (event.key === 'ArrowUp') {
        setSelectedMovieIndex((prevIndex) => (prevIndex - moviesPerRow + totalMovies) % totalMovies);
      } else if (event.key === 'Enter') {
        const selectedMovie = filteredMovies[selectedMovieIndex];
        navigate(`/movie/${selectedMovie.id}/${filter}`);
      } else if (event.key === 'Escape') {
        setFocusOnFilters(true);
      }
    }
  }, [focusOnFilters, filteredMovies, selectedMovieIndex, selectedFilterIndex, navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Clicking on the movie with the mouse
  const handleMovieClick = (index) => {
    setFocusOnFilters(false);
    setSelectedMovieIndex(index); 
    const selectedMovie = filteredMovies[index]; 
    navigate(`/movie/${selectedMovie.id}/${filter}`);
  };
  

  return (
    <div>
      <h2>Movies</h2>
      {error && <div className="error-message">{error}</div>}
      <nav className="navbar">
        {filterLabels.map((label, index) => (
          <button
            key={index}
            className={index === selectedFilterIndex ? "selected" : ""}
            onClick={() => {
              setFilter(filterOptions[index]);
              setFocusOnFilters(true);
              setSelectedFilterIndex(index);
            }}
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
            onClick={() => handleMovieClick(index)}
          />
        ))}
      </div>
      
        <button onClick={handleLoadMore} disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      
    </div>
  );
};

export default Home;
