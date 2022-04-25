import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

import { TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      /*background: '#fff',*/
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
        /*background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',*/
        width:'50%',
        //position: 'absolute',
        //top: '70%',
    },
    input: {
        width: '100%',
        'padding-bottom': '8px'
    }
});
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);


  const classes = useStyles();
  let navigate = useNavigate();



  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch("/api/users/token", requestOptions);
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
      
      if (data.role === 'manager') {
        navigate('/admin');
      } else {
      navigate('/dashboard');};

    };
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
    
  };

  return (
  <Grid container direction="row" justify="center" alignItems="center" >
  <Paper className={classes.root}>
    <div className="column">
      <form className="box" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Login</h1>
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
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button is-primary" type="submit">
          Login
        </button>
        <Link to="/register">Register</Link>

      </form>
    </div>
  </Paper>
</Grid>
  );
};

export default Login;
