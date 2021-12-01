import React from "react";

export default function LikeButton(props) {
  const {
    item,
    whiteHeart,
    handleUnLike,
    emptyHeart,
    handleLike,
    likedTweets,
  } = props;
  return (
    <>
      <img
        src={emptyHeart}
        onClick={handleLike}
        className="like-button-true"
        id={item.id}
      ></img>

      {likedTweets.map((tweet, index) => {
        if (tweet.tweetId == item.id) {
          return (
            <img
              key={tweet.tweetId}
              src={whiteHeart}
              onClick={handleUnLike}
              className="like-button-true"
              id={item.id}
            ></img>
          );
        }
      })}
    </>
  );
}
