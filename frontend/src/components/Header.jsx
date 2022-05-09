import React, { useContext,useEffect,useState } from "react";
import { useNavigate,Outlet, Link } from "react-router-dom";
//import { UserContext } from "../context/UserContext";

import FastAPIClient from '../client';
import config from '../config';
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
import Footer from "./Footer.jsx";

const client = new FastAPIClient(config);

function Header (){
  
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // STATE WHICH WE WILL USE TO TOGGLE THE MENU ON HAMBURGER BUTTON PRESS
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const tokenString = localStorage.getItem("token")
  if (tokenString) {
        console.log(tokenString)
        const token = JSON.parse(tokenString)
        const decodedAccessToken = jwtDecode(token.access_token)
        //if(moment.unix(decodedAccessToken.exp).toDate() > new Date()){
            setIsLoggedIn(true)
        //}
    }
  }, [])
  const handleLogout = () => {
    setIsLoggedIn(false);
    client.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    navigate('/')
  }

  const handleLogin = () => {
    navigate("/");
  }

  let displayButton;
  const buttonStyle = "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"

  if (isLoggedIn) {
      displayButton = <button className={buttonStyle} onClick={() => handleLogout()}>Logout</button>;
    } else {
      displayButton = <button className={buttonStyle} onClick={() => handleLogin()}>Login</button>;
    }



  return (
    <><div class="flex flex-col justify-between h-screen">
       <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
        <div className="flex items-center flex-shrink-0 text-white mr-3">
                <a href={"/"}></a>
            <span className="font-semibold text-xl tracking-tight">Timesheet Log</span>
        </div>
        <div className="block lg:hidden">
            <button
                className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                onClick={() => setToggleMenu(!toggleMenu)}>
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
            </button>
        </div>
        <div className={`animate-fade-in-down w-full ${toggleMenu ? "block" : "hidden"} flex-grow lg:flex lg:items-center lg:w-auto`}>
            <div className="text-sm lg:flex-grow">
                <Link to="/dashboard" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
                   Dashboard
                </Link>
                <Link to="/admin/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
                    Admin
                </Link>

                {!isLoggedIn && <Link
                    className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                    to={`/register`}>
                    Create Account
                </Link>}

            </div>
            <div>
              {displayButton}
            </div>
        </div>
      </nav>


      <Outlet />
      <Footer />
    </div>
    </>
  );
};

export default Header;
