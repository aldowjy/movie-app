import React, { useEffect, useState } from "react";
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
  image: {
    width: 100,
    height: 100,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  pos: {
    marginBottom: 20,
  },
  cover: {
    width: 120,
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

const MovieList = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { loading, error, data } = movieList;

  useEffect(() => {
    dispatch(getMovies(title !== "" ? title : "Batman"));
  }, [dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getMovies(title));
  }

  if (loading) {
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
  }
  if (error) return <Alert severity="error">Something Wrong!</Alert>;

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

      {data !== undefined && Array.isArray(data) ? (
        <Grid container spacing={6}>
          {data.map((movie) => (
            <Grid item xs={6} key={movie.Title}>
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
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="error" style={{ marginTop: 15 }}>
          Movie not Found!
        </Alert>
      )}
    </>
  );
};

export default MovieList;
