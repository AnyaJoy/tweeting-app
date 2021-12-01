import React from "react";
import { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { useHistory } from "react-router-dom";
import "../index.css";
import emptyHeart from "../empty-heart.png";
import whiteHeart from "../white-heart.png";
import SearchByTweets from "./Semi-components/SearchByTweets";
import SearchByUser from "./Semi-components/SearchByUser";
import { saveLikedTweet, loadLikedTweets, deleteLikedTweet } from "./Firebase";

export default function TweetList() {
  const appContext = useContext(AppContext);

  appContext.setFavouritesSelected(false);

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
      {appContext.searchByTweet ? (
        <SearchByTweets
          storage={appContext.tweetStorage}
          likedTweets={appContext.likedTweets}
          searchInput={appContext.searchInput}
          emptyHeart={emptyHeart}
          whiteHeart={whiteHeart}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
        />
      ) : (
        <SearchByUser
          storage={appContext.tweetStorage}
          likedTweets={appContext.likedTweets}
          searchInput={appContext.searchInput}
          emptyHeart={emptyHeart}
          whiteHeart={whiteHeart}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
        />
      )}
    </>
  );
}
