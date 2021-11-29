import React from "react";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import { logout } from "./Firebase";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import Loader from "./Loader";

import { auth, sendTweetDatabase, db, ref, onValue } from "./Firebase";

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
    if (currentLocation.pathname === "/search") {
      appContext.setHomeActive(false);
      appContext.setProfileActive(false);
    }
  }, [appContext.currentUser]);

  //checks location on navbar click
  const checkLocation = () => {
    appContext.setSearchInput("");
    appContext.setRedirect("");
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

  // const [searchInput, setSearchInput] = useState("");
  const [isSearchinput, setIsSearchInput] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function submitOnEnter(event) {
    if (appContext.searchInput) {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        handleSearch();
      }
    }
  }

  // // recieving the tweets from server on pageload and on change
  // useEffect(() => {
  //   onValue(ref(db, "tweets"), (snapshot) => {
  //     var tweetsArray = [];

  //     snapshot.forEach((childSnapshot) => {
  //       const data = childSnapshot.val();
  //       tweetsArray.push(data);
  //     });

  //     appContext.setTweetStorage(tweetsArray.reverse());
  //   });
  // }, []);

  function handleSearch(e) {
    appContext.setRedirect("/search");
    appContext.setHomeActive(false);
    appContext.setProfileActive(false);
    setIsSearching(true);

    setTimeout(() => {
      if (appContext.searchInput !== "") {
        setIsSearching(false);
      }
    }, [500]);
  }

  // enabling the search button
  useEffect(() => {
    if (appContext.searchInput) {
      setIsSearchInput(true);
      handleSearch();
    } else {
      setIsSearchInput(false);
      appContext.setRedirect("/");
    }
  }, [appContext.searchInput]);

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
              value={appContext.searchInput}
              onChange={(e) => appContext.setSearchInput(e.target.value)}
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
                <Loader classname={"loader2"} />
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
