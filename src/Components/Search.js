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

  const handleUnLike = (e) => {
    var tweetId = e.target.id;
    deleteLikedTweet(tweetId, appContext.currentUser.uid);
    loadLikedTweets(appContext.currentUser.uid, appContext.setLikedTweets);
  };

  return (
    <>
      {appContext.searchByTweet ? (
        // search by tweet content
        <SearchByTweets
          storage={appContext.tweetStorage}
          likedTweets={appContext.likedTweets}
          searchInput={appContext.searchInput}
          emptyHeart={emptyHeart}
          whiteHeart={whiteHeart}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
        />
      ) : (
        //search by user name
        <SearchByUser
          storage={appContext.tweetStorage}
          likedTweets={appContext.likedTweets}
          searchInput={appContext.searchInput}
          emptyHeart={emptyHeart}
          whiteHeart={whiteHeart}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
        />

        // <div className="search-wrapper">
        //   <div className="header-profile">Search by user...</div>
        //   <div className="searched-tweets-wrapper">
        //     {appContext.tweetStorage.map((item, index) => {
        //       if (
        //         item.userName.toLowerCase().indexOf(appContext.searchInput) !=
        //         -1
        //       ) {
        //         const parts = item.userName.split(
        //           new RegExp(`(${appContext.searchInput})`, "gi")
        //         );

        //         return (
        //           <div key={item.id} className="tweet-wrapper">
        //             <div className="user-name-and-date">
        //               <div className="user-name">
        //                 {parts.map((part, index) =>
        //                   part.toLowerCase() ===
        //                   appContext.searchInput.toLowerCase() ? (
        //                     <mark key={1 + index}>{part}</mark>
        //                   ) : (
        //                     part
        //                   )
        //                 )}
        //               </div>
        //               <div className="date">{item.date}</div>
        //             </div>
        //             <div className="tweet">{item.content}</div>
        //             <img src={emptyHeart} className="like-button-true"></img>
        //             {/* <img src={whiteHeart} className="like-button-true"></img> */}
        //           </div>
        //         );
        //       }
        //     })}
        //   </div>
        // </div>
      )}
    </>
  );
}
