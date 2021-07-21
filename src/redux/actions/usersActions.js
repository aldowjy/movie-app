import { GET_MOVIES, GET_MOVIE_DETAIL, MOVIES_ERROR } from "../types";
import axios from "axios";

export const getMovies = (title, page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://www.omdbapi.com?apikey=faf7e5bb&s=${title}&page=${page}`
    );
    dispatch({
      type: GET_MOVIES,
      payload: res.data.Search,
    });
  } catch (e) {
    dispatch({
      type: MOVIES_ERROR,
      payload: console.log(e),
    });
  }
};

export const getMovieDetail = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://www.omdbapi.com?apikey=faf7e5bb&i=${id}`
    );
    dispatch({
      type: GET_MOVIE_DETAIL,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: MOVIES_ERROR,
      payload: console.log(e),
    });
  }
};
