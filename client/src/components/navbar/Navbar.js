import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userActions";

const mapState = (state) => ({
  user: state.user,
});

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

const Navbar = ({ user, logout, history }) => {
  const classes = useStyles();

  const userOnline = (
    <Fragment>
      <Button color="inherit">Créer un évenement</Button>
      <Button color="inherit" onClick={() => logout(history)}>
        Se déconnecter
      </Button>
    </Fragment>
  );
  const userOffline = (
    <Fragment>
      <Button color="inherit">Se connecter</Button>
      <Button color="inherit" component={Link} to="/register">
        S'enregistrer
      </Button>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Events
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">
            Liste d'évenements
          </Button>
          {user.user !== null && !user.loading ? userOnline : userOffline}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(connect(mapState, { logout })(Navbar));
