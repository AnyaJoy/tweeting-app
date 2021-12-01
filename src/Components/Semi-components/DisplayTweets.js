import React from "react";
import LikeButton from "./LikeButton";

export default function DisplayTweets(props) {
  const { item, emptyHeart, handleLike, likedTweets, whiteHeart, handleUnlike } =
    props;
  return (
    <div key={item.id} className="tweet-wrapper">
      <div className="user-name-and-date">
        <div className="user-name">{item.userName}</div>
        <div className="date">{item.date}</div>
      </div>
      <div className="tweet">{item.content}</div>
      <LikeButton item={item} emptyHeart={emptyHeart} handleUnlike={handleUnlike} handleLike={handleLike} whiteHeart={whiteHeart} likedTweets={likedTweets}/>
    </div>
  );
}
