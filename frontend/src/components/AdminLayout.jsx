import React from "react";
import { BrowserRouter,Routes, Route, NavLink } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";




const AdminLayout = () => {
  return (
    <>

                <div className='row'>
                    <ul className='sidebar-submenu'>
                        <li>
                            <NavLink to='/admin/' >All Users</NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/all-timesheets' >All Timesheets</NavLink>
                        </li>
                    </ul>
                </div>           
           
           

                <Outlet />
 
    </>
  )
};

export default AdminLayout;