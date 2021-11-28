import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import { logout } from "./Firebase";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

export default function Navbar() {
  const appContext = useContext(AppContext);

  let location = "";

  var currentLocation = useLocation();

  //checks location on page load and user change
  useEffect(() => {
    if (currentLocation.pathname === "/") {
      appContext.setHomeActive(true);
      appContext.setProfileActive(false);
    }
    if (currentLocation.pathname === "/profile") {
      appContext.setHomeActive(false);
      appContext.setProfileActive(true);
    }
  }, [appContext.currentUser]);

  //checks location on navbar click
  const checkLocation = () => {
    if (location === "home") {
      appContext.setHomeActive(true);
      appContext.setProfileActive(false);
    }
    if (location === "profile") {
      appContext.setHomeActive(false);
      appContext.setProfileActive(true);
    }
  };



  return (
    <div className="nav-bar" onClick={checkLocation}>
      {appContext.currentUser ? (
        
        <span>
          <Link
            to="/"
            onClick={() => {location = "home";}}
            className="label"
          >
            Tweet out!
          </Link>
          <Link
            to="/"
            onClick={() => {location = "home";}}
            className={`home-${appContext.homeActive}`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            onClick={() => {location = "profile"}}
            className={`profile-${appContext.profileActive}`}
          >
            Profile
          </Link>
          <span className="searchbar-wrapper"><input type="text" placeholder="Search..." className="searchbar"></input></span>
          <span
            onClick={logout}
            className="logout"
          >
            Logout [➜
          </span>
        </span>
      ) : (
        <Link
          to="/login"
          className={`login`}
        >
          Login ➜]
        </Link>
      )}
    </div>
  );
}
