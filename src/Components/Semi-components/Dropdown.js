import { React, useContext } from "react";
import AppContext from "../../Context/AppContext";

export default function Dropdown(props) {
  const { handleSelectAllTweets, handleSelectMyTweets, handleFavouritesSelected } = props;
  const appContext = useContext(AppContext);
  return (
    <>
      <span className="dropdown-header">
        <div className="toggler">
          <span
            className="dropdown-option"
            className={`selected-${appContext.allTweetsSelected}`}
            onClick={handleSelectAllTweets}
          >
            Feed
          </span>
          <span className="div-line">|</span>
          <span
            className="dropdown-option"
            className={`selected-${appContext.myTweetsSelected}`}
            onClick={handleSelectMyTweets}
          >
            My Tweets
          </span>
          <span className="div-line">|</span>
          <span
            className="dropdown-option"
            className={`selected-${appContext.favouritesSelected}`}
            onClick={handleFavouritesSelected}
          >
            Saved
          </span>
        </div>
      </span>
      
    </>
  );
}
