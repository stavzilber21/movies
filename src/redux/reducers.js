import { SET_POPULAR_MOVIES, SET_NOW_PLAYING_MOVIES,SET_ALL_MOVIES,ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./actions";

const initialState = {
  allMovies: [],
  popularMovies: [],
  nowPlayingMovies: [],
  favorites: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_MOVIES:
      return { ...state, allMovies: action.payload };
    case SET_POPULAR_MOVIES:
      return { ...state, popularMovies: action.payload };
    case SET_NOW_PLAYING_MOVIES:
      return { ...state, nowPlayingMovies: action.payload };
      
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.payload.id),
      };
    default:
      return state;
  }
};
