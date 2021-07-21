import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <Link to={`/`} style={{ textDecoration: "none", color: "#fff" }}>
              <Typography variant="h5">Movie App</Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={8}>
          <Switch>
            <Route path="/" component={MovieList} exact />
            <Route path="/detail/:id" component={MovieDetail} />
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
