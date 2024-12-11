import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchNowPlayingMovies } from "../redux/actions";
import Movie from "../components/movie";

const Home = () => {
    
  const [filter, setFilter] = useState("popular"); 
  const dispatch = useDispatch();

  const movies = useSelector((state) => {
    if (filter === "popular") return state.popularMovies;
    if (filter === "nowPlaying") return state.nowPlayingMovies;
    if (filter === "favorites") return state.favorites;
  });

  useEffect(() => {
    if (filter === "popular") dispatch(fetchPopularMovies());
    if (filter === "nowPlaying") dispatch(fetchNowPlayingMovies());
  }, [filter, dispatch]);

  return (
    <div>
        <h2>Movies</h2>
        <nav>
            <button onClick={() => setFilter("popular")}>Popular</button>
            <button onClick={() => setFilter("nowPlaying")}>Airing Now</button>
            <button onClick={() => setFilter("favorites")}>My Favorites</button>
        </nav>
        <div>
            {movies.map((movie) =>
            {
                return <Movie key={movie.id} movieData={movie} />
            })}
        </div>
    </div>
  );
};

export default Home;
