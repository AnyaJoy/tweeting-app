import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import { logout } from "./Firebase";

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

  function changeLocationHome() {
    location = "home";
  }

  function changeLocationProfile() {
    location = "profile";
  }

  return (
    <div className="nav-bar" onClick={checkLocation}>
      {appContext.currentUser ? (
        <span>
          <Link
            to="/"
            onClick={changeLocationHome}
            className={`home-${appContext.homeActive}`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            onClick={changeLocationProfile}
            className={`profile-${appContext.profileActive}`}
          >
            Profile
          </Link>
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
          // onClick={changeLocationLogin}
          className={`login-true`}
        >
          Login ➜]
        </Link>
      )}
    </div>
  );
}
