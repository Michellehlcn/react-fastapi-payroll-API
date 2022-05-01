import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import SiteBar from "./NavBar";
import { UserContext } from "../context/UserContext";



const Header = ({ title }) => {
  const [token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <SiteBar />

      <div className="has-text-centered m-6">
        <h1 className="title">{title}</h1>
        {token && (
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Header;
