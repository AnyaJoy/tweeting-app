import React from "react";
import { useContext, useEffect, useState } from "react";
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

  //user's tweets vs all tweets
  const [searchByTweet, setSearchByTweet] = useState(true);
  const [searchByUser, setSearchByUser] = useState(false);

  //drowdow menu (selects if to show all tweets or user tweets)
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  const handleSearchByTweet = () => {
    setSearchByUser(false);
    setSearchByTweet(true);
    setIsOpen(false);
  };

  const handleSearchByUser = () => {
    setSearchByUser(true);
    setSearchByTweet(false);
    setIsOpen(false);
  };

  return (
    <div className="nav-bar" onClick={checkLocation}>
      {appContext.currentUser ? (
        <span>
          <Link
            to="/"
            onClick={() => {
              location = "home";
            }}
            className="label"
          >
            Tweet out!
          </Link>
          <Link
            to="/"
            onClick={() => {
              location = "home";
            }}
            className={`home-${appContext.homeActive}`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            onClick={() => {
              location = "profile";
            }}
            className={`profile-${appContext.profileActive}`}
          >
            Profile
          </Link>
          <span className="searchbar-wrapper">
            <input
              {...buttonProps}
              type="text"
              placeholder="Search..."
              className="searchbar"
            ></input>
            <div className="dropdown-search-menu">
              <div className={isOpen ? "visible" : ""} role="menu">
                <div
                  className="dropdown-option"
                  className={`search-this-${true}`}
                  onClick={handleSearchByTweet}
                >
                  • by tweets
                </div>
                <div
                  className="dropdown-option"
                  className={`search-this-${true}`}
                  onClick={handleSearchByUser}
                >
                  • by users
                </div>
              </div>
            </div>
          </span>

          <span onClick={logout} className="logout">
            Logout [➜
          </span>
        </span>
      ) : (
        <span>
          <span className="label">Tweet out!</span>
          <Link to="/login" className={`login`}>
            Login ➜]
          </Link>
        </span>
      )}
    </div>
  );
}
