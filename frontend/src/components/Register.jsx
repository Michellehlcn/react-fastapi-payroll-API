import React, { useContext, useState } from "react";
import DropdownList from "react-widgets/DropdownList";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import { useNavigate, Link } from "react-router-dom";


import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
      background: '#fff',
      width: '40%',
      'min-width': '320px',
      'max-width': '475px',
      padding: '8px',
      position: 'relative',
      display: 'flex',
       'align-items': 'center',
        'justify-content': 'center',
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        width:'50%',
        //position: 'absolute',
        //top: '70%',
    },
    input: {
        width: '100%',
        'padding-bottom': '8px'
    }
});

const Register = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);
  const classes = useStyles();
  let navigate = useNavigate();

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "email": email, "password": password, "role": role.toString()}),
    };

    const response = await fetch("/api/users", requestOptions);
    const data = await response.json();
    console.log(requestOptions)


    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
      console.log('Sucess:', data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();

      navigate("/login");
    } else {
      setErrorMessage(
        "Ensure that the passwords match and greater than 5 characters"
      );
    }
  };


  return (
  <Grid container direction="row" justify="center" alignItems="center" >
  <Paper className={classes.root} elevation={0}>
    <div className="column">
      <form className="box" id="myform" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Register</h1>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input

              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        

        <div className="field">
          <label className="label">Select Role</label>
          <div className="control">
          <select
            value={role.toString()}
            onChange={(e) => setRole(e.target.value)}>
            <option value="manager">Manager</option>
            <option value="trainer">Trainer</option>
          </select>
          </div>
        </div>
        
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={password.toString()}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Register
        </button>
        <Link to="/login">Login</Link>
      </form>
    </div>
    </Paper>
    </Grid>
  );
};

export default Register;
