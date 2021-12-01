import React from "react";

export default function Dropdown(props) {
  const {
    allTweetsSelected,
    handleSelectAllTweets,
    myTweetsSelected,
    handleSelectMyTweets,
  } = props;
  return (
    <>
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
    </>
  );
}
