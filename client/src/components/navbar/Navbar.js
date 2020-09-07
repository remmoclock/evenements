import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "rgba(0, 173, 181, 0.7)",
  },
  title: {
    flexGrow: 1,
  },
  navButtons: {
    fontSize: "1.4rem",
    textTransform: "inherit",
    marginLeft: theme.spacing(2),
  },
  user: {
    display: "flex",
    alignItems: "center",
    "& h4": {
      fontSize: "1.4rem",
      fontWeight: 400,
      marginLeft: "1rem",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Events
          </Typography>
          <Button color="inherit">Liste d'évenements</Button>
          <Button color="inherit">Se connecter</Button>
          <Button component={Link} to="/register" color="inherit">
            S'enregistrer
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
