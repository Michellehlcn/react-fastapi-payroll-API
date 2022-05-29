import React, { useState } from "react";
//import DropdownList from "react-widgets/DropdownList";
//import { UserContext } from "../context/UserContext";
//import ErrorMessage from "./ErrorMessage";
import { useNavigate, Link } from "react-router-dom";
import FastAPIClient from '../client';
import config from '../config';
import Button from './Button';

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Input } from "reactstrap";

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
        'margin-top': '100px',
        'margin-bottom': '100px',
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

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmationPassword, setConfirmationPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [, setToken] = useContext(UserContext);
//   const classes = useStyles();
//   let navigate = useNavigate();

//   const submitRegistration = async () => {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ "email": email, "password": password, "role": role.toString()}),
//     };

//     const response = await fetch("/api/users", requestOptions);
//     const data = await response.json();
//     console.log(requestOptions)


//     if (!response.ok) {
//       setErrorMessage(data.detail);
//     } else {
//       setToken(data.access_token);
//       console.log('Sucess:', data);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmationPassword && password.length > 5) {
//       submitRegistration();

//       navigate("/");
//     } else {
//       setErrorMessage(
//         "Ensure that the passwords match and greater than 5 characters"
//       );
//     }
//   };
const client = new FastAPIClient(config);

const Register = () => {
  const classes = useStyles();
  const [error, setError] = useState({ email: '', role: '', password: '', confirmationPassword: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', role: '',password: '', confirmationPassword: '' });
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    
    if(registerForm.role <= 0)
    {
      setLoading(false)
      return setError({role: "Please Select Your Role"}) 
    }
    if(registerForm.email.length <= 0)
    {
      setLoading(false)
      return setError({email: "Please Enter Email Address"}) 
    }
    if(registerForm.password.length <5)
    {
      setLoading(false)
      return setError({password: "Please Enter Password greater than 5 characters"})
    }
    if(registerForm.confirmationPassword !== registerForm.password  && registerForm.password.length <5 )
    {
      setLoading(false)
      return setError({confirmationPassword: "Ensure that the passwords match and greater than 5 characters"}) 
    }
    console.log(registerForm.email);
    client.register(registerForm.email, registerForm.password, registerForm.role)
      .then( (res) => {
        setLoading(true);
        console.log(res);
        navigate('/')
      })
      .catch( (err) => {
        setLoading(false);
        setError(true);
        console.log(err);
        
      });
  };

  return (
  <Grid container direction="row" justify="center" alignItems="center" >
  <Paper className={classes.root} elevation={0}>
    <div className="column">
      <form className="box" onSubmit={(e) => onRegister(e)}>
        <h1 className="title has-text-centered">Register</h1>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <Input
              type="email"
              placeholder="Enter email"
              error={error.email}
              value={registerForm.email}
              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>
        

        <div className="field">
          <label className="label">Select Role</label>
          <div className="control">
          <Input
            type="select"
            value={registerForm.role}
            error={error.role}
            onChange={(e) => setRegisterForm({...registerForm, role: e.target.value })}
            >
            <option></option>
            <option value="manager">Manager</option>
            <option value="trainer">Trainer</option>
          </Input>
          </div>
        </div>
        
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <Input
              type="password"
              placeholder="Enter password"
              error={error.password}
              value={registerForm.password}
              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value })} 
              className="input"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <Input
              type="password"
              placeholder="Enter password"
              error={error.confirmationPassword}
              value={registerForm.confirmationPassword}
              onChange={(e) => setRegisterForm({...registerForm, confirmationPassword: e.target.value })} 
              className="input"
              required
            />
          </div>
        </div>
        <br />
        <Button title={"Create Account"}  loading={loading} error={error.password}/> 
        <footer>
            <Link className="text-teal-700 hover:text-blue-900 text-sm float-right" to="/">Already Have an account ?</Link>
            <br />
        </footer>
      </form>
      </div>
  </Paper>
</Grid>
  );
};

export default Register;
