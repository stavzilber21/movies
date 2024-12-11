import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_POPULAR_MOVIES, FETCH_NOW_PLAYING_MOVIES,FETCH_ALL_MOVIES, setPopularMovies, setNowPlayingMovies,setAllMovies } from "./actions";


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzEyNDNhMjA3Zjg4MzFmZWNlYjE5MjlmOTYzNzUzNCIsIm5iZiI6MTczMzgxMzMzMC45NjUsInN1YiI6IjY3NTdlNDUyMTU0NDIwMTFmZmU4MGFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLUfH2ULPcYw-dnLUAO8kRNfP57aCoE4ntV8NFu-ifo'
    }
  };

// Function to retrieve popular movies
const fetchPopularMoviesApi = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
  if (!response.ok) throw new Error("Failed to fetch popular movies");
  return response.json();
};

// Function to retrieve movies that are now playing
const fetchNowPlayingMoviesApi = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
  if (!response.ok) throw new Error("Failed to fetch now playing movies");
  return response.json();
};

// Function to retrieve movies that are now playing
const fetchAllMoviesApi = async () => {
  const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  if (!response.ok) throw new Error("Failed to fetch now playing movies");
  return response.json();
};

function* fetchPopularMoviesSaga() {
  try {
    const data = yield call(fetchPopularMoviesApi);
    yield put(setPopularMovies(data.results)); 
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
   
  }
}

function* fetchNowPlayingMoviesSaga() {
  try {
    const data = yield call(fetchNowPlayingMoviesApi);
    yield put(setNowPlayingMovies(data.results)); 
  } catch (error) {
    console.error("Error fetching now playing movies:", error.message);
    
  }
}

function* fetchAllMoviesSaga() {
  try {
    const data = yield call(fetchAllMoviesApi);
    yield put(setAllMovies(data.results)); 
  } catch (error) {
    console.error("Error fetching now playing movies:", error.message);
    
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_POPULAR_MOVIES, fetchPopularMoviesSaga);
  yield takeLatest(FETCH_NOW_PLAYING_MOVIES, fetchNowPlayingMoviesSaga);
  yield takeLatest(FETCH_ALL_MOVIES, fetchAllMoviesSaga);
}
