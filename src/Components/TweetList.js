import React from "react";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

export default function TweetList() {
  const appContext = useContext(AppContext);

  const [myTweetsSelected, setMyTweetsSelected] = useState(false);
  const [allTweetsSelected, setAllTweetsSelected] = useState(true);

  //drowdow menu (selects if to show all tweets or user tweets)
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  const handleSelectAllTweets = () => {
    setMyTweetsSelected(false);
    setAllTweetsSelected(true);
    setIsOpen(false);
  };

  const handleSelectMyTweets = () => {
    setMyTweetsSelected(true);
    setAllTweetsSelected(false);
    setIsOpen(false);
  };

  return (
    <>
    <div className="header-menu-wrapper">
        <span className="feed">Feed</span>
          <span className="dropdown-header">
            <div className="toggler">
              <span className="dropdown-option" className={`selected-${allTweetsSelected}`} onClick={handleSelectAllTweets}>
                All Tweets
              </span>
              <span className="div-line">|</span>
              <span className="dropdown-option" className={`selected-${myTweetsSelected}`} onClick={handleSelectMyTweets}>
                 My Tweets
              </span>
            </div>
          </span>
        </div>

    {allTweetsSelected ? (appContext.tweetStorage.map((item, index) => {
        return (
          <div key={1 + index} className="tweet-wrapper">
            <div className="user-name-and-date">
              <div className="user-name">{item.userName}</div>
              <div className="date">{item.date}</div>
            </div>
            <div className="tweet">{item.content}</div>
          </div>
        );
      })
      ) : (
        appContext.tweetStorage.map((item, index) => {
          if (item.userName === appContext.currentUser.displayName) {
          return (
            <div key={1 + index} className="tweet-wrapper">
              <div className="user-name-and-date">
                <div className="user-name">{item.userName}</div>
                <div className="date">{item.date}</div>
              </div>
              <div className="tweet">{item.content}</div>
            </div>
          );
          }
        })
      )}
    </>
  );
  }
