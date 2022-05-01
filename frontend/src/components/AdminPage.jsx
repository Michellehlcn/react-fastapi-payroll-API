import React from "react";
import { BrowserRouter,Routes, Route, NavLink } from "react-router-dom";
import AllUsers from "./AllUsers";

import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


export default function AdminPage() {
  return (
    <>    
        <h1>Welcome to Admin Dashboard </h1>
    </>
    );
}