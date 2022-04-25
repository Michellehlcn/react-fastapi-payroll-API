import React from "react";
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import { Admin,Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function AdminPage (){
  return (

    <Admin dataProvider={dataProvider}>
      <Resource name="posts" list={ListGuesser} />
    
    </Admin>


    );
}
export default AdminPage;