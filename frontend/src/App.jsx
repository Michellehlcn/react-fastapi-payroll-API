import React, { useContext, useEffect, useState } from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Table from "./components/Table";
import ErrorPage from "./components/ErrorPage";

import { UserContext } from "./context/UserContext";

import TimeSheetForm from "./components/TimeSheetForm";


import { Routes, Route, Navgate, Link } from "react-router-dom";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);


  return (

<>
    
    <Header title={message} />
    
    <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">

          <div className="columns">
        

            {!token ? (<div className="column"><Register /></div> ) : null}
            {!token ? (<div className="column"><Login /></div> ) : (<div><Table /><TimeSheetForm /></div>)}

          </div>
         

        </div>
        <div className="column"></div>
    </div>
   
</>


  );
};

export default App;
