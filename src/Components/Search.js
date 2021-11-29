import React from "react";
import { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { useHistory } from "react-router-dom";
import "../index.css";

export default function TweetList() {
  const appContext = useContext(AppContext);

  // checking if there's a user
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      appContext.setCurrentUser(user);
    }
  }, [user, loading]);

  return (
    <>
      <div className="search-wrapper">
        <div className="header-profile">Search</div>
        <div className="searched-tweets-wrapper">
          {appContext.tweetStorage.map((item, index) => {
            //case insensitive search
            if (item.content.toLowerCase().indexOf(appContext.searchInput) != -1) {
              const parts = item.content.split(
                new RegExp(`(${appContext.searchInput})`, "gi")
              );

              return (
                <div key={1 + index} className="tweet-wrapper">
                  <div className="user-name-and-date">
                    <div className="user-name">{item.userName}</div>
                    <div className="date">{item.date}</div>
                  </div>
                  <div className="tweet">
                    {parts.map((part, index) =>
                      part.toLowerCase() ===
                      appContext.searchInput.toLowerCase() ? (
                        <mark key={1 + index}>{part}</mark>
                      ) : (
                        part
                      )
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
