import React, { useEffect } from "react";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import emptyHeart from "../empty-heart.png";
import whiteHeart from "../white-heart.png";
import { saveLikedTweet, loadLikedTweets, deleteLikedTweet } from "./Firebase";
import Dropdown from "./Semi-components/Dropdown";
import DisplayTweets from "./Semi-components/DisplayTweets";

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
  };

  const handleUnlike = (e) => {
    var tweetId = e.target.id;
    deleteLikedTweet(tweetId, appContext.currentUser.uid);
    loadLikedTweets(appContext.currentUser.uid, appContext.setLikedTweets);
  };

  return (
    <>
      <div className="header-menu-wrapper">
        <span className="feed">Feed</span>
        <Dropdown
          allTweetsSelected={allTweetsSelected}
          handleSelectAllTweets={handleSelectAllTweets}
          myTweetsSelected={myTweetsSelected}
          handleSelectMyTweets={handleSelectMyTweets}
        />
      </div>

      {allTweetsSelected
        ? //all tweets
          appContext.tweetStorage.map((item, index) => {
            return (
              <DisplayTweets
                key={item.id}
                item={item}
                emptyHeart={emptyHeart}
                handleUnlike={handleUnlike}
                likedTweets={appContext.likedTweets}
                whiteHeart={whiteHeart}
                handleLike={handleLike}
              />
            );
          })
        : //my tweets
          appContext.tweetStorage.map((item, index) => {
            if (item.userName === appContext.currentUser.displayName) {
              return (
                <DisplayTweets
                  key={item.id}
                  item={item}
                  emptyHeart={emptyHeart}
                  handleUnlike={handleUnlike}
                  likedTweets={appContext.likedTweets}
                  whiteHeart={whiteHeart}
                  handleLike={handleLike}
                />
              );
            }
          })}
    </>
  );
}
