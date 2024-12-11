// Action Types
export const FETCH_POPULAR_MOVIES = "FETCH_POPULAR_MOVIES";
export const FETCH_NOW_PLAYING_MOVIES = "FETCH_NOW_PLAYING_MOVIES";
export const FETCH_ALL_MOVIES = "FETCH_ALL_MOVIES";
export const SET_POPULAR_MOVIES = "SET_POPULAR_MOVIES";
export const SET_NOW_PLAYING_MOVIES = "SET_NOW_PLAYING_MOVIES";
export const SET_ALL_MOVIES = "SET_ALL_MOVIES";

// Action Creators
export const fetchPopularMovies = () => ({
  type: FETCH_POPULAR_MOVIES,
});

export const fetchNowPlayingMovies = () => ({
  type: FETCH_NOW_PLAYING_MOVIES,
});

export const fetchAllMovies = () => ({
  type: FETCH_ALL_MOVIES,
});

export const setPopularMovies = (movies) => ({
  type: SET_POPULAR_MOVIES,
  payload: movies,
});

export const setNowPlayingMovies = (movies) => ({
  type: SET_NOW_PLAYING_MOVIES,
  payload: movies,
});

export const setAllMovies = (movies) => ({
  type: SET_ALL_MOVIES,
  payload: movies,
});