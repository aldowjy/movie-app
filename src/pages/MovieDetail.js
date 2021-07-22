import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getMovieDetail } from "../redux/actions/usersActions";
import Alert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { DetailLoader } from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
  image: {
    width: 250,
  },
}));

const MovieDetail = (route) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const movieDetail = useSelector((state) => state.movieList);
  const { loading, data } = movieDetail;

  useEffect(() => {
    dispatch(getMovieDetail(route.match.params.id));
  }, [dispatch, route.match.params.id]);

  if (loading) {
    return <DetailLoader />;
  }
  if (data.Response === "False")
    return <Alert severity="error">{data.Error}</Alert>;

  return (
    <>
      {data !== undefined ? (
        <Paper className={classes.root}>
          <Grid container spacing={3}>
            <Grid item>
              <img
                className={classes.image}
                src={data.Poster}
                alt={data.Title}
              />
            </Grid>
            <Grid item sm>
              <Typography variant="h4" color="secondary">
                {data.Title}
              </Typography>
              <Typography variant="caption" component="p" gutterBottom>
                {`${data.Year} · ${data.Runtime}`}
              </Typography>
              <Box my={3}>
                <Chip color="primary" label={data.Type} />
              </Box>
              <Divider />
              <Box my={1}>
                <Typography variant="body1" gutterBottom>
                  {data.Plot}
                </Typography>
              </Box>
              <Divider />
              <Box my={1}>
                <Typography variant="body1" gutterBottom>
                  {`Director: ${data.Director}`}
                </Typography>
              </Box>
              <Divider />
              <Box my={1}>
                <Typography variant="body1" gutterBottom>
                  {`Actor: ${data.Director}`}
                </Typography>
              </Box>
              <Divider />
              <Box my={1}>
                <Typography variant="body1" gutterBottom>
                  {`Country: ${data.Country}`}
                </Typography>
              </Box>
              <Divider />
              <Box my={1}>
                <Typography variant="body1" gutterBottom>
                  {`IMDb Rating: ${data.imdbRating}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Alert severity="error">Something Wrong!</Alert>
      )}
    </>
  );
};

export default MovieDetail;
