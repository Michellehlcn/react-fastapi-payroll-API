import React from "react";
import { BrowserRouter,Routes, Route, NavLink } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <><nav>
    <div className='row'>
    <ul className='sidebar-submenu'>
            <NavLink to='/admin/' >All Users</NavLink>
            <NavLink to='/admin/all-timesheets' >All Timesheets</NavLink>
    </ul>
    </div>          
    </nav> 
    <Outlet />
 
    </>
  )
};

export default AdminLayout;