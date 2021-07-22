import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
}));

export const MainLoader = () => {
  const classes = useStyles();
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

export const DetailLoader = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item>
          <Skeleton variant="rect" width={200} height={300} />
        </Grid>
        <Grid item sm>
          <Skeleton width="100%"></Skeleton>
          <Skeleton width="20%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
          <Skeleton width="10%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
          <Skeleton width="50%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
          <Skeleton width="50%">
            <Typography gutterBottom>.</Typography>
          </Skeleton>
        </Grid>
      </Grid>
    </Paper>
  );
};
