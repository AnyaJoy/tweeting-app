import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import { logout } from "./Firebase";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import Loader from "./Loader";
import mag_glass_icon from "../mag_glass.svg"

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

  const [searchByTweet, setSearchByTweet] = useState(true);
  const [searchByUser, setSearchByUser] = useState(false);

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  const handleSearchByTweet = () => {
    setSearchByUser(false);
    setSearchByTweet(true);
  };

  const handleSearchByUser = () => {
    setSearchByUser(true);
    setSearchByTweet(false);
  };

  const [searchInput, setSearchInput] = useState("");
  const [isSearchinput, setIsSearchInput] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function submitOnEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleTweet();
    }
  }

  function handleSearch(e) {
    // setIsSearchInput(true);

    setSearchInput("");

    //sending to the server
    setTimeout(() => {
      if (searchInput !== "") {
        // setIsSearchInput(false);
      }
    }, [500]);
  }

  // enabling the search button
  useEffect(() => {
    if (searchInput) {
      setIsSearchInput(true);
    } else {
      setIsSearchInput(false);
    }
  }, [searchInput]);

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
              className="searchbar"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={submitOnEnter}
              placeholder="Search..."
            ></input>
            <div className="dropdown-search-menu">
              <div className={isOpen ? "visible" : ""} role="menu">
                <div
                  className={`search-this-${searchByTweet}`}
                  onClick={handleSearchByTweet}
                >
                  • by tweets
                </div>
                <div
                  className={`search-this-${searchByUser}`}
                  onClick={handleSearchByUser}
                >
                  • by users
                </div>
              </div>
              {isSearching ? (
                <Loader />
              ) : (
                  <button
                    onClick={handleSearch}
                    disabled={!isSearchinput}
                    className={`search-button-${isSearchinput}`}
                  ></button>
              )}
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
