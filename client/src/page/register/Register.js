import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "0 auto",
    padding: "5rem",
  },
  textFields: {
    marginBottom: "3rem",
    "& input": {
      fontSize: "1.6rem",
    },
    "& p": {
      fontSize: "1.2rem",
    },
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "3rem",
  },
}));

const Register = ({ registerUser, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const classes = useStyles();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(formData, history);
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit} noValidate>
        <Typography className={classes.formTitle} variant="h2" color="primary">
          Inscris toi 
        </Typography>
        <TextField
          className={classes.textFields}
          name="name"
          placeholder="Nom"
          fullWidth
          value={name}
          onChange={handleChange}
        />
        <TextField
          className={classes.textFields}
          name="email"
          type="email"
          placeholder="Email"
          helperText="Merci d'utiliser un email associé à Gravatar si vous souhaitez une image personnalisée"
          fullWidth
          value={email}
          onChange={handleChange}
        />
        <TextField
          className={classes.textFields}
          name="password"
          type="password"
          placeholder="Mot de passe"
          fullWidth
          value={password}
          onChange={handleChange}
        />
        <TextField
          className={classes.textFields}
          name="confirmPassword"
          type="password"
          placeholder="Confirmes ton mot de passe"
          fullWidth
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Envoyer
        </Button>
      </form>
    </Paper>
  );
};

export default connect(null, { registerUser })(Register);
