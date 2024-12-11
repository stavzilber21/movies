import { SET_POPULAR_MOVIES, SET_NOW_PLAYING_MOVIES,ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, SET_ERROR } from "./actions";

const initialState = {
  popularMovies: [],
  nowPlayingMovies: [],
  favorites: [],
  error: null,
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
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
      case SET_ERROR:
        return {
          ...state,
          error: action.payload, 
        };
    default:
      return state;
  }
};
