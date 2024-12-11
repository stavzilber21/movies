import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_POPULAR_MOVIES, FETCH_NOW_PLAYING_MOVIES, setPopularMovies, setNowPlayingMovies,setError } from "./actions";

//Setting a timeout of 5 seconds for receiving information from the server
const fetchWithTimeout = async (url, options, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id); 
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error.name === "AbortError" ? new Error("Request timed out") : error;
  }
};


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzEyNDNhMjA3Zjg4MzFmZWNlYjE5MjlmOTYzNzUzNCIsIm5iZiI6MTczMzgxMzMzMC45NjUsInN1YiI6IjY3NTdlNDUyMTU0NDIwMTFmZmU4MGFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLUfH2ULPcYw-dnLUAO8kRNfP57aCoE4ntV8NFu-ifo'
    }
  };

// Function to retrieve popular movies
const fetchPopularMoviesApi = async () => {
  try {
    const response = await fetchWithTimeout('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    if (!response.ok) throw new Error("Failed to fetch popular movies");
    const data = await response.json();

    if (!Array.isArray(data.results)) {
      throw new Error("Invalid data format for popular movies");
    }
    return data;
  } catch (error) {
    throw new Error(`Error fetching popular movies: ${error.message}`);
  }
};

// Function to retrieve movies that are now playing
const fetchNowPlayingMoviesApi = async () => {
  try {
    const response = await fetchWithTimeout('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
    if (!response.ok) throw new Error("Failed to fetch now playing movies");
    const data = await response.json();

    if (!Array.isArray(data.results)) {
      throw new Error("Invalid data format for now playing movies");
    }
    return data;
  } catch (error) {
    throw new Error(`Error fetching now playing movies: ${error.message}`);
  }
};


function* fetchPopularMoviesSaga() {
  try {
    const data = yield call(fetchPopularMoviesApi);
    yield put(setPopularMovies(data.results)); 
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    yield put(setError(error.message)); 
  }
}

function* fetchNowPlayingMoviesSaga() {
  try {
    const data = yield call(fetchNowPlayingMoviesApi);
    yield put(setNowPlayingMovies(data.results)); 
  } catch (error) {
    console.error("Error fetching now playing movies:", error.message);
    yield put(setError(error.message)); 
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_POPULAR_MOVIES, fetchPopularMoviesSaga);
  yield takeLatest(FETCH_NOW_PLAYING_MOVIES, fetchNowPlayingMoviesSaga);
}