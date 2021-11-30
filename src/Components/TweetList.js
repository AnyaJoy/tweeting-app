import React, { useEffect } from "react";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import emptyHeart from "../empty-heart.png";
import whiteHeart from "../white-heart.png";
import { saveLikedTweet, loadLikedTweets, deleteLikedTweet } from "./Firebase";

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

  const handleLike = (e) => {
    var tweetId = e.target.id;
    saveLikedTweet(tweetId, appContext.currentUser.uid);
    loadLikedTweets(appContext.currentUser.uid, appContext.setLikedTweets);
  }

  const handleUnike = (e) => {
    var tweetId = e.target.id;
    deleteLikedTweet(tweetId, appContext.currentUser.uid);
    loadLikedTweets(appContext.currentUser.uid, appContext.setLikedTweets);
  };

  return (
    <>
      <div className="header-menu-wrapper">
        <span className="feed">Feed</span>
        <span className="dropdown-header">
          <div className="toggler">
            <span
              className="dropdown-option"
              className={`selected-${allTweetsSelected}`}
              onClick={handleSelectAllTweets}
            >
              All Tweets
            </span>
            <span className="div-line">|</span>
            <span
              className="dropdown-option"
              className={`selected-${myTweetsSelected}`}
              onClick={handleSelectMyTweets}
            >
              My Tweets
            </span>
          </div>
        </span>
      </div>

      {allTweetsSelected
        ? appContext.tweetStorage.map((item, index) => {
            return (
              <div key={item.id} className="tweet-wrapper">
                <div className="user-name-and-date">
                  <div className="user-name">
                    {item.userName}
                    {"   "}
                    {item.id}
                  </div>
                  <div className="date">{item.date}</div>
                </div>
                <div className="tweet">{item.content}</div>

                <img
                  src={emptyHeart}
                  onClick={handleLike}
                  className="like-button-true"
                  id={item.id}
                ></img>

                {appContext.likedTweets.map((tweet, index) => {
                  if (tweet.tweetId == item.id) {
                    return (
                      <img
                        key={tweet.tweetId}
                        src={whiteHeart}
                        onClick={handleUnike}
                        className="like-button-true"
                        id={item.id}
                      ></img>
                    );
                  }
                })}
              </div>
            );
          })
        : //my tweets
          appContext.tweetStorage.map((item, index) => {
            if (item.userName === appContext.currentUser.displayName) {
              return (
                <div key={item.id} className="tweet-wrapper">
                  <div className="user-name-and-date">
                    <div className="user-name">{item.userName}</div>
                    <div className="date">{item.date}</div>
                  </div>
                  <div className="tweet">{item.content}</div>
                  <img src={emptyHeart} className="like-button-true"></img>
                </div>
              );
            }
          })}
    </>
  );
}
