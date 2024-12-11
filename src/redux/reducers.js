import { SET_POPULAR_MOVIES, SET_NOW_PLAYING_MOVIES,SET_ALL_MOVIES } from "./actions";

const initialState = {
  allMovies: [],
  popularMovies: [],
  nowPlayingMovies: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_MOVIES:
      return { ...state, allMovies: action.payload };
    case SET_POPULAR_MOVIES:
      return { ...state, popularMovies: action.payload };
    case SET_NOW_PLAYING_MOVIES:
      return { ...state, nowPlayingMovies: action.payload };
    default:
      return state;
  }
};
