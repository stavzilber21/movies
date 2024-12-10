import { SET_POPULAR_MOVIES, SET_NOW_PLAYING_MOVIES } from "./actions";

const initialState = {
  popularMovies: [],
  nowPlayingMovies: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POPULAR_MOVIES:
      return { ...state, popularMovies: action.payload };
    case SET_NOW_PLAYING_MOVIES:
      return { ...state, nowPlayingMovies: action.payload };
    default:
      return state;
  }
};
