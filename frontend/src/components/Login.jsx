import React, { useState } from "react";

//import ErrorMessage from "./ErrorMessage";
//import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

import { TextField, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FastAPIClient from '../client';
import config from '../config';
import Button from './Button';


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
      'margin-top': '100px',
      'margin-bottom': '100px',
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
const client = new FastAPIClient(config);

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [, setToken] = useContext(UserContext);


//   const classes = useStyles();
//   let navigate = useNavigate();



  // const submitLogin = async () => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: JSON.stringify(
  //       `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
  //     ),
  //   };

  //   const response = await fetch("/api/users/token", requestOptions);
  //   const data = await response.json();
  //   console.log(data);

  //   if (!response.ok) {
  //     setErrorMessage(data.detail);
  //   } else {
  //     setToken(data.access_token);
      
  //     if (data.role === 'manager') {
  //       navigate('/admin');
  //     } else {
  //     navigate('/dashboard');};

  //   };
  // };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   submitLogin();
    
  //};
const Login = () => {
  const classes = useStyles();
  const [error, setError] = useState({email: "", password: ""});
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onLogin = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    if(loginForm.email.length <= 0)
    {
      setLoading(false)
      return setError({email: "Please Enter Email Address"}) 
    }
    if(loginForm.password.length <= 0)
    {
      setLoading(false)
      return setError({password: "Please Enter Password"})
    }
    console.log(loginForm.password)
    client.login(loginForm.email, loginForm.password)
      .then( (response) => {
        console.log(response);
        navigate('/dashboard')
      })
      .catch( (err) => {
        setLoading(false);
        setError(true);
        console.log(err);
        
      });
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: JSON.stringify(
    //     `grant_type=password&username=${loginForm.email}&password=${loginForm.password}&scope=&client_id=&client_secret=`
    //   ),
    // };

    // const response = fetch("/api/users/token", requestOptions);
    // console.log(response);
    // const data = response.json();
    // console.log(data);
  };
  

  return (
  <Grid container direction="row" justify="center" alignItems="center" >
  <Paper className={classes.root} elevation={0}>
    <div className="column">
      <form className="box" onSubmit={(e) => onLogin(e)}>
        <h1 className="title has-text-centered">Login</h1>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              type="email"
              error={error.email}
              placeholder="Enter email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value })}
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
              error={error.password}
              placeholder="Enter password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value })}
              className="input"
              required
                />
              </div>
            </div>
          
            <br />
          <Button title={"Login"}  loading={loading} error={error.password}/>    

        <footer>
                <Link className="text-teal-700 hover:text-blue-900 text-sm float-right" to="/register">Create Account</Link>
                <br />
        </footer> 
      </form>
      
    </div>
  </Paper>
</Grid>
  );
};

export default Login;
