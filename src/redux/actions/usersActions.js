import { GET_MOVIES, GET_MOVIE_DETAIL } from "../types";
import axios from "axios";

export const getMovies = (title, page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://www.omdbapi.com?apikey=faf7e5bb&s=${title}&page=${page}`
    );

    dispatch({
      type: GET_MOVIES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
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
    console.log(e);
  }
};
