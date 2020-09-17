import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "0 auto",
    padding: "5rem",
  },
  textFields: {
    fontSize: "1.6rem",
    marginBottom: "3rem",
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "3rem",
  },
}));

const Login = ({ loginUser, history }) => {
  // Hooks
  const classes = useStyles();
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  // Fuctions
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData, history);
  };

  const handleChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Paper className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography className={classes.formTitle} variant="h2" color="primary">
          Connectes toi 
        </Typography>
        <Input
          className={classes.textFields}
          name="email"
          type="email"
          placeholder="Email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          className={classes.textFields}
          name="password"
          type="password"
          placeholder="Mot de passe"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Envoyer
        </Button>
      </form>
    </Paper>
  );
};

export default connect(null, { loginUser })(Login);
