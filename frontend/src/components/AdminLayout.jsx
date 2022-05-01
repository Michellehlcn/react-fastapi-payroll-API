import React from "react";
import { BrowserRouter,Routes, Route, NavLink } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');


const AdminLayout = () => {
  return (
    <>
            <div className='container-fluid'>
                <div className='row'>
                    <ul className='sidebar-submenu'>
                        <li>
                            <NavLink to='/admin/' ><h1> Admin Page </h1></NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/all-users' >All Users</NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/all-timesheets' >All Timesheets</NavLink>
                        </li>
                    </ul>
                </div>           
            </div>
            <Admin dataProvider={dataProvider}>

                <Outlet />
            </Admin>
    </>
  )
};

export default AdminLayout;