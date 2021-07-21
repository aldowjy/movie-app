import { GET_MOVIES, GET_MOVIE_DETAIL } from "../types";

const initialState = {
  data: [],
  loading: true,
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default movieReducer;
