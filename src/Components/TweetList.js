import React, { useEffect } from "react";
import { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
// import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import emptyHeart from "../empty-heart.png";
import whiteHeart from "../white-heart.png";
import { saveLikedTweet, loadLikedTweets, deleteLikedTweet } from "./Firebase";
// import Dropdown from "./Semi-components/Dropdown";
import DisplayTweets from "./Semi-components/DisplayTweets";
import TweetsHeadingMenu from "./Semi-components/TweetsHeadingMenu";

export default function TweetList() {
  const appContext = useContext(AppContext);

  // //drowdow menu (selects if to show all tweets or user tweets)
  // const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  // const handleSelectAllTweets = () => {
  //   setMyTweetsSelected(false);
  //   setAllTweetsSelected(true);
  //   setIsOpen(false);
  // };

  // const handleSelectMyTweets = () => {
  //   setMyTweetsSelected(true);
  //   setAllTweetsSelected(false);
  //   setIsOpen(false);
  // };

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
      <TweetsHeadingMenu />

      {appContext.allTweetsSelected &&
        appContext.tweetStorage.map((item, index) => {
          //all tweets
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
        })}

      {appContext.myTweetsSelected &&
        appContext.tweetStorage.map((item, index) => {
          //my tweets
          if (item.userName === appContext.currentUser.displayName)
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
        })}

      {appContext.favouritesSelected &&
        appContext.likedTweets.map((tweet, index) => {
          //map inside map
          return (
            <div key={tweet.tweetId}>
              {appContext.tweetStorage.map((item, index) => {
                if (item.id == tweet.tweetId) {
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
            </div>
          );
        })}
    </>
  );
}
