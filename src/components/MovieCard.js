import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { ImageModal } from "../components/ImageModal";

const StyleCard = withStyles({
  root: {
    borderRadius: 10,
    transition: "transform 0.15s ease-in-out",
    "&:hover, &:focus": { transform: "scale3d(1.03, 1.03, 1)" },
  },
})(Card);

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
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

export const MovieCard = ({ value }) => {
  const classes = useStyles();

  return (
    <StyleCard className={classes.root}>
      <ImageModal value={value.Poster} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h6" component="p" color="secondary" gutterBottom>
            {value.Title}
          </Typography>
          <Typography
            variant="caption"
            component="p"
            color="primary"
            gutterBottom
          >
            ({value.Year})
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link
            to={`/detail/${value.imdbID}`}
            className={classes.button}
            style={{ textDecoration: "none" }}
          >
            Detail
          </Link>
        </CardActions>
      </div>
    </StyleCard>
  );
};
