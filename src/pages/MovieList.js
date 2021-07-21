import React, { useEffect, useState, useCallback, useRef } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/actions/usersActions";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { ImageModal } from "../components/ImageModal";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CACHE_KEY = "movie_keyword_history";

const StyleCard = withStyles({
  root: {
    borderRadius: 10,
    transition: "transform 0.15s ease-in-out",
    "&:hover, &:focus": { transform: "scale3d(1.03, 1.03, 1)" },
  },
})(Card);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  button: {
    backgroundColor: "#333333",
    color: "#fff",
    borderRadius: 5,
    padding: "7px 20px",
  },
}));

const Item = ({ children, reference }) => {
  return (
    <Grid item xs={6} ref={reference}>
      {children}
    </Grid>
  );
};

function putHistory(data) {
  if (typeof Storage !== "undefined") {
    let historyData = null;

    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.unshift(data);
    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

// localStorage.clear();
const MovieList = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [value, setValue] = useState(keywordSearch[0]);
  const observer = useRef();
  const [pages, setPages] = useState(1);
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { loading, data } = movieList;

  useEffect(() => {
    let keyword =
      typeof localStorage !== "undefined"
        ? JSON.parse(localStorage.getItem("movie_keyword_history"))
        : [];

    if (keyword !== null) {
      setKeywordSearch(keyword);
    }

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

    putHistory({ keyword_title: title });

    dispatch(getMovies(title, 1)).then((response) => {
      setTitle(title);
      setTotalPage(Math.round(response.totalResults / 10));
      setItems([...response.Search]);
      setHasMore(true);
      setPages(1);
    });
  }

  const Loader = () => {
    return (
      <Paper className={classes.paper}>
        <Grid item xs={6}>
          <Skeleton width="50%"></Skeleton>
          <Skeleton width="80%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
          <Skeleton width="50%"></Skeleton>
          <Skeleton width="80%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
          <Skeleton width="50%"></Skeleton>
          <Skeleton width="80%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
        </Grid>
      </Paper>
    );
  };

  if (data.Response === "False")
    return <Alert severity="error">{data.Error}</Alert>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={5} direction="row" alignItems="center">
          <Grid item xs={10}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={title}
              onInputChange={(event, newInputValue) => {
                setTitle(newInputValue);
              }}
              id="combo-box-demo"
              options={keywordSearch}
              getOptionLabel={(option) => option.keyword_title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-basic"
                  label="Input Movie Title"
                  variant="outlined"
                  fullWidth
                />
              )}

              // onInput={(e) => setTitle(e.target.value)}
            />
            {/* <TextField
              id="outlined-basic"
              label="Input Movie Title"
              variant="outlined"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
              fullWidth
            /> */}
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
        <Loader />
      ) : (
        <Grid container spacing={6}>
          {items.map((movie, index) =>
            index + 1 === items.length ? (
              <Item reference={lastItemRef} key={index}>
                <StyleCard className={classes.root}>
                  <ImageModal value={movie.Poster} />
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography
                        variant="h6"
                        component="p"
                        color="secondary"
                        gutterBottom
                      >
                        {movie.Title}
                      </Typography>
                      <Typography
                        variant="caption"
                        component="p"
                        color="primary"
                        gutterBottom
                      >
                        ({movie.Year})
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Link
                        to={`/detail/${movie.imdbID}`}
                        className={classes.button}
                        style={{ textDecoration: "none" }}
                      >
                        Detail
                      </Link>
                    </CardActions>
                  </div>
                </StyleCard>
              </Item>
            ) : (
              <Item key={index}>
                <StyleCard className={classes.root}>
                  <ImageModal value={movie.Poster} />
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography
                        variant="h6"
                        component="p"
                        color="secondary"
                        gutterBottom
                      >
                        {movie.Title}
                      </Typography>
                      <Typography
                        variant="caption"
                        component="p"
                        color="primary"
                        gutterBottom
                      >
                        ({movie.Year})
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Link
                        to={`/detail/${movie.imdbID}`}
                        className={classes.button}
                        style={{ textDecoration: "none" }}
                      >
                        Detail
                      </Link>
                    </CardActions>
                  </div>
                </StyleCard>
              </Item>
            )
          )}
        </Grid>
      )}
    </>
  );
};

export default MovieList;
