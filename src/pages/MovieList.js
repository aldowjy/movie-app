import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/actions/usersActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { MainLoader } from "../components/Loader";
import { MovieCard } from "../components/MovieCard";

const Item = ({ children, reference }) => {
  return (
    <Grid item xs={6} ref={reference}>
      {children}
    </Grid>
  );
};

const MovieList = () => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const observer = useRef();
  const [pages, setPages] = useState(1);
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { loading, data } = movieList;

  useEffect(() => {
    dispatch(getMovies(title !== "" ? title : "Spongebob", 1)).then(
      (response) => {
        setTitle("Spongebob");
        setTotalPage(Math.round(response.totalResults / 10));
        setItems([...response.Search]);
        setPages((pages) => pages + 1);
      }
    );
  }, []);

  const lastItemRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        if (pages < totalPage) {
          dispatch(getMovies(title, pages)).then((response) => {
            setItems([...items, ...response.Search]);
            setHasMore(true);
            setPages((pages) => pages + 1);
          });
        } else {
          setHasMore(false);
        }
      }
    });

    if (node) observer.current.observe(node);
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (title === "") {
      alert("Movie Name is Required!");
      return;
    }

    dispatch(getMovies(title, 1)).then((response) => {
      setTitle(title);
      setTotalPage(Math.round(response.totalResults / 10));
      setItems([...response.Search]);
      setHasMore(true);
      setPages(1);
    });
  }

  if (data.Response === "False")
    return <Alert severity="error">{data.Error}</Alert>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={5} direction="row" alignItems="center">
          <Grid item xs={10}>
            <TextField
              id="outlined-basic"
              label="Input Movie Title"
              variant="outlined"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      {loading ? (
        <MainLoader />
      ) : (
        <Grid container spacing={6}>
          {items.map((movie, index) =>
            index + 1 === items.length ? (
              <Item reference={lastItemRef} key={index}>
                <MovieCard value={movie} />
              </Item>
            ) : (
              <Item key={index}>
                <MovieCard value={movie} />
              </Item>
            )
          )}
        </Grid>
      )}
    </>
  );
};

export default MovieList;
