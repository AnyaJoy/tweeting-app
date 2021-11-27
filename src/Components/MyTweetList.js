import React from "react";
import { useContext } from "react";
import AppContext from "../Context/AppContext";

export default function TweetList() {
  const appContext = useContext(AppContext);

  return (
    <>
      {/* {appContext.tweetStorage.map((item, index) => {
        return (
          <div key={1 + index} className="tweet-wrapper">
            <div className="user-name-and-date">
              <div className="user-name">{item.userName}</div>
              <div className="date">{item.date}</div>
            </div>
            <div className="tweet">{item.content}</div>
          </div>
        );
      })} */}
    </>
  );
}
